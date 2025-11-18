import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { FaRegEnvelope } from "react-icons/fa";
import { RiUserLine, RiLockLine, RiFingerprintFill } from "react-icons/ri";
import { Container } from "./style";
import { ROUTES } from "../../../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Popup from "../../../components/PopUp/index.jsx";
import { useNavigate } from "react-router-dom";

import { base64Encode, register_user } from "@aquitemfcte/core";

export default function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [profileImage, setProfileImage] = useState("")
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [isPopupSuccess, setIsPopupSuccess] = useState(false);

  const handleChangeProfileImage = async (e) => {
    const profileImageFile = e.target.files[0];

    if (profileImageFile.size > 5 * 1024 * 1024) {
      toast.error("O arquivo é muito grande! O limite é de 5MB.");
      return;
    }

    if (profileImageFile) {
      const base64 = await base64Encode(profileImageFile);
      setProfileImage(base64);
    }
  }

  // FUNÇÃO QUE INTEGRA A INTERFACE COM O BACKEND
  // PRIMEIRO VALIDA OS DADOS E DEPOIS CHAMA A FUNÇÃO QUE FAZ A REQUISIÇÃO: "register_user"
  // DO ARQUIVO: "apps/web/src/services/user.service.js"
  // A BIBLIOTECA "AXIOS" É USADA PARA FAZER A REQUISIÇÃO HTTP E
  // O BACKEND RECEPTA OS DADOS ENVIADOS POR CONTA DA ENDPOINT "auth/register"
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !matricula || !senha || !confirmarSenha) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    } else if (name.split(" ").some((part) => part.length < 2)) {
      toast.error("Cada parte do nome deve ter pelo menos 2 caracteres.");
      return;
    } else if (matricula.length !== 9) {
      toast.error("A matrícula deve ter 9 dígitos.");
      return;
    } else if (senha.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.");
      return;
    } else if (!senha.match(/[A-Z]/)) {
      toast.error("A senha deve conter pelo menos uma letra maiúscula.");
      return;
    } else if (!senha.match(/[a-z]/)) {
      toast.error("A senha deve conter pelo menos uma letra minúscula.");
      return;
    } else if (!senha.match(/[0-9]/)) {
      toast.error("A senha deve conter pelo menos um número.");
      return;
    } else if (profileImage.size > 5 * 1024 * 1024) {
      toast.error("A imagem de perfil deve ter no máximo 5MB.");
      return;
    } else if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }
    try {
      setIsPopupLoading(true);
      await register_user({
        name,
        email,
        matricula,
        senha,
        confirmarSenha,
        profileImage,
      });
      setIsPopupLoading(false);
      setProfileImage("");
      setIsPopupSuccess(true);
      setTimeout(() => {
        setIsPopupSuccess(false);
        navigate(ROUTES.LOGIN);
      }, 4000);
    } catch (error) {
      setIsPopupLoading(false);
      if (error.response.data.detail === "User already exists") {
        toast.error("Este usuário já existe");
        return;
      }
      else
        toast.error("Erro ao cadastrar usuário.");
    }
  };

    return (
      <Container>
        <Popup
          isOpen={isPopupLoading}
          onClose={() => setIsPopupLoading(false)}
          disabled
        >
          <p>Aguarde...</p>
        </Popup>
        <Popup
          isOpen={isPopupSuccess}
          onClose={() => setIsPopupSuccess(false)}
          disabled
        >
          <h1>Cadastro feito com sucesso!</h1>
          <p>
            Realize o login para continuar com a configuração de sua conta! <br /><br/>
            Redirecionando para a página de login...
          </p>
        </Popup>
        <ToastContainer />
        <div className="title-signin">
          <h1>Cadastre-se</h1>
          <span>
            Campos obrigatórios são marcados com um asterisco{" "}
            <span className="required">*</span>
          </span>
        </div>
        <form className="form-signin">
          <div className="fields-uploads">
            <div className="fields-form">
              <Input
                label="Nome e Sobrenome"
                placeholder="Nome Completo"
                icon
                iconChildren={<RiUserLine />}
                required
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Matrícula da UnB"
                placeholder="Matrícula"
                icon
                iconChildren={<RiFingerprintFill />}
                onChange={(e) => {
                  setMatricula(e.target.value);
                  setEmail(e.target.value + "@aluno.unb.br");
                }}
                type="number"
                required
              />
              <Input
                label="Email Institucional da UnB"
                placeholder="Email Institucional"
                icon
                iconChildren={<FaRegEnvelope />}
                value={matricula + "@aluno.unb.br"}
                required
                disabled
              />
              <Input
                label="Senha"
                placeholder="Senha"
                icon
                iconChildren={<RiLockLine />}
                onChange={(e) => setSenha(e.target.value)}
                type="password"
                required
              />
              <Input
                label="Repetir Senha"
                placeholder="Senha"
                icon
                iconChildren={<RiLockLine />}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                type="password"
                required
              />
            </div>
            <div className="fields-form">
              <Input
                label="Foto de Perfil"
                accept="image/*"
                multiple={false}
                type="file"
                required
                onChange={handleChangeProfileImage}
              />
            </div>
          </div>
          <Button type="submit" onClick={handleSubmit}>
            Finalizar Cadastro
          </Button>
          <span className="redirect-login">
            Não possui conta? <a href={ROUTES.LOGIN}>Faça login</a>
          </span>
        </form>
      </Container>
    );
}