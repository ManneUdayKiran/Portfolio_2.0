"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleNetworkProps {
  count?: number;
  connectionDistance?: number;
}

export default function ParticleNetwork({
  count = 100,
  connectionDistance = 3,
}: ParticleNetworkProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate particle positions
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, [count]);

  const particleVelocities = useMemo(() => {
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return velocities;
  }, [count]);

  useFrame(() => {
    if (!particlesRef.current || !linesRef.current) return;

    const positions = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    const linePositions: number[] = [];

    // Update particle positions
    for (let i = 0; i < count; i++) {
      positions[i * 3] += particleVelocities[i * 3];
      positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
      positions[i * 3 + 2] += particleVelocities[i * 3 + 2];

      // Boundary check
      if (Math.abs(positions[i * 3]) > 15) particleVelocities[i * 3] *= -1;
      if (Math.abs(positions[i * 3 + 1]) > 15)
        particleVelocities[i * 3 + 1] *= -1;
      if (Math.abs(positions[i * 3 + 2]) > 15)
        particleVelocities[i * 3 + 2] *= -1;
    }

    // Create connections
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < connectionDistance) {
          linePositions.push(
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2]
          );
          linePositions.push(
            positions[j * 3],
            positions[j * 3 + 1],
            positions[j * 3 + 2]
          );
        }
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Update lines
    const lineGeometry = linesRef.current.geometry;
    lineGeometry.setFromPoints(
      linePositions.reduce((acc: THREE.Vector3[], val, i) => {
        if (i % 3 === 0) {
          acc.push(
            new THREE.Vector3(val, linePositions[i + 1], linePositions[i + 2])
          );
        }
        return acc;
      }, [])
    );
  });

  return (
    <group>
      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particlePositions}
            itemSize={3}
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#00ffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
