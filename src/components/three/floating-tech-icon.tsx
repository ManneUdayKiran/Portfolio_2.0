"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingTechIconProps {
  skill: {
    name: string;
    level: number;
    color: string;
    category: string;
    icon: string;
  };
  position: [number, number, number];
  index: number;
  onHover: (skill: any) => void;
  onLeave: () => void;
}

export default function FloatingTechIcon({
  skill,
  position,
  index,
  onHover,
  onLeave,
}: FloatingTechIconProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Floating animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();

      // Floating up and down
      meshRef.current.position.y =
        position[1] + Math.sin(time * 0.5 + index * 0.5) * 0.3;

      // Gentle rotation
      meshRef.current.rotation.y = time * 0.3 + index;

      // Scale pulse when hovered
      if (hovered) {
        meshRef.current.scale.setScalar(1.5 + Math.sin(time * 3) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    onHover(skill);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    onLeave();
    document.body.style.cursor = "auto";
  };

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Holographic card base */}
      <RoundedBox args={[2, 2.5, 0.1]} radius={0.1}>
        <meshStandardMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 0.8 : 0.4}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.8 : 0.3}
          side={THREE.DoubleSide}
        />
      </RoundedBox>

      {/* Neon glow outline */}
      <RoundedBox args={[2.1, 2.6, 0.15]} radius={0.12}>
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered ? 0.6 : 0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>

      {/* Icon text */}
      <Text
        position={[0, 0.4, 0.06]}
        fontSize={0.8}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {skill.icon}
      </Text>

      {/* Skill name */}
      <Text
        position={[0, -0.3, 0.06]}
        fontSize={0.25}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {skill.name}
      </Text>

      {/* Proficiency level */}
      <Text
        position={[0, -0.7, 0.06]}
        fontSize={0.2}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
      >
        {skill.level}%
      </Text>

      {/* Particle glow effect when hovered */}
      {hovered && (
        <>
          <pointLight
            position={[0, 0, 0.5]}
            color={skill.color}
            intensity={2}
            distance={3}
          />

          {/* Rotating ring */}
          <mesh rotation={[0, 0, 0]}>
            <torusGeometry args={[1.3, 0.02, 16, 100]} />
            <meshBasicMaterial
              color={skill.color}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </>
      )}
    </group>
  );
}
