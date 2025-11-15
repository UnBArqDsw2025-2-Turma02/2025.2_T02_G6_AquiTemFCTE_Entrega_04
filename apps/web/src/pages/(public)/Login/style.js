import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block: 80px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: var(--white);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;

  .form-side {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px;
    font-family: var(--font-family);
    height: 100%;
    gap: 10px;

    h1 {
      margin: 15px 0 0 0;
      text-align: center;
    }

    span {
      text-align: center;
    }
  }

  .register-side {
    flex: 1;
    display: flex;
    background-color: var(--secondary-color);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 0 12px 12px 0;
    padding: 40px;
    text-align: center;
    color: var(--white);
    font-family: var(--font-family);
    gap: 30px;

    h2 {
      font-weight: bold;
      font-size: 2rem;
      margin: 15px 0 0 0;
    }

    span {
      font-size: 0.8rem;
    }

    .description-area {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }

  @media (max-width: 700px) {
    flex-direction: column;

    .register-side {
      border-radius: 0 0 12px 12px;
    }
  }
`;

export const MicrosoftLoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 3px solid #e07800;
  border-radius: 100px;
  color: #e07800;
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #e07800;
    color: #ffffff;
  }
`;