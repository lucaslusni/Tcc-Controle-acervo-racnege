import axios from "axios";
import { jwtDecode } from "jwt-decode";

// Configuração do Axios
export const api = axios.create({
  baseURL: "http://127.0.0.1:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("token: ", token);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Função para obter o userId do token JWT
export const getUserIdFromToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token); // Decodifica o JWT
    return decodedToken.id;
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
};

export default api;
