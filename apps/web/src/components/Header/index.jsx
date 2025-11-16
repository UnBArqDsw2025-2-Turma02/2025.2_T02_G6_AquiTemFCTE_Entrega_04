import { Container, Lettering, NavLinks } from "./style";
import AquiTemFCTELogo from "../../assets/AquiTemFCTELogo.svg";
import Button from "../Button";
import { useState, useEffect } from "react";

import { RxAccessibility, RxHamburgerMenu } from "react-icons/rx";
import { FaRegMoon } from "react-icons/fa";
import {
  IoChatbubbleOutline,
  IoStarOutline,
  IoPersonOutline,
  IoSearchOutline,
} from "react-icons/io5";


export default function Header() {
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
        <img src={AquiTemFCTELogo} alt="Aqui Tem FCTE Logo" className="logo" />
        <div className="links big-monitor">
          <a href="#home">Eletrônicos</a>
          <a href="#about">Livros</a>
          <a href="#contact">Roupas</a>
          <a href="#contact">Outros</a>
        </div>
        <div className="buttons big-monitor">
          <IoSearchOutline className="react-icon search" />
          <IoChatbubbleOutline className="react-icon chat" />
          <IoStarOutline className="react-icon star" />
          <IoPersonOutline className="react-icon user" />
          <Button>Quero Anunciar!</Button>
        </div>

        <div className="hamburger-menu small-monitor">
          <RxHamburgerMenu className="react-icon hamburger" />
        </div>
      </NavLinks>
    </Container>
  );
}
