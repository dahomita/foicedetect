import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import homeLogo1 from "../../Assets/Group 1533 (1).png";
import homeLogo from "../../Assets/Image.png";

function About() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "audio/wav") {
      setFile(uploadedFile);
      setResult("");
      setUploadSuccess(true);
    } else {
      setUploadSuccess(false);
      setResult("Please upload a valid .wav file.");
    }
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

  const fileInputRef = React.createRef(); // Reference to the file input

  const handleCustomButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
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
            <h1 style={{ fontFamily: 'Poppins', fontSize: "4rem", paddingTop: "50px" }}>
              <strong className="purple">Voice Detection</strong>
            </h1>

            <img
              src={homeLogo1}
              alt="homelogo1"
              className="detect-icon"
              style={{ width: "100%" }}
            />

            <Form>
            <Form.Group controlId="fileUpload" className="mb-3" style={{ position: "relative" }}>
                <Form.Label style={{ fontFamily: 'Poppins', color: "#B7E9FF" }}>
                  Upload a Recording (e.g., .wav)
                </Form.Label>
                {/* Hidden file input */}
                <Form.Control
                  type="file"
                  accept="audio/wav"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{
                    display: "none", // Hide the default file input
                    position: "absolute", // Ensure it's positioned correctly
                    zIndex: -1, // Make sure it's below the button
                  }}
                />
                {/* Custom button to trigger file input */}
                <Button
                  variant="secondary"
                  onClick={handleCustomButtonClick}
                  style={{
                    marginLeft: "10px", 
                    position: "relative", // Ensure the button is above the file input
                    zIndex: 1, // Bring the button above the hidden input
                  }}
                >
                  Choose File
                </Button>
              </Form.Group>

            </Form>

            {uploadSuccess && !isProcessing && (
              <div className="mt-3">
                <h3 style={{ fontFamily: 'Poppins', color: "#B7E9FF" }}>
                  File uploaded successfully!
                </h3>
              </div>
            )}

            <Button
              className="detect-button"
              variant="primary"
              onClick={handleDetect}
              disabled={isProcessing || !file}
            >
              {isProcessing ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Detect"
              )}
            </Button>

            {result && (
              <div className="mt-3">
                <h2 style={{ fontFamily: 'Poppins', color: "#B7E9FF" }}>
                  Result: <strong>{result}</strong>
                </h2>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
