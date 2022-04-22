import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WalletConnectButton from "./WalletConnectButton";

const LinkStyle = { textDecoration: "none", color: "white" };

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>🧑‍🎨Artist's Place🧑‍🎨</Navbar.Brand>

        <Nav>
          <Nav.Link>
            <Link to="/" style={LinkStyle}>
              Home{" "}
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/market-place" style={LinkStyle}>
              Market-Place{" "}
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/create-nft" style={LinkStyle}>
              Create-NFT{" "}
            </Link>
          </Nav.Link>

          <Nav.Link>
            <Link to="/creator-dashboard" style={LinkStyle}>
              Dashboard{" "}
            </Link>
          </Nav.Link>

          <WalletConnectButton />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;
