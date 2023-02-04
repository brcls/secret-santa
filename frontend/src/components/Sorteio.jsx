import { Button, Container, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import styled from "styled-components";
import api from "../services/api";
import emailjs from "emailjs-com";
import amigosAtribuidos from "../services/utils/sortearAmigos";

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

export default function Home() {
  const [showSortear, setShowSortear] = useState(false);
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
    setShowSortear(true);

    const amigos = amigosAtribuidos;

    amigos.map((amigo) => {
      const { nome, email, amigoSecreto } = amigo;

      const templateParams = {
        user_name: nome,
        to_email: email,
        secret_friend: amigoSecreto.nome,
      };

      console.log(templateParams);

      emailjs
        .send(
          "service_sqhr29x",
          "template_1qplrf9",
          templateParams,
          "vgaMNG4u-lLcqFcPu"
        )
        .then(
          (result) => console.log(result.text),
          (error) => console.log(error.text)
        );
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

      {!showSortear && (
        <StyledTitle>Aperte o botão para realizar o sorteio</StyledTitle>
      )}

      {!showSortear && (
        <StyledButton variant="secondary" onClick={handleSorteio}>
          Sortear
        </StyledButton>
      )}
    </StyledContainer>
  );
}
