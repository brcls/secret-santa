import { Button, Container, Alert } from "react-bootstrap";
import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
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

const StyledTitle = styled.h4`
  text-align: center;
  margin-top: 50px;
  font-weight: 700;
`;

export default function Login() {
  const [show, setShow] = useState(false);

  function handleSorteio(e) {
    e.preventDefault();
    console.log("Sorteio realizado");
    setShow(true);
  }

  return (
    <>
      <Header />
      <StyledContainer>
        <Alert show={show} variant="success">
          <Alert.Heading>Sorteio realizado!</Alert.Heading>
          <p>
            Os amigos secretos serão enviados para o email cadastrado de cada
            um!
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              Fechar
            </Button>
          </div>
        </Alert>

        {!show && (
          <StyledTitle>Aperte o botão para realizar o sorteio</StyledTitle>
        )}

        {!show && (
          <StyledButton variant="secondary" onClick={handleSorteio}>
            Sortear
          </StyledButton>
        )}
      </StyledContainer>
    </>
  );
}
