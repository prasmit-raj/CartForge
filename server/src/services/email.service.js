import nodemailer from "nodemailer";

/**
 * Sends an OTP email to the recipient or logs it to the console in development mode.
 * @param {string} email Target recipient email
 * @param {string} otp 6-digit OTP code
 * @param {string} purpose OTP purpose ('SIGNUP', 'LOGIN', 'RESET_PASSWORD')
 */
export const sendOtpEmail = async (email, otp, purpose) => {
  const purposeTitles = {
    SIGNUP: "CartForge Account Verification OTP",
    LOGIN: "CartForge Login Security Code",
    RESET_PASSWORD: "CartForge Password Reset OTP",
  };

  const subject = purposeTitles[purpose] || "CartForge Security Code";

  const textBody = `Your CartForge OTP for ${purpose} is: ${otp}. This code expires in 10 minutes.`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 500px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #2563eb;">CartForge Security Code</h2>
      <p>You requested a one-time verification code for <strong>${purpose}</strong>.</p>
      <div style="background: #f1f5f9; padding: 16px; text-align: center; border-radius: 6px; margin: 20px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #1e293b;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #64748b;">This OTP is valid for <strong>10 minutes</strong>. Do not share this code with anyone.</p>
    </div>
  `;

  // Always log OTP in server logs for convenient development testing
  console.log("\n=======================================================");
  console.log(`[EMAIL SERVICE] Sending OTP to: ${email}`);
  console.log(`[EMAIL SERVICE] Purpose: ${purpose}`);
  console.log(`[EMAIL SERVICE] OTP CODE: ${otp}`);
  console.log("=======================================================\n");

  // Attempt real email transport if SMTP config is defined
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: process.env.FROM_EMAIL || `"CartForge" <${smtpUser}>`,
        to: email,
        subject,
        text: textBody,
        html: htmlBody,
      });

      console.log(`[EMAIL SERVICE] Successfully sent email to ${email}`);
    } catch (error) {
      console.error(`[EMAIL SERVICE ERROR] Failed to send email via SMTP: ${error.message}`);
    }
  }
};
