import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Fakevoicedetect from "./components/Fakevoicedetect/Fakevoicedetect";
import VoiceStorage from "./components/VoiceStorage/VoiceStorage";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SaveResultsForm from "./components/SaveResults/SaveResultsForm";
import SignUp from "./components/Authentication/Signup";
import LogIn from "./components/Authentication/Login";
import AccountDeletion from "./components/Authentication/Delete";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Authentication/Profile";
import Test from "./components/SaveResults/Test";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";
import Logout from "./components/Authentication/Logout";
import DetectionDocuments from "./components/SaveResults/UserResultDocs";
import DocumentPage from "./components/SaveResults/DocumentPage";

function App() {
  const [load, upadateLoad] = useState(true);
  const [detectData, setDetectData] = useState({});
  const [fileName, setFileName] = useState("");
  const [reply, setReply] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(ACCESS_TOKEN) ? true : false
  );
  const [documents, setDocuments] = useState(null);
  const [curId, setCurId] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

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
        console.log(err.message);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <Router>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/voiceStorage" element={<VoiceStorage />} /> */}
          <Route
            path="/fakevoicedetect"
            element={
              <Fakevoicedetect
                detectData={detectData}
                setDetectData={setDetectData}
                fileName={fileName}
                setFileName={setFileName}
                reply={reply}
                setReply={setReply}
              />
            }
          />
          <Route
            path="/saveresults"
            element={
              <ProtectedRoute>
                <SaveResultsForm
                  detectData={detectData}
                  setDetectData={setDetectData}
                  fileName={fileName}
                  setFileName={setFileName}
                  reply={reply}
                  setReply={setReply}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/login"
            element={
              <LogIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          <Route
            path="/logout"
            element={
              <Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }
          />
          {/* <Route
            path="/delete"
            element={
              <ProtectedRoute>
                <AccountDeletion />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/test"
            element={
              <ProtectedRoute>
                <Test
                  detectData={detectData}
                  setDetectData={setDetectData}
                  fileName={fileName}
                  setFileName={setFileName}
                  reply={reply}
                  setReply={setReply}
                />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/documents"
            element={<DetectionDocuments curId={curId} setCurId={setCurId} />}
          />
          <Route
            path="documents/:id"
            element={<DocumentPage curId={curId} setCurId={setCurId} />}
          />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
