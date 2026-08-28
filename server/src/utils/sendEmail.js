import { Resend } from "resend";
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, text, html }) => {
  const emailProvider = process.env.EMAIL_PROVIDER;

  // RENDER: EXPLICITLY USE RESEND
  if (emailProvider === "resend") {
    const resendApiKey = process.env.RESEND_API_KEY;


    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is missing on the server");
    }

    try {
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
        throw new Error(error.message);
      }

      console.log(
        `[EMAIL SERVICE] Email sent via Resend to ${to} (ID: ${data?.id})`
      );

      return data;
    } catch (err) {
      console.error(
        `[EMAIL SERVICE ERROR] Resend failed for ${to}:`,
        err.message
      );

      throw new Error(`Failed to send OTP email: ${err.message}`);
    }


  }

  // LOCALHOST: USE GMAIL
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from:
          process.env.EMAIL_FROM ||
          `"CartForge" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });

      console.log(`[EMAIL SERVICE] Email sent via Gmail to ${to}`);
      return info;
    } catch (err) {
      console.error(
        `[EMAIL SERVICE ERROR] Nodemailer failed for ${to}:`,
        err.message
      );

      throw new Error(`Failed to send OTP email: ${err.message}`);
    }


  }

  throw new Error("No email service configured");
};
