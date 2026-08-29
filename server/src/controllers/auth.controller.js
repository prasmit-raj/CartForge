import * as authService from "../services/auth.service.js";

// Helper to determine if an error is a user-facing validation error versus a server exception
const isUserFacingError = (message) => {
  const userMessages = [
    "Email and password are required",
    "Please enter a valid email address",
    "Password must be at least 6 characters long",
    "An account with this email already exists",
    "User account not found",
    "Invalid email or password",
  ];
  return userMessages.some((msg) => message.includes(msg));
};

// SIGNUP (Direct account creation & JWT generation without mandatory OTP)
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    const result = await authService.signupUser({ name, email, password }, res);

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error("[SIGNUP ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal server error during signup" : error.message,
    });
  }
};

// LOGIN (Direct authentication & JWT generation without mandatory OTP)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.loginUser({ email, password }, res);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error("[LOGIN ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Internal server error during login" : error.message,
    });
  }
};

// RESET PASSWORD (Direct password update without OTP token)
export const resetpassword = async (req, res) => {
  try {
    const { email, newPassword, password } = req.body;
    const targetPassword = newPassword || password;

    if (!email || !targetPassword) {
      return res.status(400).json({
        success: false,
        message: "Email and new password are required",
      });
    }

    const result = await authService.resetPassword({
      email,
      newPassword: targetPassword,
    });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("[RESET PASSWORD ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Password reset failed" : error.message,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    const result = authService.logoutUser(res);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("[LOGOUT ERROR]", error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

// GET CURRENT USER PROFILE (ME)
export const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.error("[GET ME ERROR]", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile",
    });
  }
};

// Deprecated OTP handlers for backwards safety
export const signupotp = (req, res) => res.status(410).json({ success: false, message: "OTP verification is deprecated." });
export const verifysignupotp = (req, res) => res.status(410).json({ success: false, message: "OTP verification is deprecated." });
export const loginotp = (req, res) => res.status(410).json({ success: false, message: "OTP verification is deprecated." });
export const verifyloginotp = (req, res) => res.status(410).json({ success: false, message: "OTP verification is deprecated." });
export const sendforgotpasswordotp = (req, res) => res.status(410).json({ success: false, message: "OTP verification is deprecated." });
export const verifyforgotpasswordotp = (req, res) => res.status(410).json({ success: false, message: "OTP verification is deprecated." });