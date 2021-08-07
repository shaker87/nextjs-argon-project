import React, { useState, useRef } from "react";
//import { Redirect } from "react-router-dom";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";

// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
// import { loginUser } from "../../../pv1-survey/api/auth";
import { signIn } from "next-auth/client";

function Login2() {
  // const [focusedEmail, setfocusedEmail] = React.useState(false);
  // const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [identifier, setidentifier] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [s_user, setS_user] = React.useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // console.log("pass", password);
  // console.log("s_user", s_user);
  // console.log(`identifier`, identifier);

  const onSubmit = async () => {
    // console.log("onsubmit");
    if (identifier.length < 1) {
      setError("Invalid Required");
      return;
    }
    if (password.length < 6) {
      setError("Password should be greater than 5 characters");
      return;
    }

    try {
      const user = await signIn("credentials", {
        identifier: identifier,
        password: password,
        redirect: false,
      });

      // console.log(`user`, user);

      if (user && !user.success) {
        setError("Identifier or password invalid");
      }

      if (user.ok) {
        // console.log("Test 123");
        // console.log("user_from_login", user);
        Router.push("/test");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleEmailChange = (e) => {
    setidentifier(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const createAccountLink = () => {
    Router.push("/auth/register");
  };

  const forgotPasswordLink = () => {
    Router.push("/auth/forgot-password");
  };

  return (
    <>
      <AuthHeader title="Welcome!" lead="" />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardHeader className="bg-transparent pb-5">
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location = API_URL + "/connect/google";
                    }}
                  >
                    <span className="btn-inner--icon mr-1">
                      <img
                        alt="..."
                        src={require("assets/img/icons/common/google.svg")}
                      />
                    </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or sign in with credentials</small>
                </div>
                <Form role="form">
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: identifier,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email"
                        type="email"
                        onChange={handleEmailChange}
                        // onFocus={() => setidentifier('email')}
                        // onBlur={() => setidentifier('email')}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: password,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        // onFocus={() => setpassword('password')}
                        // onBlur={() => setpassword('password')}
                      />
                    </InputGroup>
                  </FormGroup>
                  {error ? (
                    <p style={{ paddingBottom: "10px", color: "red" }}>
                      {error}
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button
                      onClick={onSubmit}
                      className="my-4"
                      color="info"
                      type="button"
                    >
                      Sign in
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                <small
                  className="text-light cursorpointr"
                  onClick={forgotPasswordLink}
                >
                  Forgot password?
                </small>
              </Col>
              <Col className="text-right" xs="6">
                <small
                  className="text-light cursorpointr"
                  onClick={createAccountLink}
                >
                  Create new account
                </small>
                {/* </a> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Login2.layout = Auth;

export default Login2;
