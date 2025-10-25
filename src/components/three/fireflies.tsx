"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface FireflyProps {
  onHit: () => void;
}

export function Firefly({ onHit }: FireflyProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const { camera, size } = useThree();

  // Random initial position and movement parameters
  const pos = useRef([
    (Math.random() - 0.5) * 16,
    (Math.random() - 0.5) * 8,
    (Math.random() - 0.5) * 8,
  ]);

  const speed = useRef({
    x: (Math.random() - 0.5) * 0.5,
    y: (Math.random() - 0.5) * 0.3,
    phase: Math.random() * Math.PI * 2,
  });

  const lastHit = useRef(0);

  useFrame(({ clock }) => {
    if (!meshRef.current || !glowRef.current) return;

    const t = clock.getElapsedTime();

    // Smooth floating animation with sine waves
    meshRef.current.position.x =
      pos.current[0] + Math.sin(t * speed.current.x + speed.current.phase) * 2;
    meshRef.current.position.y =
      pos.current[1] +
      Math.cos(t * speed.current.y + speed.current.phase) * 1.5;
    meshRef.current.position.z =
      pos.current[2] + Math.sin(t * 0.3 + speed.current.phase) * 1;

    // Update glow position
    glowRef.current.position.copy(meshRef.current.position);

    // Pulsing glow effect
    const pulse = 0.8 + Math.sin(t * 4 + speed.current.phase) * 0.4;
    glowRef.current.scale.setScalar(pulse);

    // Project 3D position to screen coordinates
    const vector = meshRef.current.position.clone();
    vector.project(camera);

    const x = (vector.x * 0.5 + 0.5) * size.width;
    const y = (-vector.y * 0.5 + 0.5) * size.height;

    // Check collision with hero name element
    const nameEl = document.getElementById("hero-name");
    if (nameEl && t - lastHit.current > 2) {
      // Cooldown of 2 seconds
      const rect = nameEl.getBoundingClientRect();
      const margin = 50; // Collision margin

      if (
        x > rect.left - margin &&
        x < rect.right + margin &&
        y > rect.top - margin &&
        y < rect.bottom + margin
      ) {
        onHit();
        lastHit.current = t;

        // Create a brief flash effect
        const currentScale = meshRef.current.scale.x;
        meshRef.current.scale.setScalar(currentScale * 2);
        setTimeout(() => {
          if (meshRef.current) meshRef.current.scale.setScalar(currentScale);
        }, 200);
      }
    }
  });

  return (
    <group>
      {/* Main firefly body */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial
          color="#ffff88"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial
          color="#ffff44"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

interface FirefliesProps {
  count?: number;
  onHit: () => void;
}

export default function Fireflies({ count = 12, onHit }: FirefliesProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Firefly key={i} onHit={onHit} />
      ))}
    </>
  );
}
