import { Container, InfoContainer, Layout, Espacamento } from "./style";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";

import { FaUserPlus, FaShoppingCart, FaExchangeAlt } from "react-icons/fa";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Container>
      <section className="buttons-section">
        <Layout>
          <h1>
            Compre e Venda entre{" "}
            <span className="h1-highlight">Estudantes da FCTE</span>
          </h1>
          <p className="subtitle">
            A plataforma exclusiva para estudantes da Faculdade do Gama (FCTE/UnB)
            comprarem, venderem e trocarem produtos usados de forma segura e
            prática.
          </p>
          <div className="buttons-container">
            <Button
              variant="default"
              href="/signup"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Explorar Produtos
            </Button>
            <Button
              variant="outlineGray"
              href="/login"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Anunciar Produto
            </Button>
          </div>
          <h2 className="second-title">Como Funciona</h2>
          <div className="cards-container">
            <Card
              title={"1. Cadastre-se"}
              description={
                "Crie sua conta usando seu email institucional da UnB para garantir que você é estudante da FCTE"
              }
              iconComponent={<FaUserPlus />}
              icon
            />
            <Card
              title={"2. Anuncie ou Compre"}
              description={
                "Publique seus produtos para venda/troca ou navegue pelos anúncios de outros estudantes."
              }
              iconComponent={<FaShoppingCart />}
              icon
            />
            <Card
              title={"3. Negocie ou Troque"}
              description={
                "Entre em contato direto com outros estudantes e combine a melhor forma de negociar."
              }
              iconComponent={<FaExchangeAlt />}
              icon
            />
          </div>
        </Layout>
      </section>
      <Espacamento />
      <section className="info-section">
        <h3>Por que usar o AquiTemFCTE?</h3>
        <div className="ads-container">
          <InfoContainer>
            <h4>Exclusivo para Estudantes</h4>
            <p>
              Apenas estudantes da FCTE/UnB podem participar, garantindo um
              ambiente seguro e confiável.
            </p>
          </InfoContainer>

          <InfoContainer>
            <h4>Economia Sustentável</h4>
            <p>
              Reutilize produtos e economize dinheiro enquanto contribui para um
              consumo mais consciente.
            </p>
          </InfoContainer>

          <InfoContainer>
            <h4>Fácil de Usar</h4>
            <p>
              Interface simples e intuitiva, desenvolvida pensando na
              praticidade do dia a dia estudantil.
            </p>
          </InfoContainer>

          <InfoContainer>
            <h4>Comunidade Local</h4>
            <p>
              Conecte-se com colegas do seu próprio campus e facilite encontros
              presenciais.
            </p>
          </InfoContainer>
        </div>
      </section>
    </Container>
  );
}
