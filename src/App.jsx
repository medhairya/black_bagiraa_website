import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import "./App.css";
import SecretPage from "./components/SecretPage";
import ProductPage from "./components/ProductPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    const timer1 = setTimeout(() => {
      setShowLandingPage(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!showLandingPage) {
      return undefined;
    }

    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(refreshId);
  }, [showLandingPage]);

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
