import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import homeLogo1 from "../../Assets/Group 1533 (1).png";
import Analysis from "./Analysis";
import { useNavigate } from "react-router-dom";

function About(props) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState("");

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === "audio/wav") {
      setFile(uploadedFile);
      props.setFileName(uploadedFile.name);
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
    setResult(""); // Clear previous results

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://localhost:8000/api/detect/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      console.log(data);

      props.setDetectData(data);
      console.log(props.detectData);

      // Check for expected response structure
      if (data.result) {
        // setResult(`Detected as: ${data.result}${data.confidence ? ` (Confidence: ${data.confidence.toFixed(2)}%)` : ''} \nUser Guidance: ${data.ai_analysis}`);
        setResult(
          `Detected as: ${data.result}${
            data.confidence
              ? ` (Confidence: ${data.confidence.toFixed(2)}%)`
              : "Confidence currently not available for display."
          }`
        );
        setAiAnalysis(data.ai_analysis);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error during detection:", error);

      // Provide user-friendly error messages
      if (error.message.includes("Failed to fetch")) {
        setResult(
          "Unable to connect to the server. Please check your network connection."
        );
      } else if (error.message.includes("HTTP error")) {
        setResult(`Server error: ${error.message}`);
      } else {
        setResult("An unexpected error occurred during file detection.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const fileInputRef = React.createRef(); // Reference to the file input

  const handleCustomButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click event
  };

  const navigate = useNavigate();
  const handleSaveResults = () => {
    // navigate("/saveresults");
    navigate("/test");
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
            <h1
              style={{
                fontFamily: "Poppins",
                fontSize: "4rem",
                paddingTop: "50px",
              }}
            >
              <strong className="purple">Voice Detection</strong>
            </h1>

            <img
              src={homeLogo1}
              alt="homelogo1"
              className="detect-icon"
              style={{ width: "100%" }}
            />

            <Form>
              <Form.Group
                controlId="fileUpload"
                className="mb-3"
                style={{ position: "relative" }}
              >
                <Form.Label style={{ fontFamily: "Poppins", color: "#B7E9FF" }}>
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
                <h3 style={{ fontFamily: "Poppins", color: "#B7E9FF" }}>
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
                <h2 style={{ fontFamily: "Poppins", color: "#B7E9FF" }}>
                  <strong>{result}</strong>
                </h2>
                <Analysis aiAnalysis={aiAnalysis} />
                <Button
                  className="detect-button"
                  variant="primary"
                  onClick={handleSaveResults}
                >
                  Save Results
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
