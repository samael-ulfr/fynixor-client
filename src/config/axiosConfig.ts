import axios from "axios";

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use env variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for request/response
api.interceptors.request.use((config) => {
  // Example: add auth token if needed
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const baseAPI = api;
