import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import logo from "./assets/logo.png"; 
import "./styles/CircularGallery.css";
import AutoScrollGallery from "./components/AutoScrollGallery";
// import ProductShowcase from "./components/ProductShowcase";
import RotatingProducts from "./components/RotatingProducts";
import MissionVisionHistory from "./components/MissionVisionHistory";
import SocialMediaLinks from "./components/SocialMediaLinks";
import "./styles/StatsSection.css";
import AnimatedCounter from "./AnimatedCounter";
import { FaShoppingCart } from "react-icons/fa";
import ComingSoon from "./components/ComingSoon";
import UpcomingProducts from "./UpcomingProducts";


const StatsSection = () => {
  return (
    <section className="py-16 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-bold mb-10">Our Reach</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        <AnimatedCounter value={4} label="Number of States" />
        <AnimatedCounter value={65} label="Number of Cities" /> 
        <AnimatedCounter value={42} label="Number of Districts/Talukas" />
        <AnimatedCounter value={48000} label="Number of Reached Shops" />
      </div>
    </section>
  );
};







// YouTube Video Embed Component
const YouTubeEmbed = ({ videoId }) => {
  return (
    <div className="relative w-full flex justify-center my-8">
      {/* Embedded YouTube Video */}
      <iframe
        width="100%"
        height="400px"  // Reduced height
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&controls=0&iv_load_policy=3`}
        title="Bagiraa Energy Drink"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full max-w-screen-xl h-[400px] md:h-[450px] rounded-lg overflow-hidden shadow-lg"
      ></iframe>
    </div>
  );
};







// Animate on Scroll
const ScrollSection = ({ children }) => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="w-full text-center py-20"
    >
      {children}
    </motion.div>
  );
}

const LandingPage = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Energy Particle Effect - DO NOT CHANGE */}
      <Particles
        id="tsparticles"
        init={async (engine) => await loadSlim(engine)}
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 400 },
            color: { value: "#ffcc00" },
            opacity: { value: 0.7, random: true },
            size: { value: 3, random: true },
            move: { enable: true, speed: 1, direction: "top" },
          },
        }}
        className="absolute inset-0 w-full h-full z-0"
      />

      {/* Animated Background Blurs */}
      <motion.div
        className="absolute w-[600px] h-[600px] bg-orange-500 rounded-full opacity-30 blur-[120px] top-1/3 left-1/4"
        initial={{ scale: 0, opacity: 0.8 }} // 🔥 Strong glow at the start
        animate={{ scale: 2, opacity: 0.1 }} // 🌙 Fades to very low glow
        transition={{ duration: 6, ease: "easeOut" }} // Smooth fade-out
      />

      <motion.div
        className="absolute w-[500px] h-[500px] bg-yellow-500 rounded-full opacity-30 blur-[120px] bottom-1/4 right-1/3"
        initial={{ scale: 0, opacity: 0.8 }} // 🔥 Strong glow at the start
        animate={{ scale: 2, opacity: 0.05 }} // 🌙 Almost completely fades out
        transition={{ duration: 6, ease: "easeOut", delay: 1 }} // Slight delay for variation
      />


      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-screen text-center flex space-x-4">
        {/* Logo */}
        <motion.img
          src={logo}
          alt="Bagiraa Logo"
          className="w-56 h-56 md:w-72 md:h-72 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: [1, 1.1, 1] }}
        />
        
        <motion.h1 className="text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          Black Bagiraa
        </motion.h1>

        <motion.p className="text-lg text-gray-400 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}>
          THE KING OF ENERGY!
        </motion.p>

        <div className="flex flex-wrap justify-center gap-x-4 mt-4">
        <motion.a
          href="https://forms.gle/3BMEc8GTefdTsh9f6"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-orange-600 px-6 py-3 text-lg rounded-full hover:bg-orange-700 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Enquire Now
        </motion.a>

        <motion.button
          className="bg-gray-700 px-6 py-3 text-lg rounded-full hover:bg-gray-800 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" });
          }}
        >
          Contact Us
        </motion.button>
        
        <a href={`https://blackbagiraa.vercel.app`}>
          <motion.button
          className="bg-orange-600 px-6 py-3 text-lg rounded-full hover:bg-white-700 transition flex items-center space-x-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          // onClick={() => setIsComingSoonOpen(true)}
          >
          <FaShoppingCart />
          <span>Shop Now</span>
          </motion.button>
        </a>
      </div>


        {/* Scroll Down Indicator (NEW) */}
        <motion.div
          className="mt-8 text-gray-400 text-sm flex flex-col items-center"
          animate={{ y: [0, 10, 0], opacity: [1, 1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <p>Scroll for More Details</p>
          <div className="w-6 h-6 border-b-2 border-r-2 border-gray-400 rotate-45 mt-1"></div>
        </motion.div>
      </div>
      {/* CSS-Based Liquid Wave Effect */}
      <motion.div 
        className="absolute w-64 h-64 bg-orange-500 rounded-full opacity-50 blur-3xl -top-10 left-1/2 transform -translate-x-1/2"
        initial={{ scale: 0.8, opacity: 0.7 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />
      {/* 🛒 Product Showcase */}
      <div className="container mx-auto px-4 py-16">

      {/* Upcoming Beverages Banner */}
      <UpcomingProducts />

      {/* 🔴 New YouTube Video Embed */}
      <YouTubeEmbed videoId="9qIFNp-4b28" /> 


      <RotatingProducts />

      </div>

      {/* Scroll Sections */}
      <ScrollSection>
        <h2 className="text-4xl font-bold">⚡ Unleash the Beast Within</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-2">
        Fuel your power with Black Bagiraa’s bold blend of caffeine and vitamins for unstoppable energy.
        </p>
      </ScrollSection>

      <ScrollSection>
        <h2 className="text-4xl font-bold">🔥Taste That Powers You</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-2">
        Experience a strong, refreshing flavors that fuels both body and mind—no compromises, just high performance.
        </p>
      </ScrollSection>

      <ScrollSection>
        <h2 className="text-4xl font-bold">💧Hydration Meets Focus</h2>
        <p className="text-gray-400 max-w-2xl mx-auto mt-2">
        Infused with electrolytes to keep your body charged and your mind sharp, every step of the way.
        </p>
      </ScrollSection>
      

      <StatsSection />

      <AutoScrollGallery />


      
{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


      {/* <ProductShowcase /> */}


{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}


      {/* Mission, Vision, and History Section */}
      <MissionVisionHistory />

      {/* Social Media Links */}
      <SocialMediaLinks />

      {/* Footer Section */}
      <footer id="contact-section" className="bg-gray-900 text-white py-8 mt-16 text-center">
        <h2 className="text-2xl font-bold">Contact Us</h2>

        {/* Clickable Phone Number */}
        <a href="tel:+919106493347" className="block text-orange-400 mt-2">📞 Call Us</a>

        {/* Clickable Email */}
        <a href="mailto:info@blackbagiraa.com" className="block text-orange-400 mt-2">📧 Email Us</a>


        {/* Address (Optional) */}
        <p className="mt-2 text-gray-400">Vrundavan Solutions, Vadodara, Gujarat, India</p>

        <p className="mt-4 text-gray-500">© 2025 Black Bagiraa Energy Drink. All rights reserved.</p>
      </footer>

      {/* Coming Soon Modal */}
      <ComingSoon 
        isOpen={isComingSoonOpen} 
        onClose={() => setIsComingSoonOpen(false)} 
      />

    </div>
  );
};

export default LandingPage;
