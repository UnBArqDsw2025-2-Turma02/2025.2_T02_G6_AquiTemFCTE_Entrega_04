import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { FaRegEnvelope } from "react-icons/fa";
import { RiUserLine, RiLockLine, RiFingerprintFill } from "react-icons/ri";
import { Container } from "./style";

export default function SignIn() {
    return (
        <Container>
            <div className="title-signin">
                <h1>Cadastre-se</h1>
                <span>Campos obrigatórios são marcados com um asterisco <span className="required">*</span></span>
            </div>
            <form className="form-signin">
                <div className="fields-uploads">
                    <div className="fields-form">
                        <Input
                            label="Nome e Sobrenome"
                            placeholder="Digite aqui seu nome completo"
                            icon
                            iconChildren={<RiUserLine />}
                            required
                        /> 
                        <Input
                            label="Email Institucional da UnB"
                            icon
                            iconChildren={<FaRegEnvelope />}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        /> 
                        <Input
                            label="Matrícula da UnB"
                            icon
                            iconChildren={<RiFingerprintFill />}
                            onChange={(e) => setEmail(e.target.value)}
                            type="number"
                            required
                        /> 
                        <Input
                            label="Senha"
                            icon
                            iconChildren={<RiLockLine />}
                            type="password"
                            required
                        /> 
                        <Input
                            label="Repetir Senha"
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
            </form>
        </Container>
    );
}