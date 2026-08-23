import { Resend } from "resend";
import nodemailer from "nodemailer";

/**
 * Sends an email using Resend HTTP API (recommended for Render) or Nodemailer/Console fallback.
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  // 1. Resend API (HTTP-based: 100% reliable on Render, bypasses port blocks)
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const fromEmail = process.env.EMAIL_FROM || "CartForge <onboarding@resend.dev>";

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [to],
        subject,
        text,
        html,
      });

      if (error) {
        console.error("[RESEND API ERROR]:", error);
        throw new Error(error.message);
      }

      console.log(`[EMAIL SERVICE] Email sent via Resend to ${to} (ID: ${data?.id})`);
      return data;
    } catch (err) {
      console.error(`[EMAIL SERVICE ERROR] Resend failed for ${to}:`, err.message);
      throw new Error(`Failed to send OTP email: ${err.message}`);
    }
  }

  // 2. Local Nodemailer fallback (for local development or if RESEND_API_KEY isn't set)
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
        from: process.env.EMAIL_FROM || `"CartForge" <${process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html,
      });

      console.log(`[EMAIL SERVICE] Email sent via Gmail to ${to}`);
      return info;
    } catch (err) {
      console.error(`[EMAIL SERVICE ERROR] Nodemailer failed for ${to}:`, err.message);
      throw new Error(`Failed to send OTP email: ${err.message}`);
    }
  }

  // 3. Local console log fallback
  if (process.env.NODE_ENV !== "production") {
    console.log("\n=======================================================");
    console.log(`[DEV OTP LOG] To: ${to} | Subject: ${subject}`);
    console.log(`Content:\n${text}`);
    console.log("=======================================================\n");
    return;
  }

  throw new Error("No valid email service configured on server");
};