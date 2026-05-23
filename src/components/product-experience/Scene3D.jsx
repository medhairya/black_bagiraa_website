import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import BottleModel from "./BottleModel";
import { productFlavors } from "./flavors";

const Scene3D = ({
  activeFlavor = 0,
  isMobile = false,
  bottleRef,
  onBottleReady,
}) => {
  const flavor = productFlavors[activeFlavor] ?? productFlavors[0];

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.1] : [1, 1.55]}
        camera={{
          position: isMobile ? [0, 0.04, 6.1] : [0, 0.05, 5.25],
          fov: isMobile ? 30 : 25,
        }}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
        }}
      >
        <fog attach="fog" args={["#050505", 8, 16]} />
        <ambientLight intensity={0.85} />
        <directionalLight
          position={[3.5, 5, 4.5]}
          intensity={2.8}
          color="#ffffff"
          castShadow={!isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-4, 2.8, 2]}
          intensity={1.2}
          color={flavor.accentSoft}
        />
        <pointLight position={[0, 1.8, 2.2]} intensity={12} color={flavor.accent} />
        <pointLight position={[0, -1.2, -2.5]} intensity={4.2} color={flavor.accentSoft} />
        <spotLight
          position={[0, 4.8, 5.8]}
          angle={0.4}
          penumbra={0.8}
          intensity={3.5}
          color="#fff7ea"
        />
        <Environment preset={isMobile ? "studio" : "warehouse"} />

        <Suspense fallback={null}>
          <BottleModel
            ref={bottleRef}
            activeFlavor={activeFlavor}
            isMobile={isMobile}
            onReady={onBottleReady}
          />
        </Suspense>

        <ContactShadows
          position={[0, isMobile ? -1.52 : -1.74, 0]}
          opacity={isMobile ? 0.32 : 0.46}
          scale={isMobile ? 4.4 : 6.4}
          blur={isMobile ? 2.2 : 2.8}
          far={4.6}
          resolution={isMobile ? 256 : 512}
          color="#000000"
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;
