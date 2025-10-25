"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface FloatingProjectCardProps {
  project: {
    id: number;
    title: string;
    year: string;
    description: string;
    technologies: string[];
    color: string;
    category: string;
  };
  position: THREE.Vector3;
  onClose: () => void;
}

export default function FloatingProjectCard({
  project,
  position,
  onClose,
}: FloatingProjectCardProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Float animation
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.position.y = position.y + Math.sin(time * 2) * 0.1;
      groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Card background */}
      <RoundedBox args={[4, 5, 0.2]} radius={0.1}>
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={project.color}
          emissiveIntensity={0.1}
          roughness={0.4}
          metalness={0.6}
          transparent
          opacity={0.95}
        />
      </RoundedBox>

      {/* Glowing border */}
      <RoundedBox args={[4.1, 5.1, 0.15]} radius={0.12}>
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.5}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </RoundedBox>

      {/* Content */}
      <group position={[0, 0, 0.15]}>
        {/* Close button */}
        <mesh
          position={[1.6, 2.2, 0]}
          onClick={onClose}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          <circleGeometry args={[0.2, 32]} />
          <meshBasicMaterial color="#ff0000" />
        </mesh>
        <Text
          position={[1.6, 2.2, 0.01]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          ✕
        </Text>

        {/* Year badge */}
        <RoundedBox
          args={[0.8, 0.3, 0.05]}
          radius={0.05}
          position={[-1.3, 2, 0]}
        >
          <meshBasicMaterial color={project.color} />
        </RoundedBox>
        <Text
          position={[-1.3, 2, 0.03]}
          fontSize={0.15}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {project.year}
        </Text>

        {/* Category */}
        <Text
          position={[0, 1.7, 0]}
          fontSize={0.15}
          color={project.color}
          anchorX="center"
          anchorY="middle"
        >
          {project.category.toUpperCase()}
        </Text>

        {/* Title */}
        <Text
          position={[0, 1.3, 0]}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
          textAlign="center"
        >
          {project.title}
        </Text>

        {/* Description */}
        <Text
          position={[0, 0.5, 0]}
          fontSize={0.16}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          maxWidth={3.5}
          textAlign="center"
          lineHeight={1.3}
        >
          {project.description}
        </Text>

        {/* Technologies title */}
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.15}
          color={project.color}
          anchorX="center"
          anchorY="middle"
        >
          TECH STACK
        </Text>

        {/* Technologies */}
        <group position={[0, -1.2, 0]}>
          {project.technologies.slice(0, 4).map((tech, index) => {
            const xOffset = (index % 2) * 2 - 1;
            const yOffset = Math.floor(index / 2) * -0.4;
            return (
              <group key={tech} position={[xOffset * 0.9, yOffset, 0]}>
                <RoundedBox args={[1.5, 0.3, 0.05]} radius={0.05}>
                  <meshStandardMaterial
                    color="#1a1a1a"
                    emissive={project.color}
                    emissiveIntensity={0.2}
                  />
                </RoundedBox>
                <Text
                  position={[0, 0, 0.03]}
                  fontSize={0.12}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                >
                  {tech}
                </Text>
              </group>
            );
          })}
        </group>

        {/* Action button */}
        <group position={[0, -2.1, 0]}>
          <RoundedBox args={[2.5, 0.5, 0.1]} radius={0.05}>
            <meshStandardMaterial
              color={project.color}
              emissive={project.color}
              emissiveIntensity={0.5}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.18}
            color="black"
            anchorX="center"
            anchorY="middle"
          >
            VIEW PROJECT →
          </Text>
        </group>
      </group>

      {/* Spot light */}
      <spotLight
        position={[0, 3, 2]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color={project.color}
        castShadow
      />
    </group>
  );
}
