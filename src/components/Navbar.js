import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import { Link } from "react-router-dom";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);

  const navbarStyle = {
    fontFamily: "'Poppins', sans-serif",
  };

  const navLinkStyle = {
    fontFamily: "'Poppins', sans-serif",
    fontWeight: 400,
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
      style={navbarStyle} // Apply font to Navbar container
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/"
                onClick={() => updateExpanded(false)}
                style={navLinkStyle} // Apply font to Nav.Link
              >
                Home
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/fakevoicedetect"
                onClick={() => updateExpanded(false)}
                style={navLinkStyle}
              >
                FakeVoice Detect
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
                style={navLinkStyle}
              >
                Voice Storage
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="SignUpButton">
              <Nav.Link
                as={Link}
                to="/login"
                onClick={() => updateExpanded(false)}
                style={navLinkStyle}
              >
                Log In
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavBar;
