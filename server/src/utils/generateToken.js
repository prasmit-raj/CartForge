import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "cartforge_dev_secret_key_2026_safe_jwt";

/**
 * Generates a signed JWT token containing userId and role, and attaches it to an HTTP-only cookie.
 * @param {Response} res Express response object
 * @param {string} userId User ID payload
 * @param {string} role User role ('BUYER' | 'SELLER')
 * @returns {string} Signed JWT token
 */
export const generateTokenAndSetCookie = (res, userId, role = "BUYER") => {
  const token = jwt.sign({ id: userId, role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};

/**
 * Clears the authentication token cookie.
 * @param {Response} res Express response object
 */
export const clearAuthCookie = (res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", "", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    expires: new Date(0),
  });
};

/**
 * Generates a short-lived reset token (15 mins) for authorized password reset requests.
 * @param {string} userId
 * @param {string} email
 * @returns {string} Reset token string
 */
export const generateResetToken = (userId, email) => {
  return jwt.sign({ id: userId, email, type: "password_reset" }, JWT_SECRET, {
    expiresIn: "15m",
  });
};

/**
 * Verifies a password reset token.
 * @param {string} token
 * @returns {Object} Decoded payload
 */
export const verifyResetToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== "password_reset") {
      throw new Error("Invalid reset token type");
    }
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired password reset token");
  }
};
