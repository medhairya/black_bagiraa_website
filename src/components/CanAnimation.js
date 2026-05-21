import React from "react";
import { motion } from "framer-motion";
import canImage from "../assets/can.jpg"; // Make sure your can image is in `src/assets/`

const CanAnimation = () => {
  return (
    <motion.div
      className="relative w-[120px] md:w-[180px] lg:w-[220px]"
      initial={{ rotateY: 0, y: 0, scale: 1 }}
      animate={{
        rotateY: [0, 15, 0, -15, 0], // Slight 3D-like rotation effect
        y: [0, -10, 0], // Subtle floating bounce effect
        scale: [1, 1.05, 1], // Slight pulsing to add depth
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    >
      {/* 🔥 Adding Lighting Effects */}
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black opacity-30 rounded-full" />

      {/* 🥤 Can Image */}
      <motion.img
        src={canImage}
        alt="Bagiraa Can"
        className="w-full drop-shadow-2xl"
        initial={{ scaleX: 1 }}
        animate={{
          scaleX: [1, 1.05, 1], // Slight horizontal scaling for 3D illusion
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* 🔄 Reflection Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent" />
    </motion.div>
  );
};

export default CanAnimation;
