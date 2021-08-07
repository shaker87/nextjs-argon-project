import React from "react";
import { Redirect } from "react-router-dom";
import { useRouter } from "next/router";
import Router from "next/router";

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
// import { forgotPassword } from "../../api/auth";

function forgotPassword() {
  // const [focusedEmail, setfocusedEmail] = React.useState(false);
  // const [focusedPassword, setfocusedPassword] = React.useState(false);
  const [identifier, setidentifier] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [error, setError] = React.useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const onSubmit = async () => {
    // if (identifier.length < 1) {
    //   setError("Invalid Required");
    //   return;
    // }
    // if (password.length < 6) {
    //   setError("Password should be greater than 5 characters");
    //   return;
    // }

    // try {
    //   const user = await forgotPassword(identifier, password);

    //   if (user && !user.success) {
    //     setError("Identifier or password invalid");
    //   }
    //   if (user && user.jwt) {
    //     localStorage.setItem("jwt", user.jwt);
    //     Router.push("/admin/dashboard");
    //     console.log("test 444");
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  const handleEmailChange = (e) => {
    setidentifier(e.target.value);
  };

  

  const backtoLoginLink =()=>{
    Router.push("/auth/login");
  }

  return (
    <>
      <AuthHeader title="Forgot Password!" lead="" />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>Or forgot password with signin credentials</small>
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
                  
                  {error ? (
                    <p style={{ paddingBottom: "10px", color: "red" }}>
                      {error}
                    </p>
                  ) : (
                    ""
                  )}
                  
                  <div className="text-center">
                    <Button
                      onClick={onSubmit}
                      className="my-4"
                      color="info"
                      type="button"
                    >
                      Submit
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs="6">
                
                  <small className="text-light cursorpointr"
                  onClick={backtoLoginLink}>Back to Sign in?</small>
                
              </Col>
              
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

forgotPassword.layout = Auth;

export default forgotPassword;
