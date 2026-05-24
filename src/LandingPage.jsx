import React, { useState } from "react";
import AutoScrollGallery from "./components/AutoScrollGallery";
import MissionVisionHistory from "./components/MissionVisionHistory";
import SocialMediaLinks from "./components/SocialMediaLinks";
import "./styles/StatsSection.css";
import AnimatedCounter from "./AnimatedCounter";
import ComingSoon from "./components/ComingSoon";
import UpcomingProducts from "./UpcomingProducts";
import ProductExperience from "./components/product-experience/ProductExperience";
import RotatingProducts from "./components/RotatingProducts";

const StatsSection = () => {
  return (
    <section className="bg-gray-900 py-16 text-center text-white">
      <h2 className="mb-10 text-4xl font-bold uppercase tracking-[0.14em]">
        Our Reach
      </h2>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
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


const LandingPage = () => {
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white">
      <ProductExperience />

      <div className="border-y border-white/6 bg-gradient-to-b from-[#090909] to-black px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <UpcomingProducts />
                  <YouTubeEmbed videoId="9qIFNp-4b28" /> 
                  <div className="container mx-auto px-4 py-16">
        {/* <RotatingProducts /> */}
      </div>  
    </div>

        <StatsSection />
        <AutoScrollGallery />



        <MissionVisionHistory />


        
        <SocialMediaLinks />


        <footer
          id="contact-section"
          className="mt-16 bg-gray-900 py-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <a href="tel:+919106493347" className="mt-2 block text-orange-400">
            Call Us
          </a>
          <a
            href="mailto:info@blackbagiraa.com"
            className="mt-2 block text-orange-400"
          >
            Email Us
          </a>
          <p className="mt-2 text-gray-400">
            Vrundavan Solutions, Vadodara, Gujarat, India
          </p>
          <p className="mt-4 text-gray-500">
            Copyright 2025 Black Bagiraa Energy Drink. All rights reserved.
          </p>
        </footer>
      </div>

      <ComingSoon
        isOpen={isComingSoonOpen}
        onClose={() => setIsComingSoonOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
