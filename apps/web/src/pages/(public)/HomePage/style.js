import styled from "styled-components";

export const Layout = styled.div`
  justify-content: center;
  align-items: center;
  width: 1900px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 2000px) {
    width: 90%;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

export const Espacamento = styled.div`
  height: 580px;

  @media (max-width: 1002px) {
    height: 640px;
  }

  @media (max-width: 885px) {
    height: 670px;
  }

  @media (max-width: 725px) {
    height: 1000px;
  }

  @media (max-width: 492px) {
    height: 1100px;
  }

  @media (max-width: 386px) {
    height: 1200px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 470px) {
    margin-top: -26px;
  }

  @media (max-width: 320px) {
    margin-top: -38px;
  }

  .buttons-section {
    position: absolute;
    left: 0;
    width: 100%;
    gap: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 50px 20px;
    background-color: #d9d9d9;

    h1 {
      color: var(--primary-color);
      font-weight: 600;
      font-size: var(--fs-scale-up-05);

      span {
        font-size: var(--fs-scale-up-05);
        font-weight: 600;
        color: var(--secondary-color);
      }
    }

    .subtitle {
      color: #5b5b5b;
      font-size: var(--fs-scale-base);
      max-width: 800px;
    }
  }

  .buttons-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .second-title {
    color: var(--primary-color);
    font-weight: 600;
  }

  .cards-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;

    @media (max-width: 725px) {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  .info-section {
    display: flex;
    gap: 60px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 70px 20px;

    h3 {
      color: var(--primary-color);
      font-weight: 500;
      font-size: var(--fs-scale-up-04);
    }
  }

  .ads-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 80px;
    justify-items: center;
    align-items: center;

    @media (max-width: 725px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 20px;
  width: 300px;

  h4 {
    color: var(--primary-color);
  }

  p {
    text-align: start;
  }
`;
