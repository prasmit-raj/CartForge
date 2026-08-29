import prisma from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import {
  generateTokenAndSetCookie,
  clearAuthCookie,
} from "../utils/generateToken.js";

const ADMIN_SELLER_EMAIL = "prasmitraj056@gmail.com";

/**
 * Returns role based on business rule:
 * prasmitraj056@gmail.com => 'SELLER'
 * any other email => 'BUYER'
 */
const determineRole = (email) => {
  return email.trim().toLowerCase() === ADMIN_SELLER_EMAIL ? "SELLER" : "BUYER";
};

/**
 * Returns a sanitized user object omitting sensitive fields.
 */
const sanitizeUser = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

/**
 * SIGNUP USER
 * Creates user directly with active status and returns signed JWT token.
 */
export const signupUser = async ({ name, email, password }, res) => {
  const normalizedEmail = email.trim().toLowerCase();
  const role = determineRole(normalizedEmail);

  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    if (existingUser.isVerified) {
      throw new Error("An account with this email already exists");
    }
    // Update existing unverified account credentials directly
    const hashedPassword = await hashPassword(password);
    const updatedUser = await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        password: hashedPassword,
        name: name || existingUser.name,
        role: role,
        isVerified: true,
      },
    });

    const token = generateTokenAndSetCookie(res, updatedUser.id, updatedUser.role);

    return {
      message: "Account created successfully",
      user: sanitizeUser(updatedUser),
      token,
    };
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      name: name || null,
      role: role,
      isVerified: true,
    },
  });

  const token = generateTokenAndSetCookie(res, newUser.id, newUser.role);

  return {
    message: "Account created successfully",
    user: sanitizeUser(newUser),
    token,
  };
};

/**
 * LOGIN USER
 * Authenticates email & password directly and returns signed JWT token.
 */
export const loginUser = async ({ email, password }, res) => {
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

  // Ensure role consistency for admin email
  const expectedRole = determineRole(normalizedEmail);
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      role: expectedRole,
    },
  });

  const token = generateTokenAndSetCookie(res, updatedUser.id, updatedUser.role);

  return {
    message: "Login successful",
    user: sanitizeUser(updatedUser),
    token,
  };
};

/**
 * RESET PASSWORD
 * Resets user password directly given user email.
 */
export const resetPassword = async ({ email, newPassword }) => {
  if (!email || !email.includes("@")) {
    throw new Error("Please enter a valid email address");
  }

  if (!newPassword || newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters long");
  }

  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user) {
    throw new Error("User account not found");
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
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

  const expectedRole = determineRole(user.email);
  if (user.role !== expectedRole) {
    user.role = expectedRole;
    await prisma.user.update({
      where: { id: user.id },
      data: { role: expectedRole },
    }).catch((err) => console.error("[ROLE UPDATE ERROR]", err));
  }

  return sanitizeUser(user);
};
