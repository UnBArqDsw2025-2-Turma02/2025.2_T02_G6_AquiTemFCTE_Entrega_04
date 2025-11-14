import { Container } from "./style";

export default function Button ({
  children,
  variant = "default",
  onClick,
}) {
  return (
    <Container
      variant={variant}
      onClick={onClick}    >
      {children}
    </Container>
  );
};