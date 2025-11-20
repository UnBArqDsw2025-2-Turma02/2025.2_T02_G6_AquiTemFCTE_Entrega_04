import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 16px;
  background-color: var(--white);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;

  h3 {
    color: var(--primary-color);
    font-size: var(--fs-scale-up-01);
  }

  p {
    color: #5b5b5b;
    font-size: var(--fs-scale-base);
  }
`;

export const IconContainer = styled.div`
  background-color: var(--secondary-color);
  font-size: 20px;
  width: 52px;

  padding: 15px;
  border-radius: 100px;
  color: var(--white);
`;
