import { useState } from "react";
import { Container, IconField, InputField } from "./styled";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function Input({
  placeholder,
  type = "text",
  onChange,
  icon = false,
  iconChildren
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };
  return (
    <Container>
      {icon && <IconField>{iconChildren}</IconField>}
      <InputField
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
      />
      {type === "password" && (
        <IconField
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        >
          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </IconField>
      )}
    </Container>
  );
}
