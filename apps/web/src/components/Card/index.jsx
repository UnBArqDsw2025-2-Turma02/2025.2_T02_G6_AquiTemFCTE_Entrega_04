import { Container, IconContainer } from "./style";

export default function Card({
  icon = false,
  iconComponent,
  title,
  description
}) {
  return (
    <Container>
      {icon ? <IconContainer>{iconComponent}</IconContainer> : null}
      <h3>{title}</h3>
      <p>
        {description}
      </p>
    </Container>
  );
}