"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  category: string;
  gradient: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  autoRotate?: boolean;
  onHoverChange?: (isHovered: boolean, hoveredIndex?: number) => void;
}

function ProjectPanel({
  project,
  position,
  rotation,
  onClick,
  isActive,
  onHover,
  onHoverEnd,
}: {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: () => void;
  isActive: boolean;
  onHover: () => void;
  onHoverEnd: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
    onHover();
  };

  const handlePointerOut = () => {
    setHovered(false);
    onHoverEnd();
  };

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating when hovered
      const floatY = hovered
        ? position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1
        : position[1];
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        floatY,
        0.1
      );
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <RoundedBox
        ref={meshRef}
        args={[3, 4, 0.1]}
        radius={0.1}
        smoothness={4}
        onClick={onClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          color={hovered || isActive ? "#00ffff" : "#1a1a2e"}
          metalness={0.8}
          roughness={0.2}
          emissive={hovered || isActive ? "#00ffff" : "#000000"}
          emissiveIntensity={hovered || isActive ? 0.6 : 0}
        />
      </RoundedBox>

      <RoundedBox
        args={[3.02, 4.02, 0.05]}
        radius={0.1}
        smoothness={4}
        position={[0, 0, 0.06]}
      >
        <meshPhysicalMaterial
          color="#000000"
          transmission={0.8}
          thickness={0.5}
          roughness={0.1}
          transparent
          opacity={0.3}
        />
      </RoundedBox>

      <Text position={[0, 1.2, 0.1]} fontSize={0.8} color="#00ffff" anchorX="center" anchorY="middle">
        {project.image}
      </Text>

      <Text
        position={[0, 0.3, 0.1]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.5}
        textAlign="center"
      >
        {project.title}
      </Text>

      <Text
        position={[0, -0.3, 0.1]}
        fontSize={0.15}
        color="#888888"
        anchorX="center"
        anchorY="middle"
      >
        {project.technologies.length} Technologies
      </Text>

      {hovered && (
        <Text
          position={[0, -1.5, 0.1]}
          fontSize={0.12}
          color="#00ffff"
          anchorX="center"
          anchorY="middle"
        >
          Click to view details
        </Text>
      )}

      {(hovered || isActive) && (
        <mesh position={[0, 0, 0]}>
          <ringGeometry args={[2.3, 2.4, 32]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.6} />
        </mesh>
      )}

      <pointLight
        position={[0, 0, 1]}
        color="#00ffff"
        intensity={hovered || isActive ? 2 : 0.5}
        distance={5}
      />
    </group>
  );
}

export default function ProjectCarousel({
  projects,
  onProjectClick,
  autoRotate = true,
  onHoverChange,
}: ProjectCarouselProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [targetRotation, setTargetRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [carouselHovered, setCarouselHovered] = useState(false);
  const radius = 6;
  const angleStep = (Math.PI * 2) / projects.length;

  // Hover logic
  const handleCardHover = (index: number) => {
    setHoveredIndex(index);
    setCarouselHovered(true);
    if (onHoverChange) onHoverChange(true, index);
    // Rotate to face hovered card
    setTargetRotation(index * angleStep);
  };

  const handleCardHoverEnd = () => {
    setHoveredIndex(null);
    setCarouselHovered(false);
    if (onHoverChange) onHoverChange(false);
  };

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    let nextRotation = targetRotation;

    // Only rotate if not hovered or dragging
    if (autoRotate && !carouselHovered && !isDragging) {
      nextRotation += delta * 0.2; // slow, cinematic rotation
      setTargetRotation(nextRotation);
    }

    // Smooth lerp rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      nextRotation,
      carouselHovered ? 0.08 : 0.03
    );
  });

  const handleProjectClick = (index: number) => {
    setTargetRotation(index * angleStep);
    setTimeout(() => {
      onProjectClick(projects[index]);
    }, 400);
  };

  const handlePointerDown = () => setIsDragging(true);
  const handlePointerUp = () => setIsDragging(false);
  const handlePointerMove = (e: any) => {
    if (isDragging) {
      setTargetRotation((prev) => prev + e.movementX * 0.01);
    }
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {projects.map((project, index) => {
        const angle = index * angleStep;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        return (
          <ProjectPanel
            key={project.id}
            project={project}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
            onClick={() => handleProjectClick(index)}
            isActive={hoveredIndex === index}
            onHover={() => handleCardHover(index)}
            onHoverEnd={handleCardHoverEnd}
          />
        );
      })}

      {/* Glowing ring base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
        <ringGeometry args={[radius - 0.5, radius + 0.5, 64]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.2}
          metalness={1}
          roughness={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>

      <pointLight position={[0, 0, 0]} color="#00ffff" intensity={1} distance={20} />
    </group>
  );
}
