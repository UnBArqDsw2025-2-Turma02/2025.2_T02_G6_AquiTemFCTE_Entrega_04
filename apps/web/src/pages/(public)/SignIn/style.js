import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-block: 48px;
  margin-inline: 10%;
  gap: 32px;
    
    .title-signin {
        display: flex;
        gap: 8px;
    }
    
    .form-signin {
        align-self: stretch;
    }
    
    .fields-uploads {
        display: flex;
        gap: 10%;
        flex-direction: row;
        flex-wrap: wrap;
        gap-block: 40px;
    }

    .fields-form {
        flex: 1;
        display: flex;
        gap: 16px;
        min-width: 240px;
        padding-bottom: 32px;
    }
`;
