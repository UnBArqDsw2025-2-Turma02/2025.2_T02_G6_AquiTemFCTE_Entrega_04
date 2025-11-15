import styled, { css } from "styled-components";

const buttonVariants = {
  default: css`
    background: var(--secondary-color);
    color: var(--white);
    &:hover {
      background: var(--secondary-color-dark);
      color: var(--white);
    }
  `,
  outlineBlue: css`
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    &:hover {
      background: var(--primary-color);
      color: var(--white);
    }
  `
};

export const Container = styled.button`
  display: flex;
  margin-block: 15px;
  padding-block: 8px;
  padding-inline: 20px;
  border-radius: 8px;
  outline: none;
  border: none;
  font-family: var(--font-family);
  font-weight: bold;
  cursor: pointer;
  transition: 200ms;
  text-decoration: none;
  font-size: 0.8rem;

  ${({ variant }) => buttonVariants[variant] || buttonVariants.default}
`;