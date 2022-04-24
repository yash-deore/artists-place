import React from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {
  return (
    <Container>
      <h4>1 . Demo Video</h4>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/QRPuK7iWrgg"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
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
