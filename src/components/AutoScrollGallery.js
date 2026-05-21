import React from "react";
import "../styles/AutoScrollGallery.css";
import gallery1 from "../assets/gallery1.jpg";
import gallery2 from "../assets/gallery2.jpg";
import gallery3 from "../assets/gallery3.jpg";
import gallery4 from "../assets/gallery4.jpg";
import gallery5 from "../assets/gallery5.jpg";
import gallery6 from "../assets/gallery6.jpg";
import gallery7 from "../assets/gallery7.jpg";
import gallery8 from "../assets/gallery8.jpg";

const images = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
  gallery7,
  gallery8,
];

const AutoScrollGallery = () => {
  // To create a seamless infinite loop, we duplicate the images
  // This prevents a sudden jump when the animation resets.
  const duplicatedImages = [...images, ...images];

  return (
    <div className="infinite-gallery-container">
      <div className="gallery-track">
        {duplicatedImages.map((src, idx) => (
          <div key={idx} className="gallery-slide">
            <img src={src} alt={`Gallery ${idx}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoScrollGallery;