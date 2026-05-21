import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "../styles/RotatingProducts.css";

import can from "../assets/can.png";
import energySimple from "../assets/energy-simple.png";
import energyWatermelon from "../assets/energy-watermelon.png";
import energyCoffee from "../assets/energy-coffee.png";
import jeera from "../assets/jeera.png";
import pineapple from "../assets/pineapple.png";
import orange from "../assets/orange.png";

const products = [
  { img: can, name: "Energy Can", bgColor: "#ff4500" },
  { img: energySimple, name: "Bagiraa Energy Drink", bgColor: "#ffcc00" },
  { img: energyWatermelon, name: "Watermelon Energy", bgColor: "#ff1493" },
  { img: energyCoffee, name: "Coffee Smoke", bgColor: "#8b4513" },
  { img: jeera, name: "Jeera Masala", bgColor: "#ff9900" },
  { img: pineapple, name: "Pineapple Masala", bgColor: "#f4a261" },
  { img: orange, name: "Orange Ginger", bgColor: "#ff6347" }, 
];

const RotatingProducts = () => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prevAngle) => prevAngle - (360 / products.length));
    }, 2000); // Rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rotating-products-container">
      <motion.div
        className="carousel"
        animate={{ rotateY: angle }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {products.map((product, index) => {
          const rotation = (360 / products.length) * index;
          return (
            <motion.div
              key={index}
              className="product-wrapper"
              style={{ transform: `rotateY(${rotation}deg) translateZ(350px)` }}
            >
              <img src={product.img} alt={product.name} className="product-image" />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default RotatingProducts;
