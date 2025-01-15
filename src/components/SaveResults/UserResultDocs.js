import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../../constant";
import "./UserResultDocs.css";
import { useNavigate } from "react-router-dom";
import Particle from "../Particle";

const DetectionDocuments = (props) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      const csrfToken = document.cookie
        .split(";")
        .find((cookie) => cookie.trim().startsWith("csrftoken="))
        ?.split("=")[1];

      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const response = await fetch(
          "http://127.0.0.1:8000/api/user_detection_documents/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "X-CSRFToken": csrfToken,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Failed to fetch documents");
        }

        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  if (loading)
    return (
      <div className="loading-screen">
        <p className="loading-text">Loading documents...</p>
      </div>
    );
  if (error)
    return (
      <div className="error-screen">
        <p className="error-text">Error: {error}</p>
      </div>
    );

  return (
    <div className="documents-container">
      <Particle />
      <h1 className="documents-title">Your Detection Documents</h1>
      <div className="documents-list">
        {documents.map((doc, id) => (
          <div
            key={id}
            className="document-card inset-shadow"
            onClick={(e) => {
              props.setCurId(id + 1);
              navigate(`/documents/${doc.id}`);
            }}
          >
            <div className="document-header">
              <h2 className="document-name">{doc.name}</h2>
              <span className="document-id">#{id + 1}</span>
            </div>
            <div className="document-details">
              <p>
                <span className="label">Confidence:</span>{" "}
                <div>{doc.confidence_score}</div>
              </p>
              <p>
                <span className="label">File Name:</span>{" "}
                <div>{doc.recording_name}</div>
              </p>
              <p>
                <span className="label">AI Analysis: </span>
                {doc.ai_analysis ? (
                  <>
                    <div
                      style={{
                        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.55)",
                        maxHeight: "15rem",
                      }}
                    >
                      <div
                        style={{
                          maxHeight: "15rem",
                          overflowY: "auto",
                          padding: "1rem",
                        }}
                      >
                        {doc.ai_analysis}
                      </div>
                    </div>
                  </>
                ) : (
                  <div>No analysis generated.</div>
                )}
              </p>
              <p>
                <span className="label">Reply:</span>
                {doc.reply ? (
                  <div
                    style={{
                      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.55)",
                      maxHeight: "15rem",
                    }}
                  >
                    <div
                      style={{
                        maxHeight: "15rem",
                        overflowY: "auto",
                        padding: "1rem",
                      }}
                    >
                      {doc.reply}
                    </div>
                  </div>
                ) : (
                  <div>No reply generated.</div>
                )}
              </p>
              <p>
                <span className="label">Created At:</span>{" "}
                <div>{new Date(doc.created_at).toLocaleString()}</div>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetectionDocuments;
