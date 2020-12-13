import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.svg";

const StyledLink = styled.div`
  color: grey;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  margin-left: 10px;

  &:hover {
    color: white;
    background-color: #33ceff;
    border: none;
  }
  @media (max-width: 1000px) {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 0px;
    padding: 10px;
    border: 1px solid #ccc;
  }
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  alt: "logo";
  margin-right: 10px;
  content: url(${logo});

  @media (min-width: 1000px) {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
`;

const Divider = styled.hr`
  margin-top: 5px;
  border-top: 1px solid #ccc;
  border-color: #33ceff;
`;

const StyledBrand = styled(Navbar.Brand)`
  font-weight: bold;
  font-size: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4mm 3cm;
`;

const StyledNav = styled(Nav)`
  display: flex;
  flex-direction: row;
`;

const NavBar = () => {
  return (
    <>
      <React.Fragment>
        <Navbar expand="lg" variant="light">
          <StyledContainer>
            <StyledBrand
              style={{ color: "#33CEFF", textDecoration: "none" }}
              href="/"
            >
              <Logo />
              <h2>Football Field Management</h2>
            </StyledBrand>

            <StyledNav>
              <Link to="/" style={{ textDecoration: "none" }}>
                <StyledLink>Home</StyledLink>
              </Link>
              <Link to="/" style={{ textDecoration: "none" }}>
                <StyledLink>Sign out</StyledLink>
              </Link>
            </StyledNav>
          </StyledContainer>
        </Navbar>
      </React.Fragment>
      <Divider />
    </>
  );
};

export default NavBar;
