import styled from "styled-components";

export const LineHeight = styled.div`
  width: 100%;
  height: 20px;
  background-color: var(--secondary-color);
`;

export const Container = styled.footer`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: var(--primary-color);
  color: var(--white);
  text-align: center;
  font-size: 0.9rem;

  @media (max-width: 450px) {
    flex-direction: column;
  }
`;
export const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  padding: 40px;

  img{
    height: auto;
    width: 250px;
  }

  @media (max-width: 890px) {
    display: none;
  }
  @media (max-width: 450px) {
    display: block;

    img {
      width: 200px;
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  margin-inline: 24px;
  width: 100%;

  .links-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;

    .links-section {
      display: flex;
      flex-direction: column;
      margin-right: 40px;
      align-items: flex-start;

      h3 {
        font-family: var(--font-family);
        font-weight: 700;
        margin-bottom: 12px;
        text-align: start;
      }

      a {
        font-family: var(--font-family);
        font-weight: 400;
        font-size: 0.8rem;
        color: var(--white);
        margin-top: 8px;
        text-align: start;
      }

      .social-media-icons {
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-top: 8px;

        .react-icons {
          font-size: 1.3rem;
          cursor: pointer;
          color: var(--white);
        }
      }
    }
  }

  .copyright {
    font-family: var(--font-family);
    font-weight: 600;
  }

  @media (max-width: 890px) {
    gap: 78px;
  }

  @media (max-width: 730px) {
    .links-container {
      flex-wrap: wrap;
      row-gap: 30px;
    }
  }

  @media (max-width: 450px) {
    margin-inline: 0px;

    .links-container {
      align-items: center;
      flex-direction: column;

      .links-section {
        align-items: center;
        margin-right: 0px;
      }
    }

    .copyright {
      font-size: 0.7rem;
    }
  }
`;