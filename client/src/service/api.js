const API_URL = (import.meta.env.VITE_API_BASE_URL || "https://cartforge-yaz8.onrender.com").replace(/\/+$/, "");

export const apiRequest = async (endpoint, options = {}) => {
  const formattedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const response = await fetch(`${API_URL}${formattedEndpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};