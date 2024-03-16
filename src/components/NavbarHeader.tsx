import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import CheckAuthorization from "./CheckAuthorization";
import { useNavigate } from "react-router";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { UserStateModel } from "./LoginPage";

const NavbarHeader = () => {
  const signOut = useSignOut();
  const navigate = useNavigate();
  const authAnyType = useAuthUser<UserStateModel>();

  const signOutMethod = () => {
    signOut();
    navigate("/login");
  };

  const renderResidentNavbar = () => {
    if (CheckAuthorization("RESIDENT", ["READ"])) {
      return (
        <Nav.Link as={NavLink} to="/residents">
          Residents
        </Nav.Link>
      );
    }
  };

  const renderHouseholdNavbar = () => {
    if (CheckAuthorization("HOUSEHOLD", ["READ"])) {
      return (
        <Nav.Link as={NavLink} to="/households">
          Households
        </Nav.Link>
      );
    }
  };

  const renderBrgyInfoNavbar = () => {
    if (CheckAuthorization("BRGY_INFO", ["READ"])) {
      return (
        /*<Nav.Link as={NavLink} to="/brgy-info">
          Brgy Info
        </Nav.Link>*/
        <NavDropdown.Item as={NavLink} to="/brgy-info">
          Brgy Info
        </NavDropdown.Item>
      );
    }
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
              {renderResidentNavbar()}
              {renderHouseholdNavbar()}
            </Nav>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <NavDropdown title={authAnyType?.userName}>
                {renderBrgyInfoNavbar()}
                {/*<NavDropdown.Divider />*/}
                <NavDropdown.Item onClick={signOutMethod}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarHeader;
