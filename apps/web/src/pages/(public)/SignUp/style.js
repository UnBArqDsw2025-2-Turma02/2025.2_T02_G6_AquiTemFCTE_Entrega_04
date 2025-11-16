import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-block: 48px;
    
    .title-signin {
        display: flex;
        flex-direction: column;
        gap: 0px;

        h1 {
            margin: 0;
        }
    }
    
    .form-signin {
        align-self: stretch;
    }
    
    .fields-uploads {
        display: flex;
        gap: 10%;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .fields-form {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
        min-width: 240px;
        padding-bottom: 32px;
    }

    .redirect-login {
        font-size: var(--fs-scale-down-01);
    }
`;
