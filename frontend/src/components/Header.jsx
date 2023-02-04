import React from "react";
import styled from "styled-components";
import { Navbar } from "react-bootstrap";
import Logo from "../assets/gift.png";

const StyledLogo = styled.img`
  width: 3rem;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledTitle = styled.h3`
  margin: 0.5rem;
`;

export default function Header() {
  return (
    <Navbar bg="light">
      <StyledContainer>
        <StyledLogo src={Logo} fluid />
        <StyledTitle>Amigo Secreto</StyledTitle>
      </StyledContainer>
    </Navbar>
  );
}
