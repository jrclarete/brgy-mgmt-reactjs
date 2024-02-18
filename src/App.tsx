import { Outlet } from "react-router";
import NavbarHeader from "./components/NavbarHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div>
      <NavbarHeader />
      <Container className="mt-5">
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
