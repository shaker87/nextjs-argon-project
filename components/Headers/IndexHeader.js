import React from "react";
import Link from "next/link";
// reactstrap components
import { Button, Card, CardBody, Container, Row, Col } from "reactstrap";

function IndexHeader() {
  return (
    <>
      <div className="header bg-info pt-5 pb-7">
        <Container>
          <div className="header-body">
            <Row className="align-items-center">
              <Col lg="6">
                <div className="pr-5">
                  <h1 className="display-2 text-white font-weight-bold mb-0">
                    Engage stakeholders, explore ideas, make better decisions.
                  </h1>
                  <h2 className="display-4 text-white font-weight-light">
                    Our tools are designed to help individuals and groups think
                    better!
                  </h2>
                  <div className="mt-5">
                    <Link href="/auth/login">
                      <Button className="btn-neutral my-2" color="default">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button className="btn-neutral my-2" color="default">
                        Create an Account
                      </Button>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default IndexHeader;
