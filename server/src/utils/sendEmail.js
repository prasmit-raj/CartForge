import nodemailer from "nodemailer";

/**
 * Creates a Nodemailer transport instance with explicit timeouts and SSL/TLS handling.
 */
const createTransporter = () => {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    return null;
  }

  // If using Gmail, 'service: gmail' is the most reliable preset on cloud hosts (Render/Heroku/AWS)
  if (process.env.SMTP_HOST?.includes("gmail") || smtpUser.includes("@gmail.com")) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 10000, // 10s timeout prevents infinite hanging
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });
  }

  // Custom SMTP fallback
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    tls: {
      rejectUnauthorized: false, // Prevents TLS handshake blocks
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
};

/**
 * Sends an email using Nodemailer or logs to console if SMTP is unconfigured in dev mode.
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