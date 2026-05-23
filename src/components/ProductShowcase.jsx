import React, { useState, Suspense, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls } from "@react-three/drei";
import * as THREE from "three";
import Product3DModel from "./Product3DModel";
import ModelPositioningGuide from "./ModelPositioningGuide";
import "./ProductShowcase.css";
import can from "../assets/can.png";
import classicBottle from "../assets/energy-simple.png";
import coffee from "../assets/energy-coffee.png";
import watermelon from "../assets/energy-watermelon.png";
import jeera from "../assets/jeera.png";
import pineapple from "../assets/pineapple.png";
import orange from "../assets/orange.png";
import testBg from "../assets/test-bg.png";
import pineapple_bg from '../assets/pineapple-bg.png';
import orange_bg from '../assets/orange-bg.png';

// Camera constraint component to prevent camera from going out of bounds
const CameraConstraint = () => {
  const { camera } = useThree();
  
  useFrame(() => {
    // Keep camera within reasonable bounds
    const maxDistance = 5;
    const minDistance = 2;
    
    if (camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) > maxDistance) {
      camera.position.normalize().multiplyScalar(maxDistance);
    }
    
    if (camera.position.distanceTo(new THREE.Vector3(0, 0, 0)) < minDistance) {
      camera.position.normalize().multiplyScalar(minDistance);
    }
    
    // Keep camera looking at center
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Example flavour data with 3D model paths
const flavours = [
  {
    name: "Classic Can",
    bg: testBg,
    can: can,
    color: "#cc2e2e",
    model3D: "/models/can/can.glb", // Using your existing GLB file
    has3D: true
  },
  {
    name: "Classic Energy",
    bg: "/images/bg2.jpg",
    can: classicBottle,
    color: "#2ecc71",
    model3D: "/models/classic-energy/black bagira Rs20 .glb",
    has3D: true
  },
  {
    name: "Coffee",
    bg: "/images/bg3.jpg",
    can: coffee,
    color: "#9b59b6",
    model3D: "/models/coffee/coffee.glb",
    has3D: true
  },
  {
    name: "Watermelon",
    bg: "/images/bg4.jpg",
    can: watermelon,
    color: "#2ecc71",
    model3D: "/models/watermelon/watermalon.glb",
    has3D: true
  },
  {
    name: "Jeera",
    bg: "/images/bg5.jpg",
    can: jeera,
    color: "#2ecc71",
    model3D: "/models/jeera/jeera.glb",
    has3D: true
  },
  {
    name: "Pineapple",
    bg: pineapple_bg,
    can: pineapple,
    color: "#2ecc71",
    model3D: "/models/pineapple/painapple.glb",
    has3D: true
  },
  {
    name: "Orange",
    bg: orange_bg,
    can: orange,
    color: "#2ecc71",
    model3D: "/models/orange/Orange.glb",
    has3D: true
  },
];

const ProductShowcase = () => {
  const [index, setIndex] = useState(0);
  const [show3D, setShow3D] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [lightIntensity, setLightIntensity] = useState(2.5);

  const prevSlide = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? flavours.length - 1 : prev - 1));
      setIsLoading(false);
    }, 300);
  };

  const nextSlide = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIndex((prev) => (prev === flavours.length - 1 ? 0 : prev + 1));
      setIsLoading(false);
    }, 300);
  };

  const toggle3D = () => {
    setShow3D(!show3D);
  };

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center overflow-hidden product-showcase-container"
      style={{
        backgroundImage: `url(${flavours[index].bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Control Buttons */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        <motion.button
          onClick={toggle3D}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all duration-300 border border-white/30 glass-effect"
        >
          <span className="flex items-center gap-2">
            {show3D ? (
              <>
                <span className="text-lg">🎨</span>
                Show 2D
              </>
            ) : (
              <>
                <span className="text-lg">🎭</span>
                Show 3D
              </>
            )}
          </span>
        </motion.button>
        
        {show3D && (
          <motion.button
            onClick={() => setShowDebug(!showDebug)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 bg-red-500/20 backdrop-blur-sm rounded-full text-red-200 font-semibold hover:bg-red-500/30 transition-all duration-300 border border-red-300/30 glass-effect"
          >
            <span className="text-sm">🐛</span>
          </motion.button>
        )}
      </div>

      {/* Arrows */}
      <motion.button
        onClick={prevSlide}
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute left-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 z-20 border border-gray-200 nav-button enhanced-shadow"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        className="absolute right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 z-20 border border-gray-200 nav-button enhanced-shadow"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </motion.button>

      {/* 3D Model Display */}
      {show3D && flavours[index].has3D && (
        <div className={`absolute inset-0 z-10 three-canvas-container ${showDebug ? 'debug-mode' : ''}`}>
          <Canvas
            camera={{ position: [0, 0, 3.5], fov: 40 }}
            style={{ background: 'transparent' }}
            gl={{ 
              antialias: true, 
              alpha: true,
              powerPreference: "high-performance"
            }}
            onCreated={({ gl, camera }) => {
              // Ensure camera is properly positioned
              camera.position.set(0, 0, 3.5);
              camera.lookAt(0, 0, 0);
              
              // Add camera constraints
              camera.userData.originalPosition = camera.position.clone();
              camera.userData.originalLookAt = new THREE.Vector3(0, 0, 0);
            }}
          >
            <Suspense fallback={
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#666" />
              </mesh>
            }>
              {/* Camera constraint component */}
              <CameraConstraint />
              <PresentationControls
                global
                rotation={[0, 0, 0]}
                polar={[-0.15, 0.15]}
                azimuth={[-0.3, 0.3]}
                config={{ mass: 3, tension: 600 }}
                snap={{ mass: 5, tension: 600 }}
                zoom={0.7}
                pan={false}
                maxPolarAngle={Math.PI / 2.5}
                minPolarAngle={-Math.PI / 2.5}
                maxAzimuthAngle={Math.PI / 3}
                minAzimuthAngle={-Math.PI / 3}
              >
                <AnimatePresence mode="wait">
                  <motion.group
                    key={index}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.3, 
                      rotateY: -Math.PI,
                      rotateX: Math.PI / 2,
                      y: 100
                    }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1, 
                      rotateY: 0,
                      rotateX: 0,
                      y: 0
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.3, 
                      rotateY: Math.PI,
                      rotateX: -Math.PI / 2,
                      y: -100
                    }}
                    transition={{ 
                      duration: 1.2, 
                      ease: "easeInOut",
                      type: "spring",
                      stiffness: 80,
                      damping: 15
                    }}
                  >
                    <Product3DModel 
                      modelPath={flavours[index].model3D} 
                      isActive={true}
                      animationSpeed={2.5}
                    />
                    
                    {/* Model boundary constraint - invisible walls to keep model in view */}
                    <mesh position={[0, 0, -2]} visible={false}>
                      <boxGeometry args={[6, 6, 0.1]} />
                      <meshBasicMaterial transparent opacity={0} />
                    </mesh>
                    
                    {/* Model stabilization - keeps model upright and centered */}
                    <group position={[0, 0, 0]}>
                      <mesh visible={false}>
                        <boxGeometry args={[0.1, 0.1, 0.1]} />
                        <meshBasicMaterial transparent opacity={0} />
                      </mesh>
                    </group>
                    
                    {/* Debug helper - shows model boundaries and positioning guides */}
                    {showDebug && (
                      <>
                        <mesh position={[0, 0, 0]}>
                          <boxGeometry args={[3, 3, 3]} />
                          <meshBasicMaterial color="red" wireframe opacity={0.3} transparent />
                        </mesh>
                        {/* Center point indicator */}
                        <mesh position={[0, 0, 0]}>
                          <sphereGeometry args={[0.05, 8, 6]} />
                          <meshBasicMaterial color="yellow" />
                        </mesh>
                        {/* Grid helper */}
                        <gridHelper args={[6, 6, 0x444444, 0x888888]} />
                      </>
                    )}
                  </motion.group>
                </AnimatePresence>
              </PresentationControls>
              
              {/* Enhanced Professional Lighting System */}
              <Environment preset="sunset" />
              
              {/* Main ambient light - increased intensity */}
              <ambientLight intensity={0.8} />
              
              {/* Primary directional light - main light source */}
              <directionalLight 
                position={[15, 15, 10]} 
                intensity={lightIntensity}
                castShadow
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                color="#ffffff"
              />
              
              {/* Secondary directional light - fill light */}
              <directionalLight 
                position={[-15, 10, 5]} 
                intensity={lightIntensity * 0.7}
                color="#f0f8ff"
              />
              
              {/* Top light - overhead illumination */}
              <directionalLight 
                position={[0, 20, 0]} 
                intensity={lightIntensity * 0.6}
                color="#ffffff"
              />
              
              {/* Colored accent lights for dramatic effect */}
              <pointLight 
                position={[-8, 5, 8]} 
                intensity={2.0}
                color="#ff6b6b"
                distance={20}
                decay={2}
              />
              
              <pointLight 
                position={[8, 5, 8]} 
                intensity={2.0}
                color="#4ecdc4"
                distance={20}
                decay={2}
              />
              
              <pointLight 
                position={[0, -5, 10]} 
                intensity={1.5}
                color="#ffd93d"
                distance={15}
                decay={2}
              />
              
              {/* Rim lighting for edge definition */}
              <spotLight
                position={[0, 0, 15]}
                intensity={1.2}
                angle={0.3}
                penumbra={0.5}
                color="#ffffff"
                castShadow
              />
              
              {/* Subtle fog for depth - reduced intensity */}
              <fog attach="fog" args={['#000000', 8, 20]} />
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* 2D Image Display */}
      {!show3D && (
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={flavours[index].can}
            alt={flavours[index].name}
            initial={{ opacity: 0, y: 50, scale: 0.9, rotateY: -90 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, y: -50, scale: 0.9, rotateY: 90 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="max-h-[70vh] object-contain z-10"
            style={{ transformStyle: 'preserve-3d' }}
          />
        </AnimatePresence>
      )}

      {/* Flavour Button */}
      <motion.button
        key={flavours[index].name}
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
        style={{ backgroundColor: flavours[index].color }}
        className="absolute bottom-10 px-6 py-3 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 z-20"
      >
        {flavours[index].name}
      </motion.button>

      {/* Product Counter */}
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="absolute top-6 right-6 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white font-medium z-20"
      >
        {index + 1} / {flavours.length}
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-30"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Model Positioning Guide */}
      <ModelPositioningGuide 
        show={show3D && showDebug} 
        onPositionChange={(type, value) => {
          // This will be used to adjust model positioning in real-time
          if (type === 'lightIntensity') {
            setLightIntensity(value);
          }
          console.log(`${type} changed to:`, value);
        }}
      />
    </section>
  );
};

export default ProductShowcase;
