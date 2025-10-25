"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import Sparkles from "./sparkles";

interface FloatingBlobProps {
  position?: [number, number, number];
}

export default function FloatingBlob({
  position = [0, 0, 0],
}: FloatingBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);

  // Create complex noise-displaced sphere geometry for realistic blob
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.8, 64, 64);
    const positionAttribute = geo.getAttribute("position");
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);

      // Multi-layered noise for more organic, realistic shape
      const noise1 = Math.sin(vertex.x * 1.5) * Math.cos(vertex.y * 1.8) * 0.2;
      const noise2 = Math.sin(vertex.y * 2.2) * Math.cos(vertex.z * 2.5) * 0.15;
      const noise3 = Math.sin(vertex.z * 1.8) * Math.cos(vertex.x * 2.1) * 0.12;
      const noise4 = Math.sin(vertex.length() * 3) * 0.08;

      // Combine different noise patterns for realistic blob shape
      const totalNoise = noise1 + noise2 + noise3 + noise4;

      vertex.normalize().multiplyScalar(1.8 + totalNoise);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Inner core geometry for depth
  const innerGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1.2, 32, 32);
    const positionAttribute = geo.getAttribute("position");
    const vertex = new THREE.Vector3();

    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);

      const noise = Math.sin(vertex.x * 3) * Math.cos(vertex.y * 3) * 0.1;
      vertex.normalize().multiplyScalar(1.2 + noise);
      positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current && innerMeshRef.current) {
      const time = state.clock.elapsedTime;

      // Simple rotation and pulsing animation
      meshRef.current.rotation.x = time * 0.08;
      meshRef.current.rotation.y = time * 0.12;
      innerMeshRef.current.rotation.x = -time * 0.05;
      innerMeshRef.current.rotation.y = time * 0.07;

      const pulse = 1 + Math.sin(time * 0.8) * 0.03;
      const secondaryPulse = 1 + Math.cos(time * 1.2) * 0.02;
      meshRef.current.scale.setScalar(pulse);
      innerMeshRef.current.scale.setScalar(secondaryPulse);
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={1.2}
      floatingRange={[-0.8, 0.8]}
    >
      <group position={position}>
        {/* Main glassmorphism blob */}
        <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
          <MeshTransmissionMaterial
            backside
            backsideThickness={3}
            thickness={2}
            transmission={0.95}
            ior={1.2}
            chromaticAberration={0.1}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.5}
            temporalDistortion={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            color="#60a5fa"
            attenuationColor="#3b82f6"
            attenuationDistance={2}
          />
        </mesh>

        {/* Inner glowing core with enhanced emissive */}
        <mesh ref={innerMeshRef} geometry={innerGeometry}>
          <meshStandardMaterial
            color="#7c3aed"
            transparent
            opacity={0.4}
            emissive="#8b5cf6"
            emissiveIntensity={0.8}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>

        {/* Additional glow effect layers */}
        <mesh geometry={geometry} scale={1.05}>
          <meshBasicMaterial
            color="#60a5fa"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Outer emissive glow */}
        <mesh geometry={geometry} scale={1.2}>
          <meshBasicMaterial
            color="#3b82f6"
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Far glow for atmospheric effect */}
        <mesh geometry={geometry} scale={1.4}>
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.04}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Rotating sparkles around the blob */}
        <Sparkles count={25} radius={2.8} speed={1.2} />
      </group>
    </Float>
  );
}
