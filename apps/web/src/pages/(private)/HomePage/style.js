import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  gap: 60px;
`;

export const CallingSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  span {
    font-weight: bold;
    color: var(--secondary-color);
    font-size: var(--fs-scale-up-06);
  }

  h1 {
    color: var(--primary-color);
    font-weight: var(--fw-medium);
    font-size: var(--fs-scale-up-05);
    text-align: center;
    max-width: 400px;
  }

  p {
    text-align: center;
    color: #5b5b5b;
    max-width: 800px;
  }

  .IconSquares {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    gap: 100px;
  }

  .card-label {
    font-size: var(--fs-scale-base);
    font-weight: var(--fw-regular);
    color: #5b5b5b;
    max-width: 300px;
  }

  .card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
`;

export const MarketSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .initial-title {
    font-size: var(--fs-scale-up-03);
    font-weight: var(--fw-medium);
    color: var(--primary-color);
  }
`;

export const ButtonContainer = styled.div`
  background-color: var(--primary-color);
  color: var(--white);
  margin-block: 15px;
  padding-block: 8px;
  padding-inline: 100px;
  border-radius: 8px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  gap: 20px;
  min-width: fit-content;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .icon {
    font-size: 18px;
  }

  &:hover {
    background-color: var(--primary-color-dark);
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  cursor: pointer;

  font-size: var(--fs-scale-down-01);
  text-decoration: underline;

  .icon {
    font-size: var(--fs-scale-down-01);
  }
`;