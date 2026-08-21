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
    "Invalid OTP code",
    "OTP code has expired",
    "Account is not verified",
    "Account is already verified",
    "Account is unverified",
    "Reset authorization token is missing",
    "Invalid or expired password reset token",
    "Passwords do not match",
  ];
  return userMessages.some((msg) => message.includes(msg));
};

// SIGNUP
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

    const result = await authService.signupUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: result.message,
      data: result.user,
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

// RESEND SIGNUP OTP
export const signupotp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await authService.resendSignupOtp({ email });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("[RESEND SIGNUP OTP ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Failed to send signup OTP" : error.message,
    });
  }
};

// VERIFY SIGNUP OTP
export const verifysignupotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const result = await authService.verifySignupOtp({ email, otp }, res);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error("[VERIFY SIGNUP OTP ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "OTP verification failed" : error.message,
    });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: result.message,
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

// RESEND LOGIN OTP
export const loginotp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await authService.resendLoginOtp({ email });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("[RESEND LOGIN OTP ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Failed to send login OTP" : error.message,
    });
  }
};

// VERIFY LOGIN OTP
export const verifyloginotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const result = await authService.verifyLoginOtp({ email, otp }, res);

    return res.status(200).json({
      success: true,
      message: result.message,
      data: result.user,
      token: result.token,
    });
  } catch (error) {
    console.error("[VERIFY LOGIN OTP ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "OTP verification failed" : error.message,
    });
  }
};

// SEND FORGOT PASSWORD OTP
export const sendforgotpasswordotp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await authService.sendForgotPasswordOtp({ email });

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("[SEND FORGOT PASSWORD OTP ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "Failed to send password reset OTP" : error.message,
    });
  }
};

// VERIFY FORGOT PASSWORD OTP
export const verifyforgotpasswordotp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const result = await authService.verifyForgotPasswordOtp({ email, otp });

    return res.status(200).json({
      success: true,
      message: result.message,
      resetToken: result.resetToken,
    });
  } catch (error) {
    console.error("[VERIFY FORGOT PASSWORD OTP ERROR]", error);
    const statusCode = isUserFacingError(error.message) ? 400 : 500;
    return res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? "OTP verification failed" : error.message,
    });
  }
};

// RESET PASSWORD
export const resetpassword = async (req, res) => {
  try {
    const { resetToken, newPassword, password } = req.body;

    const targetPassword = newPassword || password;

    if (!resetToken || !targetPassword) {
      return res.status(400).json({
        success: false,
        message: "Reset authorization token and new password are required",
      });
    }

    const result = await authService.resetPassword({
      resetToken,
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