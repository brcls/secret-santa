import { Form, Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const StyledTitle = styled.h1`
  text-align: center;
  margin-top: 50px;
  font-weight: 700;
`;

const StyledContainer = styled(Container)`
  margin-top: 50px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: #19af93;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

export default function Cadastro() {
  return (
    <>
      <Header />
      <StyledContainer>
        <StyledTitle>Cadastro</StyledTitle>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Nome" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Senha" />
          </Form.Group>
          <Link to="/sorteio">
            <StyledButton variant="secondary" type="submit">
              Cadastro
            </StyledButton>
          </Link>
        </Form>
      </StyledContainer>
    </>
  );
}
