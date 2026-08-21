/**
 * Generates a random 6-digit numeric OTP code.
 * @returns {string} 6-digit OTP code string
 */
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
