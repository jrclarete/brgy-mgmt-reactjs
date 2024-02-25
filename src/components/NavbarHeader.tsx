import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router";

const NavbarHeader = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();

  const signOutMethod = () => {
    signOut();
    navigate("/login");
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Brgy-Mgmt
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/residents">
                Residents
              </Nav.Link>
              <Nav.Link as={NavLink} to="/households">
                Households
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-light" onClick={signOutMethod}>
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarHeader;
