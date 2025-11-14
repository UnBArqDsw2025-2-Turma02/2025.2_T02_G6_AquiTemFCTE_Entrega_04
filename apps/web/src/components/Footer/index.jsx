import { Container, LineHeight, ImageContainer, ContentContainer } from "./style";
import AquiTemFCTELogoExtends from "../../assets/AquiTemFCTELogoExtends.svg";

import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <>
      <LineHeight />
      <Container>
        <ImageContainer>
          <img src={AquiTemFCTELogoExtends} alt="Aqui Tem FCTE Logo Extends" />
        </ImageContainer>

        <ContentContainer>
          <div className="links-container">
            <div className="links-section">
              <h3>Links Rápidos</h3>
              <a href="#about">Início</a>
              <a href="#team">Login/Cadastro</a>
              <a href="#careers">FAQ</a>
            </div>
            <div className="links-section">
              <h3>Sobre Nós</h3>
              <a href="#help">Projeto AquiTemFCTE</a>
              <a href="#contact">Universidade de Brasília</a>
              <a href="#faq">Campus UnB/FCTE</a>
            </div>
            <div className="links-section">
              <h3>Privacidade</h3>
              <a href="#privacy">Política de Privacidade</a>
            </div>
            <div className="links-section">
              <h3>Contatos</h3>
              <div className="social-media-icons">
                <PiInstagramLogoFill className="react-icons instagram" />
                <FaFacebookSquare className="react-icons facebook" />
              </div>
            </div>
          </div>
          <div className="copyright">
            Criado por estudantes da UnB | © Todos os direitos reservados,
            2025.
          </div>
        </ContentContainer>
      </Container>
    </>
  );
}