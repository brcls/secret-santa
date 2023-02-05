import { Button, Container, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../services/api";
import emailjs from "emailjs-com";

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

export default function Home() {
  const [showSortear, setShowSortear] = useState(false);
  const [showErro, setShowErro] = useState(false);
  const [users, setUsers] = useState([]);

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

  function handleSorteio(e) {
    e.preventDefault();

    api
      .get("/users/sortear")
      .then(({ data }) => {
        setShowSortear(true);

        data.map((user) => {
          emailjs
            .send(
              "service_sqhr29x",
              "template_1qplrf9",
              user,
              "vgaMNG4u-lLcqFcPu"
            )
            .then(
              (result) => console.log(result.text),
              (error) => console.log(error.text)
            );
        });
      })
      .catch((error) => {
        console.log(error);
        setShowErro(true);
      });
  }

  return (
    <StyledContainer>
      <Alert show={showSortear} variant="success">
        <Alert.Heading>Sorteio realizado!</Alert.Heading>
        <p>
          Os amigos secretos serão enviados para o email cadastrado de cada um!
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

      <Alert show={showErro} variant="danger">
        <Alert.Heading>Sorteio não realizado!</Alert.Heading>
        <p>
          Deve haver um número par de amigos para que todos sejam presenteados!
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowErro(false)} variant="outline-danger">
            Fechar
          </Button>
        </div>
      </Alert>

      {!showSortear && !showErro && (
        <StyledTitle>Aperte o botão para realizar o sorteio</StyledTitle>
      )}

      {!showSortear && !showErro && (
        <StyledButton variant="secondary" onClick={handleSorteio}>
          Sortear
        </StyledButton>
      )}
    </StyledContainer>
  );
}
