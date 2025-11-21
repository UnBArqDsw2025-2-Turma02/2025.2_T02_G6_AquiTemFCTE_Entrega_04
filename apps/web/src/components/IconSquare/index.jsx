import { Container } from "./style";

export default function IconSquare({
  icon,
  variant = "default",
}) {
  return (
    <Container variant={variant}>
      {icon}
    </Container>
  );
}
