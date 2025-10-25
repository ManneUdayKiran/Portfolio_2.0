"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AnimatedBackground from "./animated-background";
import TechSphere from "./tech-sphere";

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle rotation based on mouse movement
      groupRef.current.rotation.y = state.mouse.x * 0.05;
      groupRef.current.rotation.x = state.mouse.y * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#4f46e5"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#7c3aed" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#60a5fa" />

      {/* Additional atmospheric lighting */}
      <hemisphereLight args={["#1e1b4b", "#312e81", 0.3]} />

      {/* Interactive 3D Tech Sphere as main background element */}
      <TechSphere position={[0, 0, -8]} />

      {/* Additional tech spheres for depth */}
      <TechSphere position={[12, 8, -15]} />
      <TechSphere position={[-10, -5, -12]} />

      {/* Animated background elements */}
      <AnimatedBackground />
    </group>
  );
}
