import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Can3DModel = () => {
  const group = useRef();
  const { scene } = useGLTF("/models/new-model.glb");

  // **🔥 Scale up the model**
  scene.scale.set(35, 35, 35);

  // **💡 Increase Material Brightness**
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.metalness = 0.7; // More metallic
      child.material.roughness = 0.2; // Shinier
      child.material.emissive.set("#ffffff"); // Self-brightness
      child.material.emissiveIntensity = 1; // Increase glow
    }
  });

  // **🌀 Rotate Model**
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.02;
    }
  });

  return <primitive object={scene} ref={group} />;
};

export default Can3DModel;
