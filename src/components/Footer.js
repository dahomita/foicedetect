import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col className="footer-creator">
          <div>Giang Ho - Khang Dang</div>
          <div>Tam Dang - Khanh Dang</div>
        </Col>
        <Col className="footer-copywright">
          <div>Copyright © {year} FoiceDetect</div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
