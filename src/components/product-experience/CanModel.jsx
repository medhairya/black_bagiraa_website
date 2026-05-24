import { useRef, useMemo, forwardRef, useImperativeHandle, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Brand theme used by the scene for accents, lighting, and scroll states.
export const FLAVORS = {
  bagiraa: {
    name: 'Black Bagiraa',
    tagline: 'UNLEASH THE BEAST WITHIN',
    primary: '#FF7A1A',
    secondary: '#C94A00',
    glow: '#FF9A3D',
    labelTop: '#0a0600',
    labelMid: '#050300',
    accent1: '#FF7A1A',
    accent2: '#FFC15A',
    bodyClass: 'flavor-bagiraa',
    highlights: [],
  },
}

// Slim energy drink proportions. Height/radius are centered around world origin
// so external rotation and scroll controls pivot around the can's own axis.
const H = 1.8
const R = 0.43
const SEG = 128

const BODY_H = 1.67
const BODY_Y = -0.06
const SHOULDER_H = 0.13
const NECK_H = 0.08
const TOP_Y = H / 2
const BOTTOM_Y = -H / 2
const TOP_STACK_BASE = TOP_Y - SHOULDER_H - NECK_H - 0.035
const BODY_BOTTOM_Y = BOTTOM_Y + 0.14
const LABEL_H = 1.96
const LABEL_RADIUS = R + 0.003

function useMaterials(labelTexture, flavorColor) {
  return useMemo(() => {
    const metal = new THREE.MeshPhysicalMaterial({
      color: '#d4d4d1',
      metalness: 1,
      roughness: 0.18,
      clearcoat: 0.2,
      clearcoatRoughness: 0.32,
      envMapIntensity: 1.55,
    })

    const darkMetal = new THREE.MeshPhysicalMaterial({
      color: '#222220',
      metalness: 0.96,
      roughness: 0.22,
      clearcoat: 0.18,
      clearcoatRoughness: 0.36,
      envMapIntensity: 1.25,
    })

    const lid = new THREE.MeshPhysicalMaterial({
      color: '#cfcfca',
      metalness: 1,
      roughness: 0.24,
      clearcoat: 0.14,
      clearcoatRoughness: 0.4,
      envMapIntensity: 1.7,
    })

    const brushed = new THREE.MeshPhysicalMaterial({
      color: '#bab8b2',
      metalness: 1,
      roughness: 0.34,
      clearcoat: 0.1,
      clearcoatRoughness: 0.5,
      envMapIntensity: 1.45,
    })

    const label = new THREE.MeshPhysicalMaterial({
      map: labelTexture,
      metalness: 0.32,
      roughness: 0.31,
      clearcoat: 0.35,
      clearcoatRoughness: 0.22,
      envMapIntensity: 0.85,
    })

    const accent = new THREE.MeshPhysicalMaterial({
      color: flavorColor,
      metalness: 0.78,
      roughness: 0.2,
      clearcoat: 0.2,
      clearcoatRoughness: 0.26,
      emissive: flavorColor,
      emissiveIntensity: 0.1,
      envMapIntensity: 1.15,
    })

    const dark = new THREE.MeshStandardMaterial({
      color: '#070707',
      metalness: 0.55,
      roughness: 0.48,
      envMapIntensity: 0.5,
    })

    return { metal, darkMetal, lid, brushed, label, accent, dark }
  }, [labelTexture, flavorColor])
}

function makeLatheGeometry(points, segments = SEG) {
  const geometry = new THREE.LatheGeometry(points, segments)
  geometry.computeVertexNormals()
  return geometry
}

function useShoulderGeometry() {
  return useMemo(() => {
    const points = [
      new THREE.Vector2(R, 0),
      new THREE.Vector2(R, 0.035),
      new THREE.Vector2(R * 0.992, 0.07),
      new THREE.Vector2(R * 0.965, 0.118),
      new THREE.Vector2(R * 0.925, 0.165),
      new THREE.Vector2(R * 0.855, 0.214),
      new THREE.Vector2(R * 0.788, SHOULDER_H),
    ]
    return makeLatheGeometry(points)
  }, [])
}

function useNeckGeometry() {
  return useMemo(() => {
    const points = [
      new THREE.Vector2(R * 0.788, 0),
      new THREE.Vector2(R * 0.765, 0.026),
      new THREE.Vector2(R * 0.748, 0.07),
      new THREE.Vector2(R * 0.748, 0.125),
      new THREE.Vector2(R * 0.768, NECK_H),
    ]
    return makeLatheGeometry(points)
  }, [])
}

function useBottomDomeGeometry() {
  return useMemo(() => {
    const points = [
      new THREE.Vector2(0.01, -0.02),
      new THREE.Vector2(R * 0.22, -0.042),
      new THREE.Vector2(R * 0.48, -0.06),
      new THREE.Vector2(R * 0.72, -0.048),
      new THREE.Vector2(R * 0.84, -0.026),
      new THREE.Vector2(R * 0.91, 0.008),
      new THREE.Vector2(R * 0.94, 0.045),
      new THREE.Vector2(R * 0.89, 0.076),
      new THREE.Vector2(R * 0.72, 0.092),
      new THREE.Vector2(R * 0.4, 0.102),
      new THREE.Vector2(0.02, 0.105),
    ]
    return makeLatheGeometry(points)
  }, [])
}

function useLidInsetGeometry() {
  return useMemo(() => {
    const points = [
      new THREE.Vector2(0.012, -0.006),
      new THREE.Vector2(R * 0.33, -0.011),
      new THREE.Vector2(R * 0.6, -0.01),
      new THREE.Vector2(R * 0.725, 0),
      new THREE.Vector2(R * 0.756, 0.018),
      new THREE.Vector2(R * 0.72, 0.032),
      new THREE.Vector2(R * 0.52, 0.038),
      new THREE.Vector2(R * 0.22, 0.035),
      new THREE.Vector2(0.012, 0.03),
    ]
    return makeLatheGeometry(points)
  }, [])
}

function usePullTabGeometry() {
  return useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(-0.085, -0.205)
    shape.bezierCurveTo(-0.205, -0.165, -0.212, 0.12, -0.07, 0.22)
    shape.bezierCurveTo(0.055, 0.31, 0.238, 0.19, 0.23, 0.02)
    shape.bezierCurveTo(0.222, -0.12, 0.11, -0.23, -0.085, -0.205)

    const hole = new THREE.Path()
    hole.moveTo(-0.038, -0.105)
    hole.bezierCurveTo(-0.112, -0.062, -0.105, 0.102, -0.02, 0.146)
    hole.bezierCurveTo(0.068, 0.191, 0.155, 0.104, 0.14, 0.006)
    hole.bezierCurveTo(0.126, -0.087, 0.047, -0.145, -0.038, -0.105)
    shape.holes.push(hole)

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.014,
      bevelEnabled: true,
      bevelThickness: 0.004,
      bevelSize: 0.006,
      bevelSegments: 3,
      curveSegments: 24,
    })
    geometry.center()
    geometry.computeVertexNormals()
    return geometry
  }, [])
}

