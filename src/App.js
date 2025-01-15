import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/Fakevoicedetect/Fakevoicedetect";
import Projects from "./components/Projects/Projects";
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

function App() {
  const [load, upadateLoad] = useState(true);
  const [detectData, setDetectData] = useState({});
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route
            path="/fakevoicedetect"
            element={
              <About
                detectData={detectData}
                setDetectData={setDetectData}
                fileName={fileName}
                setFileName={setFileName}
              />
            }
          />
          <Route
            path="/saveresults"
            element={
              <SaveResultsForm
                detectData={detectData}
                setDetectData={setDetectData}
                fileName={fileName}
                setFileName={setFileName}
              />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
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
          <Route
            path="/test"
            element={
              <ProtectedRoute>
                <Test
                  detectData={detectData}
                  setDetectData={setDetectData}
                  fileName={fileName}
                  setFileName={setFileName}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
