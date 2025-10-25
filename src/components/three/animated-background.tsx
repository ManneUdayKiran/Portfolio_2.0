"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function AnimatedBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Create gradient shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorA: { value: new THREE.Color("#1e40af") },
        colorB: { value: new THREE.Color("#7c3aed") },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec2 vUv;
        
        void main() {
          vec2 st = vUv;
          float pct = sin(st.x * 3.14159 + time) * sin(st.y * 3.14159 + time * 0.5);
          vec3 color = mix(colorA, colorB, pct * 0.5 + 0.5);
          gl_FragColor = vec4(color, 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && material) {
      material.uniforms.time.value = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -10]}
      rotation={[0, 0, 0]}
      material={material}
    >
      <planeGeometry args={[50, 50]} />
    </mesh>
  );
}
