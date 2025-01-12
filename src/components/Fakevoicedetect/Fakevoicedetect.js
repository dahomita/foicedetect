import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import homeLogo1 from "../../Assets/Group 1533 (1).png";
import homeLogo from "../../Assets/Image.png";



function About() {
  const [file, setFile] = useState(null); 
  const [result, setResult] = useState(""); 
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setResult("");
  };

  const handleDetect = async () => {
    if (!file) {
      alert("Please upload a file before detection.");
      return;
    }

    setIsProcessing(true); 
    try {

      const formData = new FormData();
      formData.append("file", file);


      const response = await fetch("", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.result); 
    } catch (error) {
      console.error("Error during detection:", error);
      setResult("An error occurred while detecting the file.");
    } finally {
      setIsProcessing(false); 
    }
  };

  return (
    <Container fluid className="foicedetect-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            
            <h1 style={{ fontFamily: 'Poppins',fontSize: "4rem", paddingTop: "50px" }}>
               <strong className="purple">Voice Detection</strong>
            </h1>
            

            <img 
              src = {homeLogo1}
              alt = "homelogo1"
              className = "detect-icon"
              style={{ width: "100%"}}
            />

            <Form>
              <Form.Group controlId="fileUpload" className="mb-3">
                <Form.Label style = {{fontFamily: 'Poppins', color: "#B7E9FF"}}>Upload a Recording (e.g., .mp3, .wav)</Form.Label>
                <Form.Control type="file" accept="audio/*" onChange={handleFileChange} />
              </Form.Group>
            </Form>

            <Button className = "detect-button" variant="primary" onClick={handleDetect} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Detect"}
            </Button>
            {result && (
              <div className="mt-3">
                <h2 style = {{fontFamily: 'Poppins', color: "#B7E9FF"}}>Result: <strong>{result}</strong></h2>
              </div>
            )}

          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
