import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/Image (1).png";
import homeLogo1 from "../../Assets/Image-1.png";
import Particle from "../Particle";
import Type from "./Type";

function Home() {
  return (
    <section style={{ margin: 0, padding: 0 }}>
      <Container fluid className="home-section" id="home" style={{ padding: 0 }}>
        <Particle />
        <Container className="home-content" style={{ padding: 0 }}>
          <Row style={{ margin: 0 }}>
            <Col md={7} className="home-header" style={{ padding: 0 }}>
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

            <Col md={5} style={{ paddingBottom: 20, padding: 0 }} className="logo-container">
              <img
                src={homeLogo}
                alt="home pic"
                className="homeLogo"
                style={{ maxHeight: "450px", marginBottom: "-10px" }} // Adjust margin to bring logos closer
              />
              <img
                src={homeLogo1}
                alt="home pic"
                className="homeLogo1"
                style={{ maxHeight: "500px", marginTop: "-10px" }} // Adjust margin to bring logos closer
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
