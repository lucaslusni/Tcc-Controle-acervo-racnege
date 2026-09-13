import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiBaseUrl = process.env.REACT_APP_API_URL || "http://127.0.0.1:8081/api";

export const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

export default api;
