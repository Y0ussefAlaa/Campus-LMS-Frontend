import axios from "axios";
import CookiesService from "../Services/CookiesService";

export const AxiosInstance = axios.create({
  baseURL: "https://lms-backend-ten-lyart.vercel.app/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to every request automatically
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = CookiesService.getCookie("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
