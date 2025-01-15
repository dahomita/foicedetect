import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Spinner,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import homeLogo1 from "../../Assets/Group 1533 (1).png";
import Analysis from "./Analysis";
import { useNavigate } from "react-router-dom";
import Reply from "./Reply";

function About(props) {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessing2, setIsProcessing2] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [tmp, setTmp] = useState("");
  const [aiAnalysis, setAiAnalysis] = useState("");
  //const [isDetectClicked, setIsDetectedClicked] = useState(false);

  useEffect(() => {
    props.setReply("");
  }, []);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      alert("SpeechSynthesis API is not supported in this browser");
      return;
    }

    if (synth.speaking) {
      synth.cancel();
      return;
    }

    const utterThis = new SpeechSynthesisUtterance(text);

    utterThis.onend = function (e) {
      console.log("Has finished speaking.");
    };
    utterThis.onerror = function (e) {
      console.log("Has encountered an error while attempting speaking.");
    };

    synth.speak(utterThis);
  };

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
    //setIsDetectedClicked(false);

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

      console.log(data.speech_to_text);
      setTmp(data.speech_to_text);

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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click here if you're hesitant to answer the call
    </Tooltip>
  );

  const handleRespond = async () => {
    setIsProcessing2(true);
    props.setReply("Generating Reply..."); // Clear previous results

    try {
      const response = await fetch("http://localhost:8000/api/reply/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript: tmp }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorText}`
        );
      }

      const data = await response.json();
      props.setReply(data.reply);
    } catch (error) {
      console.error("Error during reply generation:", error);

      if (error.message.includes("Failed to fetch")) {
        props.setReply(
          "Unable to connect to the server. Please check your network connection."
        );
      } else if (error.message.includes("HTTP error")) {
        props.setReply(`Server error: ${error.message}`);
      } else {
        props.setReply(
          "An unexpected error occurred during response generation."
        );
      }
    } finally {
      setIsProcessing2(false);
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
              </div>
            )}

            {/* <div style = {{ margin: "30px", textAlign: "center"}}> */}
            {/* <OverlayTrigger placement = "top" overlay={renderTooltip}>   */}
            {result && (
              <Button className="response-button" onClick={handleRespond}>
                {isProcessing2 ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <>
                    {props.reply
                      ? "Generate Another Response?"
                      : "FAKE VOICE? Here's How To Respond"}
                  </>
                )}
              </Button>
            )}
            {props.reply != "" && !isProcessing2 && (
              <Button
                style={{ marginLeft: "3em" }}
                className="response-button"
                onClick={(e) => speak(props.reply)}
              >
                Read Aloud
              </Button>
            )}

            {props.reply != "" && !isProcessing2 && (
              <Reply reply={props.reply} />
            )}

            {result && (
              <Button
                className="response-button"
                variant="primary"
                onClick={handleSaveResults}
                style={{ marginTop: "2em", marginLeft: "1em" }}
              >
                Save Results
              </Button>
            )}

            {/* </OverlayTrigger> */}
            {/* </div> */}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default About;
