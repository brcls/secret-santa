import {
  Form,
  Button,
  Container,
  Alert,
  Accordion,
  ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StyledContainer = styled(Container)`
  margin-top: 50px;
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

export default function Login() {
  const [showSortear, setShowSortear] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const navigate = useNavigate();

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

  function handleNovoUsuario(e) {
    e.preventDefault();

    api.post("/users", user).catch((error) => {
      alert(error);
      console.log(error);
    });
  }

  function handleAtualizarUsuario(id, e) {
    e.preventDefault();
    api.put(`/users/${id}`, newUser).catch((error) => {
      alert(error);
    });
  }

  function handleSorteio(e) {
    e.preventDefault();
    console.log("Sorteio realizado");
    setShowSortear(true);
  }

  return (
    <>
      <Header />
      <StyledContainer>
        <Alert show={showSortear} variant="success">
          <Alert.Heading>Sorteio realizado!</Alert.Heading>
          <p>
            Os amigos secretos serão enviados para o email cadastrado de cada
            um!
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setShowSortear(false)}
              variant="outline-success"
            >
              Fechar
            </Button>
          </div>
        </Alert>

        {!showSortear && (
          <StyledTitle>Aperte o botão para realizar o sorteio</StyledTitle>
        )}

        {!showSortear && (
          <StyledButton variant="secondary" onClick={handleSorteio}>
            Sortear
          </StyledButton>
        )}

        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Cadastro de novo membro</Accordion.Header>
            <Accordion.Body>
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
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </Form.Group>

                <StyledButton variant="secondary" type="submit">
                  Cadastro
                </StyledButton>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </StyledContainer>
      <StyledContainer>
        <ListGroup>
          {users == 0 ? (
            <StyledTitle>Sem nenhum amigo secreto</StyledTitle>
          ) : (
            users.map((user) => (
              <>
                <Accordion defaultActiveKey="0">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{user.nome}</Accordion.Header>
                    <Accordion.Body>
                      <Form
                        onSubmit={(e) => handleAtualizarUsuario(user._id, e)}
                      >
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
              </>
            ))
          )}
        </ListGroup>
      </StyledContainer>
    </>
  );
}
