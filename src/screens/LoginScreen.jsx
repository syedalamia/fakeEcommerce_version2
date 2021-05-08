import React, { useState, useEffect, useReducer } from "react";
import { Link as RouteLink } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogin } from "../store/action/userAction";
import FormContainer from "../components/FormContainer";
import login from "../img/login.PNG";

import { setNotificationDisplay } from "../store/action/notificationAction";

function LoginScreen() {
  const dispatch = useDispatch();

  const session = useSelector((state) => state.sessionStore);
  const history = useHistory();

  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: "",
      password: "",
    }
  );
  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const submitForm = (evt) => {
    evt.preventDefault();

    dispatch(userLogin(formInput));
    if (session.token) {
      history.push("/");
    }
  };
  const setDisplay = () => {
    dispatch(setNotificationDisplay());
  };
  useEffect(() => {
    return () => {
      dispatch(setNotificationDisplay());
    };
  }, []);
  return (
    <Row>
      <Col md={6}>
        <Image src={login} fluid />
      </Col>
      <Col md={6}>
        <FormContainer>
          <h1 className="mt-5 text-center">Sign In</h1>

          <Form onSubmit={submitForm}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                id="email"
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter Email"
                value={formInput.email}
                onChange={handleInput}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                label="Password"
                id="password"
                type="password"
                placeholder="Enter Password"
                onChange={handleInput}
              ></Form.Control>
            </Form.Group>

            <Button className="mt-2" type="submit" variant="primary">
              Sign In
            </Button>
          </Form>

          <Row className="py-3 ">
            <Col>
              New Customer?{" "}
              <RouteLink to="/signup" style={{ color: "black" }}>
                Don't have an account? Sign up
              </RouteLink>
            </Col>
          </Row>
        </FormContainer>
      </Col>
    </Row>
  );
}

export default LoginScreen;
