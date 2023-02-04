import { Form, Button, Container, Overlay } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import api from "../services/api";

const StyledContainer = styled(Container)`
  margin-top: 50px;
  background-color: #fbfbfb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  max-width: 60%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  margin-top: 10px;
  background-color: #19af93;
  border: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const StyledTitle = styled.h2`
  text-align: center;
`;

export default function CardCadastro() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    api
      .get("/users")
      .then(({ data }) => {
        setUsers(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [users]);

  function handleNovoUsuario(e) {
    e.preventDefault();
    setShow(!show);
    api.post("/users", user).catch((error) => {
      alert(error);
      console.log(error);
    });
  }

  return (
    <StyledContainer>
      <StyledTitle>Cadastrar novo amigo</StyledTitle>
      <Form onSubmit={handleNovoUsuario}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nome"
            onChange={(e) => setUser({ ...user, nome: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>

        <StyledButton ref={target} variant="secondary" type="submit">
          Cadastro
        </StyledButton>
        <Overlay
          transition
          target={target.current}
          show={show}
          placement="bottom"
          onEntered={() => {
            setTimeout(() => {
              setShow(false);
            }, 2000);
          }}
        >
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
              {...props}
              style={{
                backgroundColor: "#19af93c0",
                padding: "2px 10px",
                color: "white",
                borderRadius: 3,
                ...props.style,
              }}
            >
              Amigo cadastrado com sucesso!
            </div>
          )}
        </Overlay>
      </Form>
    </StyledContainer>
  );
}
