import { Form, Button, Container, Accordion, ListGroup } from "react-bootstrap";
import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../services/api";

const StyledContainer = styled(Container)`
  margin-top: 50px;
  margin-bottom: 50px;
  background-color: #fbfbfb;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
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

export default function ListaUsers() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

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

  function handleApagarUsuario(id, e) {
    e.preventDefault();
    api.delete(`/users/${id}`).catch((error) => {
      alert(error);
    });
  }

  function handleAtualizarUsuario(id, e) {
    e.preventDefault();
    api.put(`/users/${id}`, newUser).catch((error) => {
      alert(error);
    });
  }

  return (
    <StyledContainer>
      {users == 0 ? (
        <StyledTitle>Sem nenhum amigo secreto</StyledTitle>
      ) : (
        <StyledTitle>Amigos</StyledTitle>
      )}
      <ListGroup>
        {users ? (
          users.map((user) => (
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{user.nome}</Accordion.Header>
                <Accordion.Body>
                  <Form onSubmit={(e) => handleAtualizarUsuario(user._id, e)}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label>Nome</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Nome"
                        defaultValue={user.nome}
                        onChange={(e) =>
                          setNewUser({ ...newUser, nome: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        defaultValue={user.email}
                        onChange={(e) =>
                          setNewUser({ ...newUser, email: e.target.value })
                        }
                      />
                    </Form.Group>

                    <StyledButton variant="secondary" type="submit">
                      Atualizar
                    </StyledButton>
                    <StyledButton
                      onClick={(e) => handleApagarUsuario(user._id, e)}
                      variant="danger"
                    >
                      Excluir
                    </StyledButton>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
        ) : (
          <></>
        )}
      </ListGroup>
    </StyledContainer>
  );
}
