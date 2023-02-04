import {
  Form,
  Button,
  Container,
  Accordion,
  ListGroup,
  Overlay,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
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

  function handleApagarUsuario(id, e) {
    e.preventDefault();
    api.delete(`/users/${id}`).catch((error) => {
      alert(error);
    });
  }

  function handleAtualizarUsuario(id, e) {
    e.preventDefault();
    setShow(!show);
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
            <Accordion key={user._id}>
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

                    <StyledButton
                      ref={target}
                      variant="secondary"
                      type="submit"
                    >
                      Atualizar
                    </StyledButton>
                    <Overlay
                      transition
                      target={target.current}
                      show={show}
                      placement="top"
                      onEntered={() => {
                        setTimeout(() => {
                          setShow(false);
                        }, 2000);
                      }}
                    >
                      {({
                        placement,
                        arrowProps,
                        show: _show,
                        popper,
                        ...props
                      }) => (
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
                          Amigo atualizado com sucesso!
                        </div>
                      )}
                    </Overlay>
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
