import { Container, CardContainer, MicrosoftLoginButton } from "./style";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useNavigate } from "react-router-dom";

import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { TbBrandOffice } from "react-icons/tb";

import { ROUTES } from "../../../utils/constants";


export default function LoginPage() {
  const navigate = useNavigate();
  
  return (
    <Container>
      <CardContainer>
        <div className="form-side">
          <h1>Acesse sua Conta</h1>
          <MicrosoftLoginButton>
            <TbBrandOffice />
          </MicrosoftLoginButton>
          <span>Ou use seu email institucional para fazer login:</span>
          <Input placeholder="Email Institucional" icon={true} iconChildren={<MdOutlineEmail />} />
          <Input placeholder="Senha" type="password" icon={true} iconChildren={<MdOutlineLock />} />
          <Button>Entrar</Button>
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