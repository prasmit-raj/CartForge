import { apiRequest } from "./api";

// login function (Direct authentication)
export const login = async (data) => {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

// signup function (Direct registration)
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

// reset password function (Direct email + new password reset)
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
