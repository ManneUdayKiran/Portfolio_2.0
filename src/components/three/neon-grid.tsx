"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function NeonGrid() {
  const gridRef = useRef<THREE.Group>(null);

  // Create cyberpunk grid lines
  const gridLines = useMemo(() => {
    const lines: JSX.Element[] = [];
    const size = 40;
    const divisions = 40;
    const step = size / divisions;

    // Vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = -size / 2 + i * step;
      const points = [];
      for (let z = -size / 2; z <= size / 2; z += step / 4) {
        points.push(new THREE.Vector3(x, 0, z));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      // Glow intensity based on distance from center
      const distanceFromCenter = Math.abs(x);
      const glowIntensity = 1 - distanceFromCenter / (size / 2);

      lines.push(
        <line key={`v-${i}`} geometry={geometry}>
          <lineBasicMaterial
            color={new THREE.Color().setHSL(0.5 + glowIntensity * 0.2, 1, 0.5)}
            transparent
            opacity={0.3 + glowIntensity * 0.3}
            blending={THREE.AdditiveBlending}
          />
        </line>
      );
    }

    // Horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const z = -size / 2 + i * step;
      const points = [];
      for (let x = -size / 2; x <= size / 2; x += step / 4) {
        points.push(new THREE.Vector3(x, 0, z));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const distanceFromCenter = Math.abs(z);
      const glowIntensity = 1 - distanceFromCenter / (size / 2);

      lines.push(
        <line key={`h-${i}`} geometry={geometry}>
          <lineBasicMaterial
            color={new THREE.Color().setHSL(0.5 + glowIntensity * 0.2, 1, 0.5)}
            transparent
            opacity={0.3 + glowIntensity * 0.3}
            blending={THREE.AdditiveBlending}
          />
        </line>
      );
    }

    return lines;
  }, []);

  // Animate grid pulse
  useFrame((state) => {
    if (gridRef.current) {
      const time = state.clock.getElapsedTime();
      gridRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = 0.3 + Math.sin(time * 0.5 + i * 0.1) * 0.2;
        }
      });
    }
  });

  return (
    <group ref={gridRef} position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {gridLines}
      {/* Center glow point */}
      <pointLight
        position={[0, 2, 0]}
        color="#00ffff"
        intensity={2}
        distance={20}
      />
    </group>
  );
}
