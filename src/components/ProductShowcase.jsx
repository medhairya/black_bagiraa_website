import React, { useState, Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Product3DModel from "./Product3DModel";
import "./ProductShowcase.css";

import can from "../assets/can.png";
import classicBottle from "../assets/energy-simple.png";
import coffee from "../assets/energy-coffee.png";
import watermelon from "../assets/energy-watermelon.png";
import jeera from "../assets/jeera.png";
import pineapple from "../assets/pineapple.png";
import orange from "../assets/orange.png";

import pineapple_bg from '../assets/pineapple-bg.png';
import orange_bg from '../assets/orange-bg.png';
import testBg from "../assets/test-bg.png";

// Preload all 7 GLB models upfront to prevent any loading flickers/delays during scroll transitions
useGLTF.preload("/models/can/can.glb");
useGLTF.preload("/models/classic-energy/black bagira Rs20 .glb");
useGLTF.preload("/models/coffee/coffee.glb");
useGLTF.preload("/models/watermelon/watermalon.glb");
useGLTF.preload("/models/jeera/jeera.glb");
useGLTF.preload("/models/pineapple/painapple.glb");
useGLTF.preload("/models/orange/Orange.glb");

// Flavour config with harmonious background colors
const flavours = [
  {
    name: "Classic Can",
    bg: testBg,
    can: can,
    color: "#800e0e",
    model3D: "/models/can/can.glb",
    tagline: "Uncompromising raw energy drive.",
    description: "Our signature original formula engineered for high mental acuity, muscle recovery, and maximum cellular energy. Fuel your grind.",
  },
  {
    name: "Classic Bottle",
    bg: "/images/bg2.jpg",
    can: classicBottle,
    color: "#0e6e32",
    model3D: "/models/classic-energy/black bagira Rs20 .glb",
    tagline: "Instant energy in every drop.",
    description: "Crafted for enduring endurance. A powerful, crash-free formula that locks in hydration and provides a clean focus kick.",
  },
  {
    name: "Coffee Energy",
    bg: "/images/bg3.jpg",
    can: coffee,
    color: "#3d220f",
    model3D: "/models/coffee/coffee.glb",
    tagline: "Bold coffee. Unstoppable energy.",
    description: "Premium coffee bean formulation combined with raw energy active ingredients. Start your morning with absolute domination.",
  },
  {
    name: "Watermelon",
    bg: "/images/bg4.jpg",
    can: watermelon,
    color: "#7a112f",
    model3D: "/models/watermelon/watermalon.glb",
    tagline: "Juicy hydration, wild focus.",
    description: "Supercharged with hydration-locking electrolytes and a juicy, crisp taste that revitalizes body and mind instantly.",
  },
  {
    name: "Jeera Punch",
    bg: "/images/bg5.jpg",
    can: jeera,
    color: "#523c0b",
    model3D: "/models/jeera/jeera.glb",
    tagline: "Spiced legacy, raw energy.",
    description: "India's traditional spiced legacy, fused with pure caffeine and essential B-vitamins for the ultimate local refreshment.",
  },
  {
    name: "Pineapple",
    bg: pineapple_bg,
    can: pineapple,
    color: "#6b5907",
    model3D: "/models/pineapple/painapple.glb",
    tagline: "Tropical fuel, total focus.",
    description: "Fresh, tropical, sweet pineapple notes combined with our premium stamina-rebuilding complex. Power your passion.",
  },
  {
    name: "Orange Energy",
    bg: orange_bg,
    can: orange,
    color: "#803c05",
    model3D: "/models/orange/Orange.glb",
    tagline: "Citrus surge, zero crash.",
    description: "A zesty citrus explosion packed with antioxidants and raw performance fuel to power through physical and mental barriers.",
  },
];

// Helper to split text into animated characters
const SplitText = ({ text, className }) => {
  return (
    <h2 className={className}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="char inline-block"
          style={{ transformOrigin: "bottom center" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h2>
  );
};

const ProductShowcase = () => {
  const containerRef = useRef(null);
  const spinGroupRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Track active index in a mutable ref to safely determine scroll direction inside callbacks
    activeIndexRef.current = activeIndex;

    const ctx = gsap.context(() => {
      // Set up ScrollTrigger for each vertical full-screen section
      flavours.forEach((flavour, idx) => {
        ScrollTrigger.create({
          trigger: `.flavour-section-${idx}`,
          start: "top 50%", // Activates when the spacer section crosses the center of the viewport
          end: "bottom 50%",
          onToggle: (self) => {
            if (self.isActive && activeIndexRef.current !== idx) {
              const direction = idx > activeIndexRef.current ? 1 : -1;
              activeIndexRef.current = idx;
              setActiveIndex(idx);

              // 1. Morph background color smoothly
              gsap.to(container, {
                backgroundColor: flavour.color,
                duration: 1.0,
                ease: "power2.out",
              });

              // 2. Spin the 3D bottle horizontally! (MANA style carousel swipe)
              if (spinGroupRef.current) {
                // Spin from offset back to 0 to simulate a smooth rotation swap
                gsap.fromTo(spinGroupRef.current.rotation,
                  { y: Math.PI * 0.8 * direction },
                  { y: 0, duration: 1.2, ease: "back.out(1.2)" }
                );
              }

              // 3. Giant Background Text Drop-in Animation
              const chars = document.querySelectorAll(`.bg-text-${idx} .char`);
              if (chars.length) {
                gsap.fromTo(chars,
                  { opacity: 0, y: 100, rotateX: -90, scale: 0.8 },
                  { 
                    opacity: 0.15, // Subtle watermark opacity
                    y: 0, 
                    rotateX: 0, 
                    scale: 1, 
                    duration: 0.8, 
                    stagger: 0.03, 
                    ease: "back.out(1.5)" 
                  }
                );
              }

              // 4. Bottom UI Panel bounce
              gsap.fromTo(".bottom-ui-panel",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.5)" }
              );
            }
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [activeIndex]); // Re-bind triggers if needed, though state is mostly managed via refs

  // Arrow navigation bridges to the vertical scroll points
  const scrollToSection = (idx) => {
    const target = document.querySelector(`.flavour-section-${idx}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nextSlide = () => {
    const nextIdx = (activeIndex + 1) % flavours.length;
    scrollToSection(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (activeIndex - 1 + flavours.length) % flavours.length;
    scrollToSection(prevIdx);
  };

  return (
    <section
      ref={containerRef}
      className="relative h-[700vh] w-full text-white bg-[#800e0e] overflow-hidden select-none"
    >
      {/* 1. Sticky Viewport Wrapper */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        
        {/* Giant Background Text (MANA style watermark) */}
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none overflow-hidden mix-blend-overlay">
          {flavours.map((flavour, idx) => (
            <div key={idx} className={`absolute w-full text-center transition-opacity duration-700 ${activeIndex === idx ? "opacity-100" : "opacity-0"}`}>
               <SplitText text={flavour.name} className={`bg-text-${idx} text-[18vw] font-black uppercase text-white leading-none whitespace-nowrap opacity-15`} />
            </div>
          ))}
        </div>

        {/* 2. 3D WebGL Canvas Layer - Perfectly Centered */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-none md:pointer-events-auto">
          <Canvas
            camera={{ position: [0, 0, 5.0], fov: 35 }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
          >
            <Suspense fallback={null}>
              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-0.1, 0.1]}
                azimuth={[-0.5, 0.5]}
                config={{ mass: 3, tension: 600 }}
                snap={{ mass: 5, tension: 600 }}
                zoom={1.0}
                pan={false}
              >
                {/* 
                  Massive scale applied here to make the bottle take up the entire vertical space! 
                  Position adjusted slightly down to center visually with the bottom UI.
                */}
                <group ref={spinGroupRef} scale={3.0} position={[0, -0.3, 0]}>
                  {/* Centered 3D Model Display */}
                  <Product3DModel 
                    modelPath={flavours[activeIndex].model3D} 
                    isActive={true}
                    animationSpeed={2.0}
                  />
                </group>
              </PresentationControls>

              {/* High-End Studio Lighting System */}
              <Environment preset="sunset" />
              <ambientLight intensity={1.2} />
              <directionalLight position={[10, 10, 10]} intensity={3} color="#ffffff" />
              <directionalLight position={[-10, 10, 5]} intensity={2.0} color="#f0f8ff" />
              <spotLight position={[0, 10, 10]} intensity={2.5} angle={0.4} penumbra={0.5} />
            </Suspense>
          </Canvas>
        </div>

        {/* 3. Minimalist Info Panel (Bottom Left) */}
        <div className="absolute bottom-12 left-10 z-20 max-w-xs hidden xl:block transition-all duration-500">
           <p className="text-yellow-400 font-bold tracking-widest uppercase mb-2 text-sm">{flavours[activeIndex].tagline}</p>
           <p className="text-white/90 text-sm leading-relaxed">{flavours[activeIndex].description}</p>
        </div>

        {/* 4. Bottom Centered Navigation UI (MANA style arrows & pill) */}
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center items-center pointer-events-none">
           <div className="bottom-ui-panel flex items-center gap-4 md:gap-8 pointer-events-auto">
              
              <button onClick={prevSlide} className="w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl">
                 <ChevronLeft size={28} strokeWidth={3} />
              </button>
              
              <div className="bg-orange-500 text-white font-black text-xl md:text-3xl uppercase tracking-widest px-8 md:px-12 py-4 rounded-full shadow-2xl border-4 border-orange-400 min-w-[200px] text-center">
                 {flavours[activeIndex].name}
              </div>

              <button onClick={nextSlide} className="w-12 h-12 md:w-16 md:h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-xl">
                 <ChevronRight size={28} strokeWidth={3} />
              </button>
              
           </div>
        </div>

        {/* 5. Floating Dot Navigation (Right Side) */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-30 pointer-events-auto hidden md:flex">
          {flavours.map((flavour, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSection(idx)}
              className="group flex items-center justify-end gap-3 focus:outline-none"
            >
              <span className={`text-xs font-black tracking-widest uppercase transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                activeIndex === idx ? "text-white opacity-100" : "text-white/50"
              }`}>
                {flavour.name}
              </span>
              <span className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-300 flex items-center justify-center ${
                activeIndex === idx ? "bg-white scale-125 shadow-lg shadow-white/30" : "bg-transparent hover:bg-white/40"
              }`} />
            </button>
          ))}
        </div>
      </div>

      {/* 6. Invisible Spacer Tracks driving the h-[700vh] scroll triggers */}
      <div className="relative z-0 pointer-events-none">
        {flavours.map((_, idx) => (
          <div key={idx} className={`flavour-section-${idx} h-screen w-full pointer-events-none`} />
        ))}
      </div>
    </section>
  );
};

export default ProductShowcase;
