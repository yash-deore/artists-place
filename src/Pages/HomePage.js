import React from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <h4>1 . Demo Video</h4>
      <h4>
        2 . Smart Contract address :{" "}
        <a
          href="https://mumbai.polygonscan.com/address/0x0eC81f2A7538A9937d93B2E99E860260A4650dc6"
          target="_blank"
          rel="noreferrer"
        >
          0x0eC81f2A7538A9937d93B2E99E860260A4650dc6
        </a>
      </h4>
    </Container>
  );
};

export default HomePage;
