import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-block: 8px;
  width: 100%;
  height: 48px;
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
  height: 100%;
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