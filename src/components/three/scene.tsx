"use client";

// import { useRef, Suspense } from "react";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";
// import dynamic from "next/dynamic";

// // Dynamically load 3D components
// const TechSphere = dynamic(() => import("./tech-sphere"), { ssr: false });
// const AnimatedBackground = dynamic(() => import("./animated-background"), { ssr: false });

// export default function Scene() {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y = state.mouse.x * 0.05;
//       groupRef.current.rotation.x = state.mouse.y * 0.025;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <ambientLight intensity={0.4} />
//       <directionalLight position={[10, 10, 5]} intensity={0.8} color="#4f46e5" />
//       <pointLight position={[-10, -10, -10]} intensity={0.6} color="#7c3aed" />
//       <pointLight position={[5, -5, 5]} intensity={0.5} color="#60a5fa" />
//       <hemisphereLight args={["#1e1b4b", "#312e81", 0.3]} />

//       <Suspense fallback={null}>
//         <TechSphere position={[12, 8, -15]} />
//         <TechSphere position={[0, 0, -8]} />
//         <TechSphere position={[-10, -5, -12]} />
//         <AnimatedBackground />
//       </Suspense>
//     </group>
//   );
// }









import { Suspense, useRef } from "react";
import { useFrame, Canvas } from "@react-three/fiber";
import * as THREE from "three";
import dynamic from "next/dynamic";

// Dynamically load heavy subcomponents
const TechSphere = dynamic(() => import("./tech-sphere"), { ssr: false });
const AnimatedBackground = dynamic(() => import("./animated-background"), { ssr: false });

export default function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate group based on mouse
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.mouse.x * 0.05;
      groupRef.current.rotation.x = state.mouse.y * 0.025;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#4f46e5" />
      <pointLight position={[-10, -10, -10]} intensity={0.6} color="#7c3aed" />
      <pointLight position={[5, -5, 5]} intensity={0.5} color="#60a5fa" />
      <hemisphereLight args={["#1e1b4b", "#312e81", 0.3]} />

      {/* 3D Objects */}
      <Suspense fallback={null}>
        <TechSphere position={[0, 0, -8]} />
        <TechSphere position={[12, 8, -15]} />
        <TechSphere position={[-10, -5, -12]} />
        <AnimatedBackground />
      </Suspense>
    </group>
  );
}

// Wrapper for Canvas
export function SceneCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 45 }}
      gl={{ antialias: true }}
    >
      <Scene />
    </Canvas>
  );
}
