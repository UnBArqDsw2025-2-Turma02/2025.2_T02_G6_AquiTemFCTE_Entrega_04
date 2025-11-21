import styled, { css } from "styled-components";

const SquareVariants = {
  default: css`
    background-color: rgba(0, 58, 122, 0.20);
    color: var(--primary-color);
  `,
  secondary: css`
    background-color: rgba(0, 130, 46, 0.20);
    color: var(--secondary-color);
  `,
};

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 10px;
  border-radius: 8px;

  ${({ variant }) => SquareVariants[variant] || SquareVariants.default}
`;