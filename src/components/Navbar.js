import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constant";
// import { ACCESS_TOKEN } from "../constant";

function NavBar(props) {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await api.get("/api/user/profile/");
        setUser(res.data);
        setUsername(res.data.username);
      } catch (error) {
        setError("Failed to fetch user profile.");
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (username) {
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem("username");
      navigate("/login");
    }
  }, [user]);

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
                to="/documents"
                onClick={() => updateExpanded(false)}
                style={navLinkStyle}
              >
                Storage
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="SignUpButton">
              <Nav.Link
                as={Link}
                to={props.isLoggedIn ? "/profile" : "/login"}
                onClick={() => updateExpanded(false)}
                style={navLinkStyle}
              >
                {props.isLoggedIn
                  ? `Hello, ${localStorage.getItem("username")}`
                  : "Log In"}
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
