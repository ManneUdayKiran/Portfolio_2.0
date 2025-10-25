"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface ProjectScreenProps {
  project: {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    color: string;
  };
  position: [number, number, number];
  rotation?: [number, number, number];
  onEnter: (projectId: number) => void;
}

export default function ProjectScreen({
  project,
  position,
  rotation = [0, 0, 0],
  onEnter,
}: ProjectScreenProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Glow animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();

      // Subtle floating
      groupRef.current.position.y =
        position[1] + Math.sin(time + project.id) * 0.05;

      // Pulse intensity when hovered
      if (hovered) {
        const pulse = Math.sin(time * 3) * 0.2 + 0.8;
        groupRef.current.scale.setScalar(pulse);
      } else {
        groupRef.current.scale.setScalar(1);
      }
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleClick = () => {
    onEnter(project.id);
  };

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Screen frame */}
      <RoundedBox
        args={[6, 4, 0.2]}
        radius={0.1}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <meshStandardMaterial
          color="#1a1a1a"
          roughness={0.3}
          metalness={0.8}
          emissive={project.color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </RoundedBox>

      {/* Glowing border */}
      <RoundedBox args={[6.2, 4.2, 0.15]} radius={0.12}>
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={hovered ? 0.8 : 0.3}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>

      {/* Screen content */}
      <group position={[0, 0, 0.15]}>
        {/* Project number */}
        <Text
          position={[-2.5, 1.5, 0]}
          fontSize={0.3}
          color={project.color}
          anchorX="left"
          anchorY="top"
        >
          {`PROJECT_${project.id.toString().padStart(2, "0")}`}
        </Text>

        {/* Title */}
        <Text
          position={[0, 0.8, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
        >
          {project.title}
        </Text>

        {/* Description */}
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.18}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
          lineHeight={1.2}
        >
          {project.description}
        </Text>

        {/* Technologies */}
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.15}
          color={project.color}
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
        >
          {project.technologies.join(" • ")}
        </Text>

        {/* Enter button */}
        {hovered && (
          <group position={[0, -1.3, 0]}>
            <RoundedBox args={[2, 0.4, 0.1]} radius={0.05}>
              <meshStandardMaterial
                color={project.color}
                emissive={project.color}
                emissiveIntensity={1}
              />
            </RoundedBox>
            <Text
              position={[0, 0, 0.06]}
              fontSize={0.18}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              ENTER PROJECT ROOM →
            </Text>
          </group>
        )}
      </group>

      {/* Spotlight from above */}
      {hovered && (
        <spotLight
          position={[0, 3, 2]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color={project.color}
          castShadow
        />
      )}

      {/* Point light glow */}
      <pointLight
        position={[0, 0, 0.5]}
        color={project.color}
        intensity={hovered ? 2 : 0.5}
        distance={5}
      />

      {/* Particle effects when hovered */}
      {hovered && (
        <>
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 3.5;
            return (
              <mesh
                key={i}
                position={[
                  Math.cos(angle) * radius,
                  Math.sin(angle) * radius,
                  0.3,
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshBasicMaterial
                  color={project.color}
                  transparent
                  opacity={0.8}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>
            );
          })}
        </>
      )}
    </group>
  );
}
