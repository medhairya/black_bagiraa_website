import React from "react";
import "../styles/CircularGallery.css"; // Ensure this file exists

const CircularGallery = ({ items }) => {
  return (
    <div className="circular-gallery-container">
      <div className="circular-gallery">
        {items.map((item, index) => (
          <div key={index} className="gallery-item">
            <img src={item.image} alt={item.text} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CircularGallery;
