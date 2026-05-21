import React from "react";
import ReactDOM from "react-dom/client";
import { ParallaxProvider } from "react-scroll-parallax"; // Import ParallaxProvider
import App from "./App";
import './index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ParallaxProvider> {/* Wrap your App */}
      <App />
    </ParallaxProvider>
  </React.StrictMode>
);
