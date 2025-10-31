"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GalleryRoomProps {
  children?: React.ReactNode;
}

export default function GalleryRoom({ children }: GalleryRoomProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Room dimensions
  const roomWidth = 30;
  const roomHeight = 10;
  const roomDepth = 30;

  // Create glowing floor grid
  const floorGrid = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(roomWidth, roomDepth, 30, 30);
    const material = new THREE.MeshStandardMaterial({
      color: "#111111",
      wireframe: false,
      emissive: "#00ffff",
      emissiveIntensity: 0.1,
    });
    return { geometry, material };
  }, [roomWidth, roomDepth]);

  // Create neon grid lines on floor
  const gridLines = useMemo(() => {
    const lines: React.ReactElement[] = [];
    const divisions = 30;
    const step = roomWidth / divisions;

    // Vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = -roomWidth / 2 + i * step;
      const points = [
        new THREE.Vector3(x, 0.01, -roomDepth / 2),
        new THREE.Vector3(x, 0.01, roomDepth / 2),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: "#00ffff",
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geometry, material);
      lines.push(
        <primitive object={line} key={`floor-v-${i}`} />
      );
    }

    // Horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const z = -roomDepth / 2 + i * step;
      const points = [
        new THREE.Vector3(-roomWidth / 2, 0.01, z),
        new THREE.Vector3(roomWidth / 2, 0.01, z),
      ];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);

      const material = new THREE.LineBasicMaterial({
        color: "#00ffff",
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geometry, material);
      lines.push(
        <primitive object={line} key={`floor-h-${i}`} />
      );
    }

    return lines;
  }, [roomWidth, roomDepth]);

  // Animate subtle pulsing
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          const material = child.material as THREE.LineBasicMaterial;
          material.opacity = 0.2 + Math.sin(time * 0.5 + i * 0.1) * 0.1;
        }
      });
    }
  });

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.8}
          metalness={0.2}
          emissive="#001a1a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Glowing grid lines */}
      <group ref={groupRef}>{gridLines}</group>

      {/* Walls with neon trim */}
      {/* Back wall */}
      <mesh position={[0, roomHeight / 2, -roomDepth / 2]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial
          color="#0f0f0f"
          emissive="#001a1a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Left wall */}
      <mesh
        position={[-roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial
          color="#0f0f0f"
          emissive="#001a1a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Right wall */}
      <mesh
        position={[roomWidth / 2, roomHeight / 2, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial
          color="#0f0f0f"
          emissive="#001a1a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Ceiling with subtle lighting */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive="#000a0a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Neon edge lighting strips */}
      {/* Floor edges */}
      <mesh position={[0, 0.05, -roomDepth / 2]}>
        <boxGeometry args={[roomWidth, 0.1, 0.1]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.05, roomDepth / 2]}>
        <boxGeometry args={[roomWidth, 0.1, 0.1]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-roomWidth / 2, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.1, roomDepth]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      <mesh position={[roomWidth / 2, 0.05, 0]}>
        <boxGeometry args={[0.1, 0.1, roomDepth]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>

      {/* Ambient point lights */}
      <pointLight
        position={[0, 8, 0]}
        color="#00ffff"
        intensity={0.5}
        distance={20}
      />
      <pointLight
        position={[-10, 5, -10]}
        color="#ff00ff"
        intensity={0.3}
        distance={15}
      />
      <pointLight
        position={[10, 5, -10]}
        color="#00ff00"
        intensity={0.3}
        distance={15}
      />
      <pointLight
        position={[-10, 5, 10]}
        color="#ffff00"
        intensity={0.3}
        distance={15}
      />
      <pointLight
        position={[10, 5, 10]}
        color="#ff0080"
        intensity={0.3}
        distance={15}
      />

      {children}
    </group>
  );
}
