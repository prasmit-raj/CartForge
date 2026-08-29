import { sendEmail } from "../utils/sendEmail.js";

/**
 * Generates clean HTML and text email templates for OTP delivery.
 * @param {string} otp 6-digit OTP code
 * @param {string} purpose OTP purpose ('SIGNUP', 'LOGIN', 'RESET_PASSWORD')
 */
const getOtpEmailTemplate = (otp, purpose) => {
  const titles = {
    SIGNUP: {
      subject: "CartForge - Verify Your Email Address",
      heading: "Welcome to CartForge!",
      subheading: "Please verify your email address to complete registration.",
      actionText: "Email Verification Code",
    },
    LOGIN: {
      subject: "CartForge - Security Login Code",
      heading: "CartForge Login Code",
      subheading: "A login attempt was initiated for your CartForge account.",
      actionText: "Login Security Code",
    },
    RESET_PASSWORD: {
      subject: "CartForge - Password Reset OTP",
      heading: "Reset Your Password",
      subheading: "We received a request to reset your CartForge password.",
      actionText: "Password Reset Code",
    },
  };

  const templateInfo = titles[purpose] || {
    subject: "CartForge - Security Verification Code",
    heading: "Security Verification",
    subheading: "Please use the verification code below to proceed.",
    actionText: "Verification Code",
  };

  const textBody = `${templateInfo.heading}\n${templateInfo.subheading}\n\nYour ${templateInfo.actionText} is: ${otp}\nThis code is valid for 10 minutes.\n\nIf you did not request this code, please ignore this email.`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${templateInfo.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
        <tr>
          <td align="center" style="padding: 40px 10px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 520px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
              <!-- Header -->
              <tr>
                <td style="background-color: #1e293b; padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 1px;">🛍️ CartForge</h1>
                </td>
              </tr>
              <!-- Body Content -->
              <tr>
                <td style="padding: 32px 28px; color: #334155;">
                  <h2 style="margin-top: 0; color: #0f172a; font-size: 20px; font-weight: 600;">${templateInfo.heading}</h2>
                  <p style="font-size: 15px; line-height: 1.5; color: #475569; margin-bottom: 24px;">
                    ${templateInfo.subheading}
                  </p>
                  
                  <div style="text-align: center; margin: 28px 0;">
                    <div style="display: inline-block; background-color: #f1f5f9; border: 2px dashed #cbd5e1; border-radius: 10px; padding: 16px 32px;">
                      <span style="font-family: monospace, Courier; font-size: 34px; font-weight: 700; letter-spacing: 8px; color: #2563eb;">${otp}</span>
                    </div>
                    <p style="font-size: 13px; color: #64748b; margin-top: 10px; font-weight: 500;">
                      ⏱️ This code will expire in <strong>10 minutes</strong>.
                    </p>
                  </div>

                  <p style="font-size: 13px; line-height: 1.5; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 0;">
                    If you did not initiate this request, you can safely ignore this email. Someone may have typed your email address by mistake.
                  </p>
                </td>
              </tr>
              <!-- Footer -->
              <tr>
                <td style="background-color: #f8fafc; padding: 16px; text-align: center; border-top: 1px solid #f1f5f9;">
                  <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                    © 2026 CartForge eCommerce Inc. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  return {
    subject: templateInfo.subject,
    text: textBody,
    html: htmlBody,
  };
};

/**
 * Sends an OTP email to the specified recipient using Nodemailer.
 * Features a development bypass fallback logging OTP to console if email sending fails in non-production.
 * @param {string} email Target recipient email address
 * @param {string} otp 6-digit OTP code
 * @param {string} purpose OTP purpose ('SIGNUP', 'LOGIN', 'RESET_PASSWORD')
 */
export const sendOtpEmail = async (email, otp, purpose) => {
  const { subject, text, html } = getOtpEmailTemplate(otp, purpose);

  try {
    return await sendEmail({
      to: email,
      subject,
      text,
      html,
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `\n==================================================` +
        `\n[DEV OTP BYPASS] Failed to send email to ${email}.` +
        `\nPurpose: ${purpose}` +
        `\nOTP Code: ${otp}` +
        `\nError: ${err.message}` +
        `\n==================================================\n`
      );
      return { devBypass: true, otp };
    }
    throw err;
  }
};
