import { Container, CardContainer, MicrosoftLoginButton } from "./style";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import Popup from "../../../components/PopUp";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { TbBrandOffice } from "react-icons/tb";

import { ROUTES, MODE, API_MAIN_ENDPOINT } from "../../../utils/constants";
import { login_user } from "../../../services/user.service.js";


export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Preencha email e senha');
      return;
    }

    try {
      const data = await login_user(email, password);
      if (data && data.access_token) {
        const token = data.access_token;
        localStorage.setItem('access_token', token);

        try {
          const resp = await fetch(`${MODE.DEV + API_MAIN_ENDPOINT.AUTH}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (!resp.ok) {
            toast.error('Não foi possível validar o estado da conta');
            return;
          }

          const user = await resp.json();
          if (user && user.verified) {
            navigate(ROUTES.HOME);
          } else {
            setIsPopupSendEmail(true);
          }
        } catch (err2) {
          toast.error('Erro ao validar a conta');
          console.error(err2);
        }
      } else {
        toast.error('Resposta inesperada do servidor');
      }
    } catch (err) {
      toast.error('Email ou senha incorretos');
      console.error(err);
    }
  };

  const [isPopupSendEmail, setIsPopupSendEmail] = useState(false);
  const [isPopupConfirmCode, setIsPopupConfirmCode] = useState(false);

  const handleSendEmail = async () => {
  setIsPopupSendEmail(false);

  try {
    const token = localStorage.getItem("access_token");

    const resp = await fetch(
      `${MODE.DEV + API_MAIN_ENDPOINT.AUTH}/send-verification-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        
        body: null,
      }
    );

    if (!resp.ok) {
      toast.error("Falha ao enviar o email de verificação");
      return;
    }

    toast.success("Código de verificação enviado! Verifique seu e-mail.");
    setIsPopupConfirmCode(true);
  } catch (err) {
    console.error(err);
    toast.error("Erro ao enviar o email de verificação");
  }
};

  const [verificationCode, setVerificationCode] = useState("");

  const handleConfirmCode = async () => {
    if (!verificationCode) {
      toast.error("Insira o código de verificação");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      const resp = await fetch(
        `${MODE.DEV + API_MAIN_ENDPOINT.AUTH}/verify-account`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ code: verificationCode }),
        }
      );

      if (!resp.ok) {
        const errorBody = await resp.json().catch(() => null);
        toast.error(errorBody?.detail || "Código inválido ou expirado");
        return;
      }

      toast.success("Conta verificada com sucesso!");
      setIsPopupConfirmCode(false);
      navigate(ROUTES.HOME);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao confirmar o código");
    }
  };

  return (
    <Container>
      <Popup
        isOpen={isPopupSendEmail}
        onClose={() => setIsPopupSendEmail(false)}
        disabled
      >
        <h1>Verifique seu email</h1>
        <p>
          Clique no botão abaixo e realize a confirmação da sua conta através do link ou código enviado para o seu
          email institucional.
        </p>
        <Button onClick={handleSendEmail}>Enviar código</Button>
      </Popup>
      <Popup
        isOpen={isPopupConfirmCode}
        onClose={() => setIsPopupConfirmCode(false)}
        disabled
      >
        <h1>Insira o código</h1>
        <p>
          Insira o código de verificação enviado para seu email institucional.
        </p>
        <Input
          placeholder="Código de verificação"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <Button onClick={handleConfirmCode}>Confirmar</Button>
          <Button variant="outlineBlue" onClick={handleSendEmail}>
            Reenviar código
          </Button>
        </div>
      </Popup>
      <CardContainer>
        <div className="form-side">
          <h1>Acesse sua Conta</h1>
          <MicrosoftLoginButton>
            <TbBrandOffice />
          </MicrosoftLoginButton>
          <span>Ou use seu email institucional para fazer login:</span>
          <Input
            placeholder="Email Institucional"
            icon={true}
            iconChildren={<MdOutlineEmail />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Senha"
            type="password"
            icon={true}
            iconChildren={<MdOutlineLock />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Entrar</Button>
          <ToastContainer />
        </div>
        <div className="register-side">
          <div className="description-area">
            <h1>Não possui conta?</h1>
            <span>
              Inicie seus primeiros passos para começar a utilizar a plataforma
            </span>
          </div>
          <Button variant="outlineBlue" onClick={() => navigate(ROUTES.SIGNUP)}>Fazer Cadastro</Button>
        </div>
      </CardContainer>
    </Container>
  );
}