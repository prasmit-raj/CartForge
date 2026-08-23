import { apiRequest } from "./api";

// login function
export const login = async (data) => {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// signup function
export const signup = async (data) => {
  return apiRequest("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// logout function
export const logout = async () => {
  return apiRequest("/api/auth/logout", {
    method: "POST",
    body: JSON.stringify({}),
  });
};

// resend login otp
export const loginotp = async (data) => {
  return apiRequest("/api/auth/loginotp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// verify login otp
export const verifyloginotp = async (data) => {
  return apiRequest("/api/auth/verifyloginotp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// resend signup otp
export const signupotp = async (data) => {
  return apiRequest("/api/auth/signupotp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// verify signup otp
export const verifysignupotp = async (data) => {
  return apiRequest("/api/auth/verifysignupotp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// send forgot password otp
export const sendforgotpasswordotp = async (data) => {
  return apiRequest("/api/auth/sendforgotpasswordotp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// verify forgot password otp
export const verifyforgotpasswordotp = async (data) => {
  return apiRequest("/api/auth/verifyforgotpasswordotp", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// reset password
export const resetpassword = async (data) => {
  return apiRequest("/api/auth/resetpassword", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// get current authenticated user profile
export const getMe = async () => {
  return apiRequest("/api/auth/me", {
    method: "GET",
  });
};
