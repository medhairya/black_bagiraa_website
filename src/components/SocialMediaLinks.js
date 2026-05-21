import React from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaInstagram, FaFacebookF } from "react-icons/fa";

const SocialMediaLinks = () => {
  return (
    <div className="relative z-10 flex flex-col items-center mt-12 mb-8">
      <div className="flex space-x-8 text-3xl md:text-4xl">
        <motion.a
          href="https://www.youtube.com/@Black_Bagiraa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          className="hover:text-red-500 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaYoutube className="social-icon drop-shadow-lg" />
        </motion.a>
        <motion.a
          href="https://www.instagram.com/blackbagiraa"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="hover:text-pink-400 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaInstagram className="social-icon drop-shadow-lg" />
        </motion.a>
        <motion.a
          href="https://facebook.com/blackbagiraaenergydrink"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="hover:text-blue-400 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaFacebookF className="social-icon drop-shadow-lg" />
        </motion.a>
      </div>
      <motion.div 
        className="mt-2 text-gray-400 text-xs md:text-sm tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Connect with us on social media
      </motion.div>
    </div>
  );
};

export default SocialMediaLinks; 