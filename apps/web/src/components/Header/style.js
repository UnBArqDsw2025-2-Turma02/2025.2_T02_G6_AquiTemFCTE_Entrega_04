import styled from "styled-components";

export const Container = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: fixed;
`;

export const Lettering = styled.div`
  width: 100%;
  display: flex;
  padding-block: 4px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: var(--white);
  padding-inline: 24px;

  .chamada {
    font-size: 0.8rem;
    font-family: var(--font-family);
    font-weight: 400;
  }

  .icons {
    display: flex;
    flex-direction: row;
    gap: 16px;

    .react-icon {
      font-size: 1.1rem;
      cursor: pointer;
      color: var(--primary-color);
    }
  }

  @media (max-width: 470px) {
    display: none;
  }
`;

export const NavLinks = styled.nav`
  display: flex;
  padding-block: 8px;
  padding-inline: 24px;
  width: 100%;
  background-color: var(--primary-color);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--tertiary-color);

  .logo {
    height: 40px;
    width: auto;
  }

  .links {
    display: flex;
    flex-direction: row;
    gap: 24px;
    a {
      font-size: 0.8rem;
      font-family: var(--font-family);
      font-weight: 400;
      color: var(--white);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    gap: 16px;
    align-items: center;

    .react-icon {
      cursor: pointer;
      color: var(--white);
      font-size: 1.2rem;
    }
  }

  .small-monitor {
    display: none;
  }

  @media (max-width: 880px) {
    padding-block: 19px;

    .big-monitor {
      display: none;
    }

    .small-monitor {
      display: block;
    }

    .hamburger-menu .react-icon {
      font-size: 1.5rem;
      color: var(--white);
      cursor: pointer;
    }
  }

  @media (max-width: 320px) {
    padding-inline: 12px;
    gap: 44px;
    justify-content: center;
    .logo {
      height: 25px;
    }
  }
`;