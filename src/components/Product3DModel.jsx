import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Product3DModel = ({ modelPath, isActive, animationSpeed = 1 }) => {
  const groupRef = useRef();
  const meshRef = useRef();
  
  // Load the 3D model
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, groupRef);
  
  // Handle different file types
  const isGLB = modelPath.endsWith('.glb');
  const isOBJ = modelPath.endsWith('.obj');
  
  // Auto-scale and position the model to fit properly
  useEffect(() => {
    if (scene && groupRef.current) {
      // Calculate the bounding box of the model
      const box = new THREE.Box3().setFromObject(scene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      
      // Calculate the scale to fit the model properly
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetSize = 1.0; // Adjusted target size for better fit
      const scale = targetSize / maxDimension;
      
      // Apply scale
      groupRef.current.scale.setScalar(scale);
      
      // Center the model
      groupRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      
      // Adjust Y position to center vertically and prevent going upside down
      groupRef.current.position.y += 0.05; // Fine-tuned for better positioning
      
      // Add some forward positioning for better visibility
      groupRef.current.position.z += 0.3;
      
      // Reset rotation to prevent upside-down orientation
      groupRef.current.rotation.set(0, 0, 0);
      
      // Store initial position for floating animation
      groupRef.current.userData.initialPosition = groupRef.current.position.clone();
      
      // Enhance materials for better lighting response
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(mat => {
              if (mat) {
                mat.envMapIntensity = 1.2;
                mat.needsUpdate = true;
              }
            });
          } else {
            child.material.envMapIntensity = 1.2;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);
  
  // Animation loop - Horizontal rotation only (Y-axis), with gentle floating
  useFrame((state) => {
    if (groupRef.current && isActive) {
      // Very gentle floating animation
      if (groupRef.current.userData.initialPosition) {
        const initialY = groupRef.current.userData.initialPosition.y;
        groupRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.3) * 0.01;
      }
      
      // Horizontal rotation only (Y-axis) - keeps model upright
      groupRef.current.rotation.x = 0; // No forward/backward tilt
      groupRef.current.rotation.y += 0.005 * animationSpeed; // Gentle horizontal rotation
      groupRef.current.rotation.z = 0; // No sideways tilt
      
      // Position constraints to prevent model from going out of view
      const maxY = 2;
      const minY = -2;
      const maxZ = 3;
      const minZ = -3;
      
      if (groupRef.current.position.y > maxY) groupRef.current.position.y = maxY;
      if (groupRef.current.position.y < minY) groupRef.current.position.y = minY;
      if (groupRef.current.position.z > maxZ) groupRef.current.position.z = maxZ;
      if (groupRef.current.position.z < minZ) groupRef.current.position.z = minZ;
    }
  });
  
  // Play animations if they exist
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.reset().fadeIn(0.5).play();
        }
      });
    }
  }, [actions]);
  
  // Handle OBJ files differently (they need material and texture)
  if (isOBJ) {
    return (
      <group ref={groupRef} dispose={null}>
        <mesh ref={meshRef}>
          <primitive object={scene} />
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.8} 
            roughness={0.2}
            envMapIntensity={1}
          />
        </mesh>
      </group>
    );
  }
  
  // Handle GLB files (they usually come with materials)
  return (
    <group ref={groupRef} dispose={null}>
      <primitive object={scene} />
    </group>
  );
};

export default Product3DModel;
