import { Resend } from "resend";
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  // RENDER / PRODUCTION: USE RESEND ONLY
  if (process.env.RENDER === "true" || process.env.NODE_ENV === "production") {
    if (!resendApiKey) {
      throw new Error(
        "RESEND_API_KEY is not available in the running production environment"
      );
    }

    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from:
        process.env.EMAIL_FROM ||
        "CartForge <onboarding@resend.dev>",
      to: [to],
      subject,
      text,
      html,
    });

    if (error) {
      console.error("[RESEND API ERROR]:", error);
      throw new Error(`Failed to send OTP email: ${error.message}`);
    }

    console.log(
      `[EMAIL SERVICE] Email sent via Resend to ${to} (ID: ${data?.id})`
    );

    return data;
  }

  // LOCAL DEVELOPMENT: USE GMAIL
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM ||
        `"CartForge" <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`[EMAIL SERVICE] Email sent via Gmail to ${to}`);
    return info;
  }

  throw new Error("No email service configured");
};