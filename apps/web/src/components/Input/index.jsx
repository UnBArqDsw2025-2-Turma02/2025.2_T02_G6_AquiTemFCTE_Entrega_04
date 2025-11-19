import { useState, useId } from "react";
import { Container, IconField, InputField, InputFile } from "./styled";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Input({
  label, 
  placeholder = "Digite aqui...",
  type = "text",
  onChange,
  icon = false,
  iconChildren,
  id = useId(),
  required = false,
  accept,
  multiple,
  disabled = false,
  value,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);
  const [fileName, setFileName] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) {
      setFileName(null);
    } else if (files.length === 1) {
      setFileName(files[0].name);
    } else {
      setFileName(`${files.length} arquivos selecionados`);
    }
    onChange && onChange(e);
  };

  return (
    <div style={{ alignSelf: "stretch"}}>
      <label htmlFor={id} className="input-label">
        {label} {required && <span className="required">*</span>}
        <Container>
          {type === "file" ? (
            <InputFile>
                <FaCloudUploadAlt className="upload-icon" />
                <div className="upload-text">
                  <strong>Clique para enviar</strong>
                  <span>ou arraste e solte</span>
                </div>

              <input
                id={id}
                type="file"
                accept={accept}
                multiple={multiple}
                className="file-hidden-input"
                onChange={handleFileChange}
              />
            </InputFile>
          ) : (
            <>
              {icon && <IconField>{iconChildren}</IconField>}

              <InputField
                id={id}
                type={type === "password" ? inputType : type}
                placeholder={placeholder}
                onChange={onChange}
                required={required}
                disabled={disabled}
                value={value}
              />

              {type === "password" && (
                <IconField
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </IconField>
              )}
            </>
          )}

        </Container>
        {type === "file" && fileName && ( <span className="file-name">{fileName}</span>)}
      </label>
    </div>
  );
}
