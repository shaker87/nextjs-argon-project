
import React from "react";
import Link from "next/link";
// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
} from "reactstrap";

function AdminNavbar() {
  return (
    <>
      <Navbar
        className="navbar-horizontal navbar-main navbar-dark navbar-transparent"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <Link href="/">
            <span>
              <NavbarBrand href="#">
                <img
                  alt="..."
                  src={require("assets/img/brand/Logo-White-Text-300h.svg")}
                />
              </NavbarBrand>
            </span>
          </Link>
          <button
            aria-controls="navbar-collapse"
            aria-expanded={false}
            aria-label="Toggle navigation"
            className="navbar-toggler"
            data-target="#navbar-collapse"
            data-toggle="collapse"
            id="navbar-collapse"
            type="button"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <UncontrolledCollapse
            className="navbar-custom-collapse"
            navbar
            toggler="#navbar-collapse"
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link href="/admin/dashboard">
                    <img alt="..." src={require("assets/img/brand/blue.png")} />
                  </Link>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button
                    aria-controls="navbar-collapse"
                    aria-expanded={false}
                    aria-label="Toggle navigation"
                    className="navbar-toggler"
                    data-target="#navbar-collapse"
                    data-toggle="collapse"
                    id="navbar-collapse"
                    type="button"
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link href="/admin/dashboard">
                  <NavLink href="#">
                    <span className="nav-link-inner--text">Dashboard</span>
                  </NavLink>
                </Link>
              </NavItem>
              {/*
            <NavItem>
              <Link href="/auth/pricing">
                <NavLink href="#">
                  <span className="nav-link-inner--text">Pricing</span>
                </NavLink>
              </Link>
            </NavItem>
            */}
              <NavItem>
                <Link href="/api/auth/signin">
                  <NavLink href="#">
                    <span className="nav-link-inner--text">Login</span>
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/auth/register">
                  <NavLink href="#">
                    <span className="nav-link-inner--text">Register</span>
                  </NavLink>
                </Link>
              </NavItem>
              {/*
            <NavItem>
              <Link href="/auth/lock">
                <NavLink href="#">
                  <span className="nav-link-inner--text">Lock</span>
                </NavLink>
              </Link>
            </NavItem>
            */}
            </Nav>
            <hr className="d-lg-none" />
            {/*
          <Nav className="align-items-lg-center ml-lg-auto" navbar>
            <NavItem>
              <NavLink
                className="nav-link-icon"
                href="https://www.facebook.com/creativetim?ref=creative-tim"
                id="tooltip601201423"
                target="_blank"
              >
                <i className="fab fa-facebook-square" />
                <span className="nav-link-inner--text d-lg-none">
                  Facebook
                </span>
              </NavLink>
              <UncontrolledTooltip delay={0} target="tooltip601201423">
                Like us on Facebook
              </UncontrolledTooltip>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link-icon"
                href="https://twitter.com/creativetim?ref=creative-tim"
                id="tooltip366258619"
                target="_blank"
              >
                <i className="fab fa-twitter-square" />
                <span className="nav-link-inner--text d-lg-none">
                  Twitter
                </span>
              </NavLink>
              <UncontrolledTooltip delay={0} target="tooltip366258619">
                Follow us on Twitter
              </UncontrolledTooltip>
            </NavItem>
          </Nav>
          */}
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;
