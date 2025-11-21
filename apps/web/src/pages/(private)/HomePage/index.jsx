import { Container, CallingSection, MarketSection, ButtonContainer, LinkContainer } from "./style";

import {
  FaCompass,
  FaExternalLinkAlt,
  FaLock,
  FaUniversity,
} from "react-icons/fa";
import IconSquare from "../../../components/IconSquare";

export default function HomePage() {
  return (
    <Container>
      <CallingSection>
        <h1>
          <span>AquiTem</span> o que você procura.
        </h1>
        <p>
          Um espaço feito para alunos e professores comprarem, venderem e
          trocarem de forma simples e segura dentro da FCTE.
        </p>
        <ButtonContainer>
          <FaCompass className="icon" />
          Começar a Explorar
        </ButtonContainer>
        <LinkContainer>
          <FaExternalLinkAlt className="icon" />
          Quero anunciar uma venda ou troca
        </LinkContainer>
        <div className="IconSquares">
          <div className="card">
            <IconSquare icon={<FaUniversity />} variant="default" />
            <span className="card-label">
              Negocie apenas com estudantes da FCTE
            </span>
          </div>
          <div className="card">
            <IconSquare icon={<FaLock />} variant="secondary" />
            <span className="card-label">
              Seus dados e anúncios protegidos da comunidade externa
            </span>
          </div>
        </div>
      </CallingSection>
    </Container>
  );
}