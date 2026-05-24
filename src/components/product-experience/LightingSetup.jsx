import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'

export default function LightingSetup({ flavorColor, isMobile }) {
  const keyLightRef = useRef()
  const rimLightRef = useRef()

  useFrame((state) => {
    if (keyLightRef.current) {
      keyLightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.5 + 2
      keyLightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.1) * 0.3 + 3
    }
  })

  return (
    <>
      {/* Ambient: very subtle base */}
      <ambientLight intensity={0.08} color="#ffffff" />

      {/* Key light: cinematic warm */}
      <directionalLight
        ref={keyLightRef}
        position={[2, 3, 2]}
        intensity={2.2}
        color="#fff5e0"
        castShadow={!isMobile}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-bias={-0.001}
      />

      {/* Rim light: colored accent from behind */}
      <directionalLight
        ref={rimLightRef}
        position={[-2.5, 1, -3]}
        intensity={1.4}
        color={flavorColor}
      />

      {/* Fill: subtle cool from below */}
      <directionalLight
        position={[0, -2, 1]}
        intensity={0.25}
        color="#c0d0ff"
      />

      {/* Flavor-colored point light for glow */}
      <pointLight
        position={[0, 0, 2.5]}
        intensity={0.8}
        color={flavorColor}
        distance={6}
        decay={2}
      />

      {/* Top point for cap highlight */}
      <pointLight
        position={[0.5, 3, 1]}
        intensity={1.0}
        color="#ffffff"
        distance={8}
        decay={2}
      />

      {/* Contact shadow */}
      {!isMobile && (
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.5}
          scale={4}
          blur={2.5}
          far={3}
          color="#000000"
        />
      )}

      {/* Environment: subtle studio feel */}
      <Environment preset="studio" environmentIntensity={0.15} />
    </>
  )
}
