import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 80, flavorColor = '#C9A84C' }) {
  const meshRef = useRef()

  const { positions, speeds, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Spread particles in a wide ellipsoid around the can
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2
      speeds[i] = 0.1 + Math.random() * 0.3
      sizes[i] = 0.5 + Math.random() * 2.0
    }
    return { positions, speeds, sizes }
  }, [count])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    g.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
    return g
  }, [positions, sizes])

  useFrame((state) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      // Gentle drift upward, wrapping
      pos.array[i * 3 + 1] += speeds[i] * 0.003
      pos.array[i * 3 + 0] += Math.sin(t * 0.2 + i) * 0.001

      // Wrap when particle drifts too high
      if (pos.array[i * 3 + 1] > 4) {
        pos.array[i * 3 + 1] = -4
      }
    }
    pos.needsUpdate = true
  })

  const color = new THREE.Color(flavorColor)

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial
        color={color}
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.4}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
