import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled.div`
   color: black;
   font-size: 26px;
   font-family: "Nunito", sans-serif;
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 5px;
   padding: 5mm;
   background-color: grey;
   background: radial-gradient(
      ellipse at left bottom,
      rgb(183, 186, 189) 0%,
      rgba(157, 161, 163, 0.9) 59%,
      rgba(206, 209, 209, 0.9) 100%
   );
`;

const Usertype = (props) => {
   return (
      <selection className="signin">
         <div className="signinContainer">
            <h1> Futsal Field Management</h1>
            <div className="button">
               <div className="buttonContainer">
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                     <StyledLink>Customer</StyledLink>
                  </Link>
               </div>
               <br />
               <br />
               <div className="buttonContainer">
                  <Link to="/ownersignup" style={{ textDecoration: "none" }}>
                     <StyledLink>Futsal field owner</StyledLink>
                  </Link>
               </div>
            </div>
         </div>
      </selection>
   );
};

export default Usertype;
