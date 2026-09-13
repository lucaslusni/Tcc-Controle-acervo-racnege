import { api } from "../axiosConfig";

export const loginUser = async (email, password) => {
  const response = await api.post("/users/login", { email, password });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.delete("/users/logout");
  return response.data;
};

export const getUserData = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const updateUser = async (userData) => {
  const response = await api.put("/users/update", userData);
  return response.data;
};

export const deleteUser = async (userId) => {
  await api.delete(`/users/delete/${userId}`);
};
