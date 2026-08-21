import prisma from "../config/prisma.js";
import { generateOtp } from "../utils/generateOtp.js";

/**
 * Creates a new OTP for a user and purpose, removing previous codes for the same purpose.
 * @param {string} userId
 * @param {'SIGNUP' | 'LOGIN' | 'RESET_PASSWORD'} purpose
 * @returns {Promise<string>} OTP code
 */
export const createOtp = async (userId, purpose) => {
  // Delete any existing active OTP for this user and purpose
  await prisma.oTP.deleteMany({
    where: {
      userId,
      purpose,
    },
  });

  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  await prisma.oTP.create({
    data: {
      userId,
      code,
      purpose,
      expiresAt,
    },
  });

  return code;
};

/**
 * Verifies an OTP code for a user and purpose.
 * @param {string} userId
 * @param {string} code
 * @param {'SIGNUP' | 'LOGIN' | 'RESET_PASSWORD'} purpose
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const verifyOtp = async (userId, code, purpose) => {
  const otpRecord = await prisma.oTP.findFirst({
    where: {
      userId,
      purpose,
      code,
    },
  });

  if (!otpRecord) {
    return { success: false, message: "Invalid OTP code" };
  }

  // Check expiration
  if (new Date() > otpRecord.expiresAt) {
    await prisma.oTP.delete({ where: { id: otpRecord.id } });
    return { success: false, message: "OTP code has expired" };
  }

  // Delete used OTP
  await prisma.oTP.delete({ where: { id: otpRecord.id } });

  return { success: true };
};
