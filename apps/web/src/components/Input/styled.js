import styled from "styled-components";

export const InputBox = styled.div`
  display: flex;
  align-self: stretch;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-block: 8px;
  width: 100%;
  background-color: #E1E1E1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const IconField = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 48px;
  font-size: 1.3rem;
`;

export const InputField = styled.input`
  flex: 1;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 48px;
  width: 100%;
  background-color: transparent;
  border: none;
  color: black;
  font-family: var(--font-family);

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const InputFile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: auto;
  padding: 24px;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 2px dashed var(--input-border, #c2c2c2);
  &:hover {
      border-color: var(--primary, #5f77ff);
      background-color: rgba(95, 119, 255, 0.05);
      cursor: pointer;
    }
  
  .upload-icon {
    font-size: 24px;
    color: var(--tertiary-color-dark);
  }

  .upload-text {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    align-items: center;
  }

  .file-hidden-input {
    display: none;
  }

  span {
    color: var(--tertiary-color-dark);
  }

  .file-name {
    font-size: var(--fs-scale-down-01);
    color: red;
    font-style: italic;
    font-weight: var(--font-weight-light);
  }


`;
