import React from "react";
import {
  PopupContainer,
  PopupContent,
  PopupOverlay,
  CloseButton,
} from "./style";

const Popup = ({ isOpen, onClose, disabled = false, children }) => {
  if (!isOpen) return null;

  return (
    <PopupOverlay>
      <PopupContainer>
        {disabled ? null : <CloseButton onClick={onClose}>&times;</CloseButton>}
        <PopupContent>{children}</PopupContent>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Popup;
