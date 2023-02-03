import React from "react";
import styled from "styled-components";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/gift.png";

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
`;

export default function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <StyledLink to="/">
            <StyledLogo src={Logo} fluid /> Amigo Secreto
          </StyledLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <StyledLink to="/login">Login</StyledLink>
            </Nav.Link>
            <Nav.Link>
              <StyledLink to="/cadastro">Cadastro</StyledLink>
            </Nav.Link>
            <Nav.Link>
              <StyledLink to="/">Sorteio</StyledLink>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
