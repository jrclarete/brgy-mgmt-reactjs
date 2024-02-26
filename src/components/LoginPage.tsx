import React, { FormEvent, useState } from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { JwtPayload, jwtDecode } from "jwt-decode";

type Props = {};

const client = axios.create({
  baseURL: "/api/account/login",
});

const LoginPage = (props: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const signIn = useSignIn();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const Login = async (email: string, password: string) => {
    await client
      .post("", {
        email,
        password,
      })
      .then((response) => {
        if (
          signIn({
            auth: {
              token: response.data.token,
              type: "Bearer",
            },
            userState: {
              email: response.data.email,
              uid: response.data.id,
              userName: response.data.userName,
            },
          })
        ) {
          navigate(from, { replace: true });
        } else {
          console.log("ERROR");
        }
      })
      .catch((error) => {
        console.log(`Error here ${error}`);
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login(email, password);
  };

  return isAuthenticated() ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card className="p-3">
              <Card.Body>
                <Card.Title>Brgy-Mgmt Login</Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
