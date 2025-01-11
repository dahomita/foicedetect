import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/Image (1).png";
import homeLogo1 from "../../Assets/Image-1.png";
import Particle from "../Particle";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                "Unmask The Truth in Voices"{" "}
              </h1>

              <h1 className="heading-name">
                Empowered by advanced AI technology, <strong className="main-name"> FOICE DETECT</strong> helps you identify synthetic or altered voices in real time.
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }} className="logo-container">
              <img
                src={homeLogo}
                alt="home pic"
                className="homeLogo"
              />
              <img
                src={homeLogo1}
                alt="home pic"
                className="homeLogo1"
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
