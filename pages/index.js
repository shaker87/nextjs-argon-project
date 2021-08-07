/*!

=========================================================
* NextJS Argon Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-argon-dashboard-pro
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import Link from "next/link";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter from "components/Footers/AuthFooter.js";

class Index extends React.Component {
  render() {
    return (
      <>
        <IndexNavbar />
        <div className="main-content">
          <IndexHeader />
          <section className="py-6 pb-9 bg-default">
            <Container fluid>
              <Row className="justify-content-center text-center">
                <Col md="6">
                  <h2 className="display-3 text-white">
                    A complete set of tools
                  </h2>
                  {/*
                  <p className="lead text-white">
                    Argon is a completly new product built on our newest
                    re-built from scratch framework structure that is meant to
                    make our products more intuitive, more adaptive and,
                    needless to say, so much easier to customize. Let Argon
                    amaze you with its cool features and build tools and get
                    your project to a whole new level.
                  </p>
                  */}
                </Col>
              </Row>
            </Container>
          </section>
          <section className="section section-lg pt-lg-0 mt--7 bg-default">
            <Container>
              <Row className="justify-content-center">
                <Col lg="12">
                  <Row>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape bg-gradient-info text-white rounded-circle mb-4">
                            <i className="ni ni-check-bold" />
                          </div>
                          <h4 className="h3 text-info text-uppercase">
                            Based on React, NextJS and Reactstrap
                          </h4>
                          <p className="description mt-3">
                            Argon is built on top of the most popular open
                            source toolkit for developing with HTML, CSS, and
                            JS.
                            <img
                              alt="..."
                              className="img-fluid"
                              src={require("assets/img/theme/landing-1.png")}
                            />
                          </p>
                          <div>
                            <Badge color="info" pill>
                              react
                            </Badge>
                            <Badge color="info" pill>
                              reactstrap
                            </Badge>
                            <Badge color="info" pill>
                              dashboard
                            </Badge>
                            <Badge color="info" pill>
                              template
                            </Badge>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape bg-gradient-success text-white rounded-circle mb-4">
                            <i className="ni ni-istanbul" />
                          </div>
                          <h4 className="h3 text-success text-uppercase">
                            Integrated build tools
                          </h4>
                          <p className="description mt-3">
                            Use Argons's included npm scripts to compile source
                            code, scss and more with just a few simple commands.
                          </p>
                          <img
                            alt="..."
                            className="img-fluid"
                            src={require("assets/img/theme/landing-2.png")}
                          />

                          <div>
                            <Badge color="success" pill>
                              npm
                            </Badge>
                            <Badge color="success" pill>
                              build tools
                            </Badge>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                    <Col lg="4">
                      <Card className="card-lift--hover shadow border-0">
                        <CardBody className="py-5">
                          <div className="icon icon-shape bg-gradient-warning text-white rounded-circle mb-4">
                            <i className="ni ni-planet" />
                          </div>
                          <h4 className="h3 text-warning text-uppercase">
                            Full Sass support
                          </h4>
                          <p className="description mt-3">
                            Argon makes customization easier than ever before.
                            You get all the tools to make your website building
                            process a breeze.
                          </p>
                          <img
                            alt="..."
                            className="img-fluid"
                            src={require("assets/img/theme/landing-3.png")}
                          />
                          <div>
                            <Badge color="warning" pill>
                              sass
                            </Badge>
                            <Badge color="warning" pill>
                              design
                            </Badge>
                            <Badge color="warning" pill>
                              customize
                            </Badge>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
        <AuthFooter />
      </>
    );
  }
}

export default Index;
