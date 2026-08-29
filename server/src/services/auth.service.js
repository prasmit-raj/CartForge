import prisma from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { createOtp, verifyOtp } from "./otp.service.js";
import { sendOtpEmail } from "./email.service.js";
import {
  generateTokenAndSetCookie,
  clearAuthCookie,
  generateResetToken,
  verifyResetToken,
} from "../utils/generateToken.js";

/**
 * Returns a sanitized user object omitting sensitive fields.
 */
const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

/**
 * SIGNUP USER
 * Decoupled: Saves user and OTP to DB first, then triggers email asynchronously (non-blocking).
 */
export const signupUser = async ({ name, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    if (existingUser.isVerified) {
      throw new Error("An account with this email already exists");
    }
    // If account exists but is unverified, update password/name and issue fresh OTP
    const hashedPassword = await hashPassword(password);
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
        name: name || existingUser.name,
      },
    });

    const otp = await createOtp(updatedUser.id, "SIGNUP");
    
    // Asynchronous fire-and-forget email dispatch
    sendOtpEmail(normalizedEmail, otp, "SIGNUP").catch((err) => {
      console.error(`[ASYNC EMAIL ERROR] Failed to deliver SIGNUP OTP to ${normalizedEmail}:`, err.message);
    });

    return {
      message: "Signup OTP sent to email. Please verify your account.",
      user: sanitizeUser(updatedUser),
    };
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      name: name || null,
      isVerified: false,
    },
  });

  const otp = await createOtp(newUser.id, "SIGNUP");

  // Asynchronous fire-and-forget email dispatch
  sendOtpEmail(normalizedEmail, otp, "SIGNUP").catch((err) => {
    console.error(`[ASYNC EMAIL ERROR] Failed to deliver SIGNUP OTP to ${normalizedEmail}:`, err.message);
  });

  return {
    message: "Signup OTP sent to email. Please verify your account.",
    user: sanitizeUser(newUser),
  };
};

/**
 * RESEND SIGNUP OTP
 * Decoupled: Saves new OTP to DB first, then triggers email asynchronously (non-blocking).
 */
export const resendSignupOtp = async ({ email }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("User account not found");
  }

  if (user.isVerified) {
    throw new Error("Account is already verified. Please login instead.");
  }

  const otp = await createOtp(user.id, "SIGNUP");

  // Asynchronous fire-and-forget email dispatch
  sendOtpEmail(normalizedEmail, otp, "SIGNUP").catch((err) => {
    console.error(`[ASYNC EMAIL ERROR] Failed to deliver SIGNUP OTP to ${normalizedEmail}:`, err.message);
  });

  return { message: "Signup OTP sent successfully" };
};

/**
 * VERIFY SIGNUP OTP
 */
export const verifySignupOtp = async ({ email, otp }, res) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("User account not found");
  }

  const verification = await verifyOtp(user.id, otp, "SIGNUP");
  if (!verification.success) {
    throw new Error(verification.message || "Invalid OTP code");
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { isVerified: true },
  });

  const token = generateTokenAndSetCookie(res, updatedUser.id);

  return {
    message: "Account verified successfully",
    user: sanitizeUser(updatedUser),
    token,
  };
};

/**
 * LOGIN USER
 * Decoupled: Saves OTP to DB first, then triggers email asynchronously (non-blocking).
 */
export const loginUser = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  if (!user.isVerified) {
    // Send signup OTP asynchronously if user tries to log in while unverified
    const otp = await createOtp(user.id, "SIGNUP");
    sendOtpEmail(normalizedEmail, otp, "SIGNUP").catch((err) => {
      console.error(`[ASYNC EMAIL ERROR] Failed to deliver SIGNUP OTP to ${normalizedEmail}:`, err.message);
    });
    throw new Error("Account is not verified. A verification OTP has been sent to your email.");
  }

  const otp = await createOtp(user.id, "LOGIN");

  // Asynchronous fire-and-forget email dispatch
  sendOtpEmail(normalizedEmail, otp, "LOGIN").catch((err) => {
    console.error(`[ASYNC EMAIL ERROR] Failed to deliver LOGIN OTP to ${normalizedEmail}:`, err.message);
  });

  return { message: "Login OTP sent to email. Please verify to complete login." };
};

/**
 * RESEND LOGIN OTP
 * Decoupled: Saves OTP to DB first, then triggers email asynchronously (non-blocking).
 */
export const resendLoginOtp = async ({ email }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("User account not found");
  }

  if (!user.isVerified) {
    throw new Error("Account is unverified. Please verify your signup OTP first.");
  }

  const otp = await createOtp(user.id, "LOGIN");

  // Asynchronous fire-and-forget email dispatch
  sendOtpEmail(normalizedEmail, otp, "LOGIN").catch((err) => {
    console.error(`[ASYNC EMAIL ERROR] Failed to deliver LOGIN OTP to ${normalizedEmail}:`, err.message);
  });

  return { message: "Login OTP sent successfully" };
};

/**
 * VERIFY LOGIN OTP
 */
export const verifyLoginOtp = async ({ email, otp }, res) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("User account not found");
  }

  const verification = await verifyOtp(user.id, otp, "LOGIN");
  if (!verification.success) {
    throw new Error(verification.message || "Invalid OTP code");
  }

  const token = generateTokenAndSetCookie(res, user.id);

  return {
    message: "Login successful",
    user: sanitizeUser(user),
    token,
  };
};

/**
 * SEND FORGOT PASSWORD OTP
 * Decoupled: Saves OTP to DB first, then triggers email asynchronously (non-blocking).
 */
export const sendForgotPasswordOtp = async ({ email }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    // Generic response for user privacy/security
    return { message: "If an account with that email exists, a password reset OTP has been sent." };
  }

  const otp = await createOtp(user.id, "RESET_PASSWORD");

  // Asynchronous fire-and-forget email dispatch
  sendOtpEmail(normalizedEmail, otp, "RESET_PASSWORD").catch((err) => {
    console.error(`[ASYNC EMAIL ERROR] Failed to deliver RESET_PASSWORD OTP to ${normalizedEmail}:`, err.message);
  });

  return { message: "Password reset OTP sent to your email." };
};

/**
 * VERIFY FORGOT PASSWORD OTP
 */
export const verifyForgotPasswordOtp = async ({ email, otp }) => {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("User account not found");
  }

  const verification = await verifyOtp(user.id, otp, "RESET_PASSWORD");
  if (!verification.success) {
    throw new Error(verification.message || "Invalid OTP code");
  }

  const resetToken = generateResetToken(user.id, user.email);

  return {
    message: "OTP verified successfully. You may now reset your password.",
    resetToken,
  };
};

/**
 * RESET PASSWORD
 */
export const resetPassword = async ({ resetToken, newPassword }) => {
  if (!resetToken) {
    throw new Error("Reset authorization token is missing");
  }

  if (!newPassword || newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters long");
  }

  const decoded = verifyResetToken(resetToken);

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: decoded.id },
    data: { password: hashedPassword },
  });

  return { message: "Password reset successfully. You may now login with your new password." };
};

/**
 * LOGOUT USER
 */
export const logoutUser = (res) => {
  clearAuthCookie(res);
  return { message: "Logout successful" };
};

/**
 * GET CURRENT AUTHENTICATED USER
 */
export const getCurrentUser = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return sanitizeUser(user);
};
