import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";

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
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  function handleNovoUsuario(e) {
    e.preventDefault();

    console.log(user);

    api
      .post("/users", user)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  }

  return (
    <>
      <Header />
      <StyledContainer>
        <StyledTitle>Cadastro</StyledTitle>
        <Form onSubmit={handleNovoUsuario}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nome"
              onChange={(e) => setUser({ ...user, nome: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Senha"
              onChange={(e) => setUser({ ...user, senha: e.target.value })}
            />
          </Form.Group>

          <StyledButton variant="secondary" type="submit">
            Cadastro
          </StyledButton>
        </Form>
      </StyledContainer>
    </>
  );
}
