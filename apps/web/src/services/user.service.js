import axios from "axios";
import { toast } from "react-toastify";
import { MODE, API_MAIN_ENDPOINT } from "../utils/constants.js";

const baseURL = MODE.DEV + API_MAIN_ENDPOINT.AUTH;

export async function register_user(userData) {
  try {
    const response = await axios.post(`${baseURL}/register`, {
      fullname: userData.name,
      email: userData.email,
      matricula: userData.matricula,
      password: userData.senha,
      confirm_password: userData.confirmarSenha,
      profile_image: userData.profileImage,
    });
    
    return response.data;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    throw error;
  }
}
