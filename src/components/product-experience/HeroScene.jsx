import { Suspense, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei'
import CanModel, { FLAVORS } from './CanModel'
import LightingSetup from './LightingSetup'
import Particles from './Particles'
import { useResponsive3D } from './useResponsive3D'

const START_ROTATION_Y = Math.PI

// Camera rig that responds to scroll progress and mouse parallax
function CameraRig({ isMobile }) {
  const { camera } = useThree()
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (isMobile) return
    const onMove = (e) => {
      targetRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.12
      targetRef.current.y = (e.clientY / window.innerHeight - 0.5) * -0.06
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [isMobile])

  useFrame(() => {
    // Smooth parallax
    currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05
    currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05

    camera.position.x = currentRef.current.x
    camera.position.y = currentRef.current.y
    camera.lookAt(0, 0, 0)
  })

  return null
}

// The inner scene that receives scroll progress
function Scene({ canRef, progress, flavorColor, flavor, isMobile, particleCount, canScale }) {
  const prevProgressRef = useRef(0)

  useFrame(() => {
    if (!canRef?.current?.group) return
    const group = canRef.current.group

    // Smooth the raw progress
    prevProgressRef.current += (progress.current - prevProgressRef.current) * 0.08

    const p = prevProgressRef.current

    // Rotation: full 720 degrees over the scroll journey, around Y axis only
    const targetRotY = START_ROTATION_Y + p * Math.PI * 4
    group.rotation.y = targetRotY

    // Vertical drift: slight bob based on phase
    const phase = p * Math.PI * 2
    if (!group.__scrollDriven || p > 0.02) {
      group.__scrollDriven = p > 0.02
      group.position.y = Math.sin(phase * 0.5) * 0.08
    }

    // Subtle tilt: can leans slightly during rotation
    group.rotation.z = Math.sin(p * Math.PI * 2) * 0.04
    group.rotation.x = Math.cos(p * Math.PI) * 0.03
  })

  return (
    <>
      <CameraRig isMobile={isMobile} />

      <Particles count={particleCount} flavorColor={flavorColor} />

      <Suspense fallback={null}>
        <CanModel
          ref={canRef}
          flavor={flavor}
          scale={canScale}
        />
      </Suspense>

      <LightingSetup flavorColor={flavorColor} isMobile={isMobile} />
    </>
  )
}

export default function HeroScene({
  flavor,
  progress,
}) {
  const canRef = useRef()
  const { isMobile, cameraFov, cameraZ, dpr, shadows, particleCount, canScale } = useResponsive3D()
  const flavor_data = FLAVORS[flavor] ?? FLAVORS.bagiraa

  return (
    <Canvas
      dpr={dpr}
      shadows={shadows}
      gl={{
        antialias: !isMobile,
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
        depth: true,
      }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera
        makeDefault
        fov={cameraFov}
        position={[0, 0, cameraZ]}
        near={0.1}
        far={50}
      />

      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <Scene
        canRef={canRef}
        progress={progress}
        flavorColor={flavor_data.primary}
        flavor={flavor}
        isMobile={isMobile}
        particleCount={particleCount}
        canScale={canScale}
      />
    </Canvas>
  )
}
