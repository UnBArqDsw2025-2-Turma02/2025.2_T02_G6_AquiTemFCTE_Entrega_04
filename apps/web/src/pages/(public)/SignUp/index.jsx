import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { FaRegEnvelope } from "react-icons/fa";
import { RiUserLine, RiLockLine, RiFingerprintFill } from "react-icons/ri";
import { Container } from "./style";
import { ROUTES } from "../../../utils/constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { register_user } from "../../../services/user.service.js";

import { base64Encode } from "@aquitemfcte/core";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [profileImage, setProfileImage] = useState("")

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !matricula || !senha || !confirmarSenha) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
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
    } else if (profileImage.size > 5 * 1024 * 1024) {
      toast.error("A imagem de perfil deve ter no máximo 5MB.");
      return;
    } else if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }
    try {
      await register_user({
        name,
        email,
        matricula,
        senha,
        confirmarSenha,
        profileImage,
      });
      toast.success("Usuário cadastrado com sucesso!");
    } catch (error) {
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
                onChange={(e) => { setMatricula(e.target.value); setEmail(e.target.value + "@aluno.unb.br"); }}
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
          <Button type="submit" onClick={handleSubmit}>Finalizar Cadastro</Button>
          <span className="redirect-login">
            Não possui conta? <a href={ROUTES.LOGIN}>Faça login</a>
          </span>
        </form>
      </Container>
    );
}