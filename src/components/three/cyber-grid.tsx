"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CyberGrid() {
  const gridRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 2) % 10;
    }
  });

  const createGridLines = () => {
    const lines = [];
    const size = 50;
    const divisions = 50;
    const step = size / divisions;

    // Horizontal lines
    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      const points = [];
      points.push(new THREE.Vector3(-size / 2, 0, i * step));
      points.push(new THREE.Vector3(size / 2, 0, i * step));
      lines.push(points);
    }

    // Vertical lines
    for (let i = -divisions / 2; i <= divisions / 2; i++) {
      const points = [];
      points.push(new THREE.Vector3(i * step, 0, -size / 2));
      points.push(new THREE.Vector3(i * step, 0, size / 2));
      lines.push(points);
    }

    return lines;
  };

  const gridLines = createGridLines();

  return (
    <group
      ref={gridRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -5, -10]}
    >
      {gridLines.map((points, index) => (
        <line key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={points.length}
              array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </line>
      ))}

      {/* Duplicate for infinite scroll effect */}
      <group position={[0, 0, -10]}>
        {gridLines.map((points, index) => (
          <line key={`dup-${index}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#00ffff"
              transparent
              opacity={0.2}
              blending={THREE.AdditiveBlending}
            />
          </line>
        ))}
      </group>
    </group>
  );
}
