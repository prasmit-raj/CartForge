import nodemailer from "nodemailer";

/**
 * Creates a Nodemailer transport instance using environment configuration.
 */
const createTransporter = () => {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT) || 587;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
};

/**
 * Sends an email using Nodemailer or logs to console if SMTP is unconfigured in dev mode.
 * @param {Object} options Email configuration options
 * @param {string} options.to Recipient email address
 * @param {string} options.subject Email subject line
 * @param {string} options.text Plain text content
 * @param {string} options.html HTML formatted content
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();
  const fromEmail =
    process.env.EMAIL_FROM ||
    process.env.FROM_EMAIL ||
    `"CartForge" <${process.env.SMTP_USER || "noreply@cartforge.com"}>`;

  if (!transporter) {
    if (process.env.NODE_ENV === "production") {
      console.error("[EMAIL ERROR] SMTP configuration missing in production environment");
      throw new Error("SMTP email service is not configured on the server");
    }

    // In local development, log to console if SMTP credentials are missing
    console.log("\n=======================================================");
    console.log("[EMAIL SERVICE - DEV FALLBACK]");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Text: ${text}`);
    console.log("=======================================================\n");
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject,
      text,
      html,
    });

    console.log(`[EMAIL SERVICE] Email sent successfully to ${to} (Message ID: ${info.messageId})`);
    return info;
  } catch (error) {
    console.error(`[EMAIL SERVICE ERROR] Failed to send email to ${to}:`, error);
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
};
