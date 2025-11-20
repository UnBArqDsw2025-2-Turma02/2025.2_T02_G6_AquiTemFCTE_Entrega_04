import { Container, Lettering, NavLinks } from "./style";
import AquiTemFCTELogo from "../../../assets/AquiTemFCTELogo.svg";
import Button from "../../Button";
import { useState, useEffect } from "react";
import { ROUTES } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";

import { RxAccessibility, RxHamburgerMenu } from "react-icons/rx";
import { FaRegMoon } from "react-icons/fa";

export default function Header() {
  const navigate = useNavigate();

  const chamadas = [
    "O primeiro site de venda e troca da FCTE para a FCTE!",
    "Procurando algo no precinho? AquiTem!",
    "Venda o que você não usa mais na AquiTemFCTE!",
    "Compre e troque com segurança na comunidade FCTE!",
    "Encontre ofertas imperdíveis!",
  ];

  const [chamadaAtual, setChamadaAtual] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);

      setTimeout(() => {
        setChamadaAtual((prev) => (prev + 1) % chamadas.length);
        setIsVisible(true);
      }, 300);
    }, 10000);

    return () => clearInterval(interval);
  }, [chamadas.length]);

  return (
    <Container>
      <Lettering>
        <div />
        <span
          className="chamada"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {chamadas[chamadaAtual]}
        </span>
        <div className="icons">
          <RxAccessibility className="react-icon" />
          <FaRegMoon className="react-icon" />
        </div>
      </Lettering>
      <NavLinks>
        <img
          src={AquiTemFCTELogo}
          alt="Aqui Tem FCTE Logo"
          className="logo"
          onClick={() => navigate(ROUTES.HOME)}
        />
        <div className="links big-monitor">
          <a onClick={() => navigate(ROUTES.HOME)}>Início</a>
          <a href="#about">Sobre</a>
          <a href="#contact">FAQ</a>
        </div>
        <div className="buttons big-monitor">
          <Button onClick={() => navigate(ROUTES.LOGIN)}>Entrar / Cadastrar</Button>
        </div>

        <div className="hamburger-menu small-monitor">
          <RxHamburgerMenu className="react-icon hamburger" />
        </div>
      </NavLinks>
    </Container>
  );
}
