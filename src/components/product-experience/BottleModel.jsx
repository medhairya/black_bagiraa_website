import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import bottleModelUrl from "../../assets/jeera.glb";
import logoAsset from "../../assets/logo.png";
import { productFlavors } from "./flavors";
import { createFlavorLabelTexture } from "./labelTextureFactory";

const BottleModel = forwardRef(function BottleModel(
  { activeFlavor = 0, isMobile = false, onReady },
  ref
) {
  const rootRef = useRef(null);
  const idleRef = useRef(null);
  const spinRef = useRef(null);
  const modelRef = useRef(null);
  const materialRefs = useRef({});
  const readyRef = useRef(false);
  const { scene } = useGLTF(bottleModelUrl);
  const logoTexture = useTexture(logoAsset);
  const [labelTextures, setLabelTextures] = useState([]);
  const sceneClone = useMemo(() => scene.clone(true), [scene]);

  useImperativeHandle(
    ref,
    () => ({
      root: rootRef.current,
      idle: idleRef.current,
      spin: spinRef.current,
    }),
    []
  );

  useEffect(() => {
    if (!logoTexture?.image) {
      return undefined;
    }

    const textures = productFlavors.map((flavor) =>
      createFlavorLabelTexture(flavor, logoTexture.image)
    );
    setLabelTextures(textures);

    return () => {
      textures.forEach((texture) => texture.dispose());
    };
  }, [logoTexture]);

  useLayoutEffect(() => {
    const model = modelRef.current;
    if (!model) {
      return;
    }

    materialRefs.current = {};
    sceneClone.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return;
      }

      child.castShadow = true;
      child.receiveShadow = true;
      child.material = child.material.clone();

      if (child.material.name === "bottle") {
        materialRefs.current.bottle = child.material;
      }
      if (child.material.name === "cap") {
        materialRefs.current.cap = child.material;
      }
      if (child.material.name === "label") {
        materialRefs.current.label = child.material;
      }
      if (child.material.name === "liquid") {
        materialRefs.current.liquid = child.material;
      }
    });

    model.scale.setScalar(1);
    model.position.set(0, 0, 0);
    model.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const targetHeight = isMobile ? 2.18 : 3.05;
    const scale = targetHeight / Math.max(size.y || 1, 1);

    model.scale.setScalar(scale);
    model.position.set(
      -center.x * scale,
      -center.y * scale - size.y * scale * 0.04,
      -center.z * scale
    );

    if (!readyRef.current) {
      readyRef.current = true;
      onReady?.();
    }
  }, [isMobile, onReady, sceneClone]);

  useEffect(() => {
    const flavor = productFlavors[activeFlavor] ?? productFlavors[0];
    const bottleMaterial = materialRefs.current.bottle;
    const capMaterial = materialRefs.current.cap;
    const labelMaterial = materialRefs.current.label;
    const liquidMaterial = materialRefs.current.liquid;

    if (bottleMaterial) {
      bottleMaterial.color = new THREE.Color(flavor.glass);
      bottleMaterial.transparent = true;
      bottleMaterial.opacity = 0.5;
      bottleMaterial.roughness = 0.12;
      bottleMaterial.metalness = 0.06;
      if ("transmission" in bottleMaterial) {
        bottleMaterial.transmission = 0.42;
        bottleMaterial.thickness = 0.7;
        bottleMaterial.ior = 1.38;
        bottleMaterial.clearcoat = 1;
        bottleMaterial.clearcoatRoughness = 0.08;
      }
      bottleMaterial.needsUpdate = true;
    }

    if (capMaterial) {
      capMaterial.color = new THREE.Color(flavor.cap);
      capMaterial.roughness = 0.48;
      capMaterial.metalness = 0.18;
      capMaterial.needsUpdate = true;
    }

    if (labelMaterial && labelTextures[activeFlavor]) {
      labelMaterial.color = new THREE.Color("#ffffff");
      labelMaterial.map = labelTextures[activeFlavor];
      labelMaterial.side = THREE.DoubleSide;
      labelMaterial.metalness = 0.08;
      labelMaterial.roughness = 0.48;
      if ("transmission" in labelMaterial) {
        labelMaterial.transmission = 0;
        labelMaterial.clearcoat = 0.08;
      }
      labelMaterial.needsUpdate = true;
    }

    if (liquidMaterial) {
      liquidMaterial.color = new THREE.Color(flavor.liquid);
      liquidMaterial.roughness = 0.18;
      liquidMaterial.metalness = 0.1;
      if ("transmission" in liquidMaterial) {
        liquidMaterial.transmission = 0.1;
        liquidMaterial.thickness = 1.3;
      }
      liquidMaterial.needsUpdate = true;
    }
  }, [activeFlavor, labelTextures]);

  useFrame((state) => {
    if (!idleRef.current) {
      return;
    }

    const time = state.clock.getElapsedTime();
    idleRef.current.position.y = Math.sin(time * 1.05) * 0.045;
    idleRef.current.rotation.x = Math.sin(time * 0.4) * 0.018;
    idleRef.current.rotation.z = Math.sin(time * 0.48) * 0.022;
  });

  return (
    <group ref={rootRef}>
      <group ref={idleRef}>
        <group ref={spinRef}>
          <group ref={modelRef}>
            <primitive object={sceneClone} />
          </group>
        </group>
      </group>
    </group>
  );
});

useGLTF.preload(bottleModelUrl);
useTexture.preload(logoAsset);

export default BottleModel;
