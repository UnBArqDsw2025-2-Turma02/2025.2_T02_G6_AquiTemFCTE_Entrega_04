import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { FaRegEnvelope } from "react-icons/fa";
import { RiUserLine, RiLockLine, RiFingerprintFill } from "react-icons/ri";
import { Container } from "./style";
import { ROUTES } from "../../../utils/constants";

export default function SignUn() {
    return (
      <Container>
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
              />
              <Input
                label="Email Institucional da UnB"
                placeholder="Email Institucional"
                icon
                iconChildren={<FaRegEnvelope />}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Matrícula da UnB"
                placeholder="Matrícula"
                icon
                iconChildren={<RiFingerprintFill />}
                onChange={(e) => setEmail(e.target.value)}
                type="number"
                required
              />
              <Input
                label="Senha"
                placeholder="Senha"
                icon
                iconChildren={<RiLockLine />}
                type="password"
                required
              />
              <Input
                label="Repetir Senha"
                placeholder="Senha"
                icon
                iconChildren={<RiLockLine />}
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
              />
              <Input
                label="Comprovante de Matrícula da UnB"
                accept="application/pdf"
                multiple={false}
                type="file"
                required
              />
            </div>
          </div>
          <Button type="submit">Finalizar Cadastro</Button>
          <span className="redirect-login">
            Não possui conta? <a href={ROUTES.LOGIN}>Faça login</a>
          </span>
        </form>
      </Container>
    );
}