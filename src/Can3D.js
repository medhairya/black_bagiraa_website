import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export default function Can3D() {
  const model = useGLTF("/can.glb"); // Ensure you have `can.glb` in `public/`
  const ref = useRef();

  useFrame(() => {
    ref.current.rotation.y += 0.01; // Smooth rotation effect
  });

  return <primitive ref={ref} object={model.scene} scale={2} />;
}
