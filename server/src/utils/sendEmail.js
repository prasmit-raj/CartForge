import nodemailer from "nodemailer";

// Create a persistent Nodemailer transport pool for high-performance SMTP delivery
const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: process.env.SMTP_SECURE !== "false", // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER || process.env.SMTP_USER,
    pass: process.env.EMAIL_PASS || process.env.SMTP_PASS,
  },
  maxConnections: 5,
  maxMessages: 100,
});

/**
 * Sends an email using Nodemailer with persistent SMTP connection pooling.
 * @param {Object} options Email options
 * @param {string} options.to Recipient email address
 * @param {string} options.subject Email subject
 * @param {string} options.text Plain text body
 * @param {string} options.html HTML body
 * @returns {Promise<Object>} Nodemailer info object
 */
export const sendEmail = async ({ to, subject, text, html }) => {
  const fromAddress =
    process.env.EMAIL_FROM ||
    process.env.FROM_EMAIL ||
    `"CartForge" <${process.env.EMAIL_USER || process.env.SMTP_USER || "noreply@cartforge.com"}>`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      text,
      html,
    });

    console.log(`[EMAIL SERVICE] Email successfully sent to ${to} (MessageID: ${info.messageId})`);
    return info;
  } catch (err) {
    // Clean error logging capturing SMTP errors without leaking sensitive credentials (passwords, auth strings)
    console.error(`[EMAIL SERVICE ERROR] Failed to deliver email to ${to}:`, {
      message: err.message,
      code: err.code,
      command: err.command,
      responseCode: err.responseCode,
    });

    throw new Error(`Failed to send email: ${err.message}`);
  }
};
