import React from "react";
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
import Router from "next/router";
// layout for this page
import Auth from "layouts/Auth.js";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import { registerUser } from "../../api/auth";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: "",
    loading: false,
  };

  submitForm = async () => {
    const { username, email, password, error } = this.state;
    this.setState({ ...this.state, error: "" });
    if (username.length < 2) {
      this.setState({ error: "Username should be greter than 2 char" });
      return;
    }
    const rEForValidatingEmail = /\S+@\S+\.\S+/;
    const isEmail = rEForValidatingEmail.test(email);
    if (!isEmail) {
      this.setState({ ...this.state, error: "Email is invalid" });
      return;
    }
    if (password.length < 6) {
      this.setState({
        ...this.state,
        error: "Password length should be greater than 5",
      });
      return;
    }
    this.setState({ ...this.state, loading: true });
    const user = await registerUser(username, email, password);

    if (user && !user.success) {
      this.setState({ ...this.state, loading: false });
      this.setState({ ...this.state, error: "User already exists" });
      return;
    }

    if (user && user.jwt) {
      this.setState({ ...this.state, loading: false });
      localStorage.setItem("jwt", user.jwt);
      Router.push("/surveys/surveys");
    }
  };
  render() {
    return (
      <>
        <AuthHeader
          title="Create an account"
          lead=""
        />
        <Container className="mt--8 pb-5">
          <Row className="justify-content-center">
            <Col lg="6" md="8">
              <Card className="bg-secondary border-0">
                <CardBody className="px-lg-5 py-lg-5">
                  <div className="text-center text-muted mb-4">
                    <small>Or sign up with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedName,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Name"
                          type="text"
                          onChange={(e) =>
                            this.setState({ username: e.target.value })
                          }
                          onFocus={() => this.setState({ focusedName: true })}
                          onBlur={() => this.setState({ focusedName: false })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedEmail,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          onChange={(e) =>
                            this.setState({ email: e.target.value })
                          }
                          onFocus={() => this.setState({ focusedEmail: true })}
                          onBlur={() => this.setState({ focusedEmail: false })}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup
                      className={classnames({
                        focused: this.state.focusedPassword,
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
                          onChange={(e) =>
                            this.setState({ password: e.target.value })
                          }
                          onFocus={() =>
                            this.setState({ focusedPassword: true })
                          }
                          onBlur={() =>
                            this.setState({ focusedPassword: false })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                    {/* <div className="text-muted font-italic">
                      <small>
                        password strength:{" "}
                        <span className="text-success font-weight-700">
                          strong
                        </span>
                      </small>
                    </div> */}
                    {/* <Row className="my-4">
                      <Col xs="12">
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="customCheckRegister"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheckRegister"
                          >
                            <span className="text-muted">
                              I agree with the{" "}
                              <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                              >
                                Privacy Policy
                              </a>
                            </span>
                          </label>
                        </div>
                      </Col>
                    </Row> */}
                    {this.state.error ? (
                      <p style={{ paddingBottom: "10px", color: "red" }}>
                        {this.state.error}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="text-center">
                      <Button
                        onClick={this.submitForm}
                        disabled={this.state.loading}
                        className="mt-4"
                        color="info"
                        type="button"
                      >
                        {this.state.loading
                          ? "Creating Account..."
                          : "Create account"}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Register.layout = Auth;

export default Register;
