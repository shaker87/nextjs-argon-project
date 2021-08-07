import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
import Router from "next/router";
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
import { loginUser } from "../../api/auth";

class Login extends React.Component {
  state = {
    identifier: "",
    password: "",
    error: "",
    loading: false,
  };

  onSubmit = async () => {
    const { identifier, password, error } = this.state;
    if (identifier.length < 1) {
      this.setState({ error: "Invalid Required" });
      return;
    }
    if (password.length < 6) {
      this.setState({
        ...this.state,
        error: "Password should be greater than 5 characters",
      });
      return;
    }

    try {
      this.setState({ ...this.state, loading: true, error: "" });
      const user = await loginUser(identifier, password);

      if (user && !user.success) {
        this.setState({
          ...this.state,
          error: "Identifier or password invalid",
          loading: false,
        });
      }
      if (user && user.jwt) {
        this.setState({ ...this.state, loading: false });
        localStorage.setItem("jwt", user.jwt);
        Router.push("/welcome");
      }
    } catch (e) {}
  };

  render() {
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
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location =
                          "https://api.prismvu.com/connect/google";
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
                    <small>Sign in with credentials</small>
                  </div>
                  <Form role="form">
                    <FormGroup
                      className={classnames("mb-3", {
                        focused: this.state.focusedEmail,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-at-sign-2" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email"
                          type="email"
                          onChange={(e) =>
                            this.setState({
                              ...this.state,
                              identifier: e.target.value,
                            })
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
                            <i className="ni ni-password" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          onChange={(e) =>
                            this.setState({
                              ...this.state,
                              password: e.target.value,
                            })
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
                    {/* <div className="custom-control custom-control-alternative custom-checkbox">
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
                    </div> */}
                    {this.state.error ? (
                      <p style={{ paddingBottom: "10px", color: "red" }}>
                        {this.state.error}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="text-center">
                      <Button
                        onClick={this.onSubmit}
                        className="my-4"
                        color="info"
                        type="button"
                      >
                        {this.state.loading ? "Signing in..." : "Sign in"}
                      </Button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
              <Row className="mt-3">
                <Col xs="6">
                  <a
                    className="text-light"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <small>Forgot password?</small>
                  </a>
                </Col>
                <Col className="text-right" xs="6">
                  <a
                    className="text-light"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    <small>Create new account</small>
                  </a>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Login.layout = Auth;

export default Login;