function CanBody({ labelTexture, flavorColor }) {
  const { metal, darkMetal, lid, brushed, label, accent, dark } = useMaterials(labelTexture, flavorColor)
  const shoulderGeometry = useShoulderGeometry()
  const neckGeometry = useNeckGeometry()
  const bottomDomeGeometry = useBottomDomeGeometry()
  const lidInsetGeometry = useLidInsetGeometry()
  const pullTabGeometry = usePullTabGeometry()

  if (labelTexture) {
    labelTexture.wrapS = THREE.RepeatWrapping
    labelTexture.wrapT = THREE.ClampToEdgeWrapping
    labelTexture.repeat.set(1, 1)
    labelTexture.offset.set(0, 0)
    labelTexture.colorSpace = THREE.SRGBColorSpace
    labelTexture.anisotropy = Math.max(labelTexture.anisotropy || 1, 8)
    labelTexture.needsUpdate = true
  }

  return (
    <group>
      {/* Main printed body. Open-ended keeps the metal top and base physically separate. */}
      <mesh position={[0, BODY_Y, 0]} material={label}>
        <cylinderGeometry args={[LABEL_RADIUS, LABEL_RADIUS, LABEL_H, SEG, 1, true]} />
      </mesh>

      <mesh position={[0, BODY_Y + LABEL_H / 2 + 0.017, 0]} material={brushed}>
        <cylinderGeometry args={[R * 0.996, R, 0.034, SEG, 1, true]} />
      </mesh>

      <mesh position={[0, BODY_Y - LABEL_H / 2 - 0.018, 0]} material={brushed}>
        <cylinderGeometry args={[R, R * 0.985, 0.036, SEG, 1, true]} />
      </mesh>

      {/* Subtle vertical reflection strips sell the cylindrical label without changing branding. */}
      <mesh position={[0, BODY_Y, LABEL_RADIUS + 0.001]} material={darkMetal}>
        <boxGeometry args={[0.052, BODY_H * 0.92, 0.003]} />
      </mesh>
      <mesh position={[LABEL_RADIUS * 0.86, BODY_Y, LABEL_RADIUS * 0.51]} rotation={[0, Math.PI * 0.32, 0]} material={dark}>
        <boxGeometry args={[0.025, BODY_H * 0.86, 0.002]} />
      </mesh>

      {/* Bottom concave base and rolled foot. */}
      <mesh position={[0, BOTTOM_Y + 0.058, 0]} rotation={[Math.PI, 0, 0]} geometry={bottomDomeGeometry} material={lid} />

      <mesh position={[0, BOTTOM_Y + 0.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal}>
        <torusGeometry args={[R * 0.936, 0.025, 12, SEG]} />
      </mesh>

      <mesh position={[0, BOTTOM_Y + 0.156, 0]} material={brushed}>
        <cylinderGeometry args={[R * 0.992, R * 0.94, 0.13, SEG, 1, true]} />
      </mesh>

      <mesh position={[0, BODY_BOTTOM_Y + 0.012, 0]} rotation={[Math.PI / 2, 0, 0]} material={dark}>
        <torusGeometry args={[R * 0.987, 0.004, 5, SEG]} />
      </mesh>

      {/* Realistic upper shoulder: straight slim wall rolls into a narrower lid. */}
      <mesh position={[0, TOP_STACK_BASE, 0]} geometry={shoulderGeometry} material={brushed} />
      <mesh position={[0, TOP_STACK_BASE + SHOULDER_H, 0]} geometry={neckGeometry} material={brushed} />

      <mesh position={[0, TOP_Y - 0.068, 0]} material={lid}>
        <cylinderGeometry args={[R * 0.792, R * 0.768, 0.07, SEG, 1, true]} />
      </mesh>

      <mesh position={[0, TOP_Y - 0.037, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal}>
        <torusGeometry args={[R * 0.79, 0.025, 14, SEG]} />
      </mesh>

      <mesh position={[0, TOP_Y - 0.012, 0]} geometry={lidInsetGeometry} material={lid} />

      <mesh position={[0, TOP_Y + 0.012, 0]} rotation={[Math.PI / 2, 0, 0]} material={dark}>
        <torusGeometry args={[R * 0.57, 0.0035, 4, SEG]} />
      </mesh>

      <mesh position={[0, TOP_Y + 0.018, 0]} rotation={[Math.PI / 2, 0, 0]} material={metal}>
        <torusGeometry args={[R * 0.738, 0.011, 8, SEG]} />
      </mesh>

      <mesh position={[0, TOP_Y + 0.027, 0]} rotation={[Math.PI / 2, 0, 0]} material={accent}>
        <torusGeometry args={[R * 0.665, 0.004, 5, SEG]} />
      </mesh>

      {/* Opening score and rivet detail. */}
      <mesh position={[0.026, TOP_Y + 0.034, -0.132]} rotation={[Math.PI / 2, 0, -0.08]} material={dark}>
        <torusGeometry args={[0.088, 0.0028, 5, 40, Math.PI * 1.72]} />
      </mesh>

      <mesh position={[0.012, TOP_Y + 0.04, -0.02]} material={metal}>
        <sphereGeometry args={[0.035, 32, 12, 0, Math.PI * 2, 0, Math.PI * 0.58]} />
      </mesh>

      {/* Pull tab lies flat on the lid and is offset toward the drinking opening. */}
      <mesh
        position={[0.02, TOP_Y + 0.055, 0.045]}
        rotation={[-Math.PI / 2, 0, -0.1]}
        scale={[1.05, 0.95, 1]}
        geometry={pullTabGeometry}
        material={metal}
      />

      <mesh position={[0.017, TOP_Y + 0.061, -0.017]} rotation={[Math.PI / 2, 0, 0]} material={dark}>
        <torusGeometry args={[0.034, 0.004, 8, 28]} />
      </mesh>
    </group>
  )
}

function CanModelInner({ flavor = 'bagiraa', scale = 1, groupRef }) {
  const labelTexture = useTexture('/textures/can-label.jpg')
  const flavorData = FLAVORS[flavor] ?? FLAVORS.bagiraa

  useFrame((state) => {
    if (!groupRef.current) return

    const t = state.clock.elapsedTime
    if (!groupRef.current.__scrollDriven) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.065
      groupRef.current.rotation.z = Math.sin(t * 0.38) * 0.009
      groupRef.current.rotation.x = Math.cos(t * 0.28) * 0.007
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      <CanBody labelTexture={labelTexture} flavorColor={flavorData.primary} />
    </group>
  )
}

const CanModel = forwardRef(function CanModel({ flavor = 'bagiraa', scale = 1 }, ref) {
  const groupRef = useRef()

  useImperativeHandle(ref, () => ({
    group: groupRef.current,
    setRotationY: (y) => {
      if (groupRef.current) groupRef.current.rotation.y = y
    },
  }))

  return (
    <Suspense fallback={null}>
      <CanModelInner flavor={flavor} scale={scale} groupRef={groupRef} />
    </Suspense>
  )
})

export default CanModel
