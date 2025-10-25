"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
  icon: string;
}

interface TechSphereProps {
  position?: [number, number, number];
  skills?: Skill[];
  onSkillHover?: (skill: Skill | null) => void;
}

// Individual orbiting skill component
function OrbitingSkill({
  skill,
  orbitRadius,
  speed,
  initialAngle,
  onHover,
}: {
  skill: Skill;
  orbitRadius: number;
  speed: number;
  initialAngle: number;
  onHover: (skill: Skill | null) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current && glowRef.current) {
      const time = clock.getElapsedTime();
      const angle = initialAngle + time * speed;

      // Orbital position
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      const y = Math.sin(angle * 0.5) * 0.5; // Slight vertical oscillation

      meshRef.current.position.set(x, y, z);
      glowRef.current.position.set(x, y, z);

      // Scale based on proficiency and hover
      const baseScale = 0.15 + (skill.level / 100) * 0.25;
      const hoverScale = hovered ? 1.3 : 1;
      const pulse = 1 + Math.sin(time * 3 + initialAngle) * 0.1;

      meshRef.current.scale.setScalar(baseScale * hoverScale * pulse);
      glowRef.current.scale.setScalar(baseScale * hoverScale * pulse * 2);

      // Look at center
      meshRef.current.lookAt(0, 0, 0);
    }
  });

  return (
    <group>
      {/* Main skill sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => {
          setHovered(true);
          onHover(skill);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          emissive={skill.color}
          emissiveIntensity={skill.level / 300}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={skill.level / 500}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Skill icon/text (appears on hover) */}
      {hovered && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.4}
          color="white"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {skill.icon} {skill.name}
        </Text>
      )}
    </group>
  );
}

export default function TechSphere({
  position = [0, 0, 0],
  skills = [],
  onSkillHover,
}: TechSphereProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  // Group skills by proficiency levels (orbital distances)
  const skillOrbits = useMemo(() => {
    const orbits = [
      { range: [95, 100], radius: 2.5, color: "#ffd700", speed: 0.3 }, // Core - Gold
      { range: [85, 94], radius: 4.0, color: "#00bcd4", speed: 0.25 }, // Advanced - Cyan
      { range: [75, 84], radius: 5.8, color: "#9c27b0", speed: 0.2 }, // Intermediate - Purple
      { range: [65, 74], radius: 7.5, color: "#4caf50", speed: 0.15 }, // Learning - Green
    ];

    return orbits.map((orbit) => ({
      ...orbit,
      skills: skills.filter(
        (skill) =>
          skill.level >= orbit.range[0] && skill.level <= orbit.range[1]
      ),
    }));
  }, [skills]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Gentle rotation of entire system
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }

    if (coreRef.current) {
      // Pulsing core
      const pulse = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      coreRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <>
      {/* Orbit controls for interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        zoomSpeed={0.6}
        rotateSpeed={0.5}
        minDistance={6}
        maxDistance={20}
        autoRotate={false}
      />

      <group ref={groupRef} position={position}>
        {/* Central core (sun) */}
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshStandardMaterial
            color="#ffd700"
            emissive="#ffaa00"
            emissiveIntensity={0.5}
            metalness={0.1}
            roughness={0.1}
          />
        </mesh>

        {/* Core glow */}
        <mesh scale={2}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <meshBasicMaterial
            color="#ffd700"
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Orbital rings */}
        {skillOrbits.map((orbit, orbitIndex) => (
          <group key={orbitIndex}>
            {/* Orbital ring visualization */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry
                args={[orbit.radius - 0.05, orbit.radius + 0.05, 64]}
              />
              <meshBasicMaterial
                color={orbit.color}
                transparent
                opacity={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* Orbiting skills */}
            {orbit.skills.map((skill, skillIndex) => (
              <OrbitingSkill
                key={skill.name}
                skill={skill}
                orbitRadius={orbit.radius}
                speed={orbit.speed}
                initialAngle={(skillIndex / orbit.skills.length) * Math.PI * 2}
                onHover={onSkillHover || (() => {})}
              />
            ))}
          </group>
        ))}

        {/* Background particle field */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={
                new Float32Array(
                  Array.from({ length: 150 }, () => [
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 30,
                  ]).flat()
                )
              }
              count={150}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#60a5fa"
            transparent
            opacity={0.4}
            sizeAttenuation
          />
        </points>

        {/* Nebula effects */}
        <mesh position={[8, 3, -5]} rotation={[0.3, 0.5, 0]}>
          <planeGeometry args={[12, 8]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        <mesh position={[-6, -2, 4]} rotation={[0.8, -0.3, 0.2]}>
          <planeGeometry args={[10, 6]} />
          <meshBasicMaterial
            color="#06b6d4"
            transparent
            opacity={0.03}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </>
  );
}
