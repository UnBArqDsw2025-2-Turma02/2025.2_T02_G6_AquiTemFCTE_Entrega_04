import axios from "axios";
import { MODE, API_MAIN_ENDPOINT } from "../utils/constants.js";

const baseURL = MODE.DEV + API_MAIN_ENDPOINT.AUTH;
// MODE.DEV É "http://localhost:8000/" (URL DO BACKEND EM AMBIENTE DE DESENVOLVIMENTO
// API_MAIN_ENDPOINT.AUTH É "auth" (ENDPOINT DE AUTENTICAÇÃO DO BACKEND)

// AQUI TEM A FUNÇÃO DE REGISTRAR USUÁRIO QUE É ACIONADA NA PÁGINA DE CADASTRO
// ESSA FUNÇÃO RECEBE OS DADOS DO USUÁRIO E FAZ UMA REQUISIÇÃO POST PARA O BACKEND
// PARA A ENDPOINT "auth/register", ENVIANDO OS DADOS NO FORMATO JSON
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

// Função para realizar login — envia credenciais como form-urlencoded (compatível com OAuth2PasswordRequestForm)
export async function login_user(email, password) {
  try {
    const params = new URLSearchParams();
    params.append('username', email);
    params.append('password', password);

    const response = await axios.post(`${baseURL}/login`, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    throw error;
  }
}
