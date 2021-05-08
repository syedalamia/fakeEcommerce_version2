import React, { useReducer, useEffect, useState } from "react";

import { Link as RouteLink } from "react-router-dom";

import axios from "axios";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import login from "../img/login.PNG";

function Signup() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [formInput, setFormInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: "",
      lastName: "",
      user_name: "",
      email: "",
      password: "",
      city: "",
      street: "",
      number: "",
      zipcode: "",
      phone: "",
      lat: "",
      long: "",
    }
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setFormInput({ lat: position.coords.latitude });
      setFormInput({ long: position.coords.longitude });
    });
  }, []);
  const handleInput = (evt) => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };
  const submitForm = (evt) => {
    evt.preventDefault();

    axios
      .post("http://127.0.0.1:8080/signup", {
        email: formInput.email,
        username: formInput.user_name,
        password: formInput.password,
        firstname: formInput.firstName,
        lastname: formInput.lastName,
        address: {
          city: formInput.city,
          street: formInput.street,
          number: formInput.number,
          zipcode: formInput.zipcode,
          geolocation: {
            lat: formInput.lat,
            long: formInput.long,
          },
        },
        phone: formInput.phone,
      })
      .then((res) => {
        history.push("/login");
      })
      .catch((e) => {
        setMsg(e.response.data);
        setOpen(true);
      });
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <Image src={login} fluid />
        </Col>
        <Col md={6}>
          <FormContainer>
            <h1 className="mt-5 text-center">Sign In</h1>

            <Form onSubmit={submitForm}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  onChange={handleInput}
                  placeholder="Enter Name"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={handleInput}
                  placeholder="Enter Name"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="user_name">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  id="user_name"
                  label="User Name"
                  name="user_name"
                  onChange={handleInput}
                  placeholder="username"
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  value={formInput.email}
                  id="email"
                  label="Email Address"
                  name="email"
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

              <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  id="city"
                  label="City"
                  onChange={handleInput}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="street">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  id="street"
                  label="Street"
                  name="street"
                  onChange={handleInput}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="number">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  name="number"
                  type="number"
                  id="number"
                  label="Number"
                  onChange={handleInput}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="zipcode">
                <Form.Label>Zipcode</Form.Label>
                <Form.Control
                  id="zipcode"
                  label="Zip Code"
                  name="zipcode"
                  onChange={handleInput}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="number">
                <Form.Label>Number</Form.Label>
                <Form.Control
                  name="number"
                  type="number"
                  id="number"
                  label="Number"
                  onChange={handleInput}
                ></Form.Control>
              </Form.Group>

              <Button className="mt-2" type="submit" variant="primary">
                Sign Up
              </Button>
            </Form>

            <Row className="py-3 ">
              <Col>
                <RouteLink to="/login" style={{ color: "black" }}>
                  If you've an account please sign in
                </RouteLink>
              </Col>
            </Row>
          </FormContainer>
        </Col>
      </Row>
    </div>
  );
}

export default Signup;
