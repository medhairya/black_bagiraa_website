import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import "./App.css";
import SecretPage from "./components/SecretPage";
import ProductPage from "./components/ProductPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";




function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {
    // Rotate logo for 2 seconds, then show mist for ~1.5s, then show landing page
    const timer1 = setTimeout(() => {
      setShowLandingPage(true);
    }, 2000);
    return () => clearTimeout(timer1);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              {!showLandingPage ? (
                <>
                  <div className="loading-screen">
                    <img
                      src="/logo.png"
                      alt="Bagiraa Logo"
                      className="rotating-logo"
                      style={{ width: 150, height: 150 }}
                    />
                  </div>
                </>
              ) : (
                <LandingPage />
              )}
            </div>
          }
        />
        <Route path="/Bagiraa-Manufacturing-Units" element={<SecretPage />} />
        <Route path="/products" element={<ProductPage />} />

      </Routes>
    </Router>
  );

}

export default App;
