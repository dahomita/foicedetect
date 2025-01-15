import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";

const SaveResultsForm = (props) => {
  return (
    <Container fluid className="foicedetect-section">
      <Particle />
      <Container><form action="" style={{color: "white"}}>
        <div>{props.detectData.confidence}</div>
        <div>a </div>
        <div>a </div>
        <div>a </div>
        <div>a </div>
        <div>a </div>
        <div>a </div>
      </form></Container>
    </Container>
  );
};

export default SaveResultsForm;
