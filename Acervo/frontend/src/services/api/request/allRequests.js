import { api } from "../axiosConfig";
import {
  SAVE_USEREMAIL_PATH,
  SAVE_USERPASSWORD_PATH,
  SAVE_USERNAME_PATH,
  SAVE_USERCPF_PATH,
  SAVE_USERPHONE_PATH,
} from "../constants";

export const getHome = async () => {
  const email = localStorage.getItem(SAVE_USEREMAIL_PATH) || "";
  const password = localStorage.getItem(SAVE_USERPASSWORD_PATH) || "";

  try {
    const result = await api.post("users/login", {
      email,
      password,
    });
    return result.data;
  } catch (error) {
    alert("Erro ao buscar dados da API");
    return { error };
  }
};

export const getRegister = async () => {
  const name = localStorage.getItem(SAVE_USERNAME_PATH);
  const email = localStorage.getItem(SAVE_USEREMAIL_PATH) || "";
  const cpf = localStorage.getItem(SAVE_USERCPF_PATH) || "";
  const password = localStorage.getItem(SAVE_USERPASSWORD_PATH) || "";
  const phone = localStorage.getItem(SAVE_USERPHONE_PATH) || "";

  try {
    const result = await api.post("users/register", {
      email,
      name,
      cpf,
      phone,
      password,
    });
    return result.data.access_token;
  } catch (error) {
    // alert("Erro ao buscar dados da API");
    // return { error };
    console.error(
      "Erro ao fazer requisição:",
      error.response?.data || error.message
    );
    alert(
      "Erro ao buscar dados da API: " +
        (error.response?.data.message || error.message)
    );
    return { error };
  }
};

export * from "./userRequests";
export * from "./bookRequests";
export * from "./loanRequests";

