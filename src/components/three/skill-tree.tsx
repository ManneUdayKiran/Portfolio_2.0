"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface SkillNode {
  id: string;
  name: string;
  level: number;
  position: [number, number, number];
  connections: string[];
  category: "frontend" | "backend" | "database" | "tools" | "languages";
  projects: string[];
  unlocked: boolean;
  description: string;
}

interface SkillTreeProps {
  onNodeHover?: (node: SkillNode | null) => void;
}

const skillNodes: SkillNode[] = [
  // Core/Beginner Level
  {
    id: "html",
    name: "HTML",
    level: 1,
    position: [0, 0, 0],
    connections: ["css", "javascript"],
    category: "frontend",
    projects: ["Portfolio Website", "Landing Pages"],
    unlocked: true,
    description: "The foundation of web development",
  },
  {
    id: "css",
    name: "CSS",
    level: 1,
    position: [-3, 1, 0],
    connections: ["tailwind", "scss"],
    category: "frontend",
    projects: ["Responsive Designs", "Animation Projects"],
    unlocked: true,
    description: "Styling and layout mastery",
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 1,
    position: [3, 1, 0],
    connections: ["typescript", "react", "nodejs"],
    category: "languages",
    projects: ["Interactive Websites", "Web Apps"],
    unlocked: true,
    description: "The language that powers the web",
  },

  // Frontend Branch
  {
    id: "tailwind",
    name: "Tailwind",
    level: 2,
    position: [-6, 3, 0],
    connections: ["react"],
    category: "frontend",
    projects: ["Modern UI Components", "Dashboard Designs"],
    unlocked: true,
    description: "Utility-first CSS framework",
  },
  {
    id: "scss",
    name: "SCSS",
    level: 2,
    position: [-4, 4, 0],
    connections: ["css"],
    category: "frontend",
    projects: ["Component Styling", "Theme Systems"],
    unlocked: true,
    description: "CSS with superpowers",
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: 2,
    position: [4, 3, 0],
    connections: ["react", "nodejs", "nextjs"],
    category: "languages",
    projects: ["Type-safe Applications", "Large Scale Projects"],
    unlocked: true,
    description: "JavaScript with static typing",
  },
  {
    id: "react",
    name: "React",
    level: 2,
    position: [0, 4, 0],
    connections: ["nextjs", "redux", "three"],
    category: "frontend",
    projects: ["Dynamic UIs", "Component Libraries"],
    unlocked: true,
    description: "The most popular UI library",
  },

  // Advanced Frontend
  {
    id: "nextjs",
    name: "Next.js",
    level: 3,
    position: [0, 6, 0],
    connections: ["react"],
    category: "frontend",
    projects: ["Full-stack Apps", "SSR Applications"],
    unlocked: true,
    description: "React framework for production",
  },
  {
    id: "redux",
    name: "Redux",
    level: 3,
    position: [-3, 6, 0],
    connections: ["react"],
    category: "frontend",
    projects: ["State Management", "Complex Apps"],
    unlocked: true,
    description: "Predictable state management",
  },
  {
    id: "three",
    name: "Three.js",
    level: 3,
    position: [4, 5, 0],
    connections: ["react"],
    category: "frontend",
    projects: ["3D Experiences", "Interactive Graphics"],
    unlocked: true,
    description: "3D graphics for the web",
  },

  // Backend Branch
  {
    id: "nodejs",
    name: "Node.js",
    level: 2,
    position: [5, 2, 0],
    connections: ["express", "mongodb", "postgresql"],
    category: "backend",
    projects: ["REST APIs", "Backend Services"],
    unlocked: true,
    description: "JavaScript runtime for servers",
  },
  {
    id: "express",
    name: "Express",
    level: 3,
    position: [6, 4, 0],
    connections: ["nodejs"],
    category: "backend",
    projects: ["Web APIs", "Microservices"],
    unlocked: true,
    description: "Fast web framework for Node.js",
  },

  // Database Branch
  {
    id: "mongodb",
    name: "MongoDB",
    level: 3,
    position: [7, 3, 1],
    connections: ["nodejs"],
    category: "database",
    projects: ["Document Stores", "Real-time Apps"],
    unlocked: true,
    description: "NoSQL document database",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    level: 3,
    position: [8, 5, 0],
    connections: ["nodejs"],
    category: "database",
    projects: ["Relational Data", "Complex Queries"],
    unlocked: true,
    description: "Advanced relational database",
  },

  // Tools Branch
  {
    id: "git",
    name: "Git",
    level: 1,
    position: [0, -3, 0],
    connections: ["github"],
    category: "tools",
    projects: ["Version Control", "Collaboration"],
    unlocked: true,
    description: "Distributed version control",
  },
  {
    id: "github",
    name: "GitHub",
    level: 2,
    position: [2, -3, 0],
    connections: ["git"],
    category: "tools",
    projects: ["Open Source", "CI/CD Pipelines"],
    unlocked: true,
    description: "Code hosting and collaboration",
  },
];

const categoryColors = {
  frontend: "#61dafb", // React blue
  backend: "#68d391", // Green
  database: "#f6ad55", // Orange
  tools: "#9f7aea", // Purple
  languages: "#fc8181", // Red
};

export default function SkillTree({ onNodeHover }: SkillTreeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Create connection lines
  const connections = useMemo(() => {
    const lines: {
      start: [number, number, number];
      end: [number, number, number];
      color: string;
    }[] = [];

    skillNodes.forEach((node) => {
      node.connections.forEach((connectionId) => {
        const connectedNode = skillNodes.find((n) => n.id === connectionId);
        if (connectedNode) {
          lines.push({
            start: node.position,
            end: connectedNode.position,
            color: categoryColors[node.category],
          });
        }
      });
    });

    return lines;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Gentle floating animation for the entire tree
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.2) * 0.1;
    }
  });

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(selectedNode === nodeId ? null : nodeId);
  };

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    const node = nodeId ? skillNodes.find((n) => n.id === nodeId) : null;
    onNodeHover?.(node || null);
  };

  return (
    <group ref={groupRef}>
      {/* Connection Lines */}
      {connections.map((connection, index) => (
        <group key={`connection-${index}`}>
          <mesh>
            <tubeGeometry
              args={[
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(...connection.start),
                  new THREE.Vector3(...connection.end),
                ]),
                20,
                0.02,
                8,
                false,
              ]}
            />
            <meshBasicMaterial
              color={connection.color}
              transparent
              opacity={0.6}
              blending={THREE.AdditiveBlending}
            />
          </mesh>

          {/* Glowing effect for connections */}
          <mesh>
            <tubeGeometry
              args={[
                new THREE.CatmullRomCurve3([
                  new THREE.Vector3(...connection.start),
                  new THREE.Vector3(...connection.end),
                ]),
                20,
                0.04,
                8,
                false,
              ]}
            />
            <meshBasicMaterial
              color={connection.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}

      {/* Skill Nodes */}
      {skillNodes.map((node) => {
        const isHovered = hoveredNode === node.id;
        const isSelected = selectedNode === node.id;
        const nodeColor = categoryColors[node.category];
        const scale = isHovered ? 1.3 : isSelected ? 1.2 : 1.0;
        const glowIntensity = isHovered ? 2.0 : isSelected ? 1.5 : 1.0;

        return (
          <group key={node.id} position={node.position}>
            {/* Node Core */}
            <mesh
              scale={[scale, scale, scale]}
              onClick={() => handleNodeClick(node.id)}
              onPointerEnter={() => handleNodeHover(node.id)}
              onPointerLeave={() => handleNodeHover(null)}
            >
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial
                color={node.unlocked ? nodeColor : "#666666"}
                transparent
                opacity={node.unlocked ? 0.8 : 0.3}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Node Glow */}
            <mesh scale={[scale * 1.2, scale * 1.2, scale * 1.2]}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={node.unlocked ? 0.3 : 0.1}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Outer Glow Ring */}
            <mesh scale={[scale * 1.5, scale * 1.5, scale * 1.5]}>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshBasicMaterial
                color={nodeColor}
                transparent
                opacity={node.unlocked ? 0.15 : 0.05}
                blending={THREE.AdditiveBlending}
              />
            </mesh>

            {/* Point Light for Glow */}
            <pointLight
              color={nodeColor}
              intensity={glowIntensity}
              distance={3}
              decay={2}
            />

            {/* Node Label */}
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.2}
              color={node.unlocked ? "#ffffff" : "#888888"}
              anchorX="center"
              anchorY="middle"
            >
              {node.name}
            </Text>

            {/* Level Indicator */}
            <Text
              position={[0, 0.6, 0]}
              fontSize={0.15}
              color={nodeColor}
              anchorX="center"
              anchorY="middle"
            >
              LV.{node.level}
            </Text>

            {/* Expanded Info on Hover/Select */}
            {(isHovered || isSelected) && (
              <group position={[0, 1.2, 0]}>
                <mesh>
                  <planeGeometry args={[3, 1.5]} />
                  <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.8}
                  />
                </mesh>

                <Text
                  position={[0, 0.3, 0.01]}
                  fontSize={0.12}
                  color="#ffffff"
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={2.8}
                >
                  {node.description}
                </Text>

                <Text
                  position={[0, 0, 0.01]}
                  fontSize={0.1}
                  color={nodeColor}
                  anchorX="center"
                  anchorY="middle"
                  maxWidth={2.8}
                >
                  Projects: {node.projects.join(", ")}
                </Text>

                <Text
                  position={[0, -0.3, 0.01]}
                  fontSize={0.08}
                  color="#cccccc"
                  anchorX="center"
                  anchorY="middle"
                >
                  Category: {node.category.toUpperCase()}
                </Text>
              </group>
            )}

            {/* Unlock Animation Particles */}
            {node.unlocked && (isHovered || isSelected) && (
              <group>
                {Array.from({ length: 8 }).map((_, i) => (
                  <mesh
                    key={i}
                    position={[
                      Math.cos((i / 8) * Math.PI * 2) * 0.8,
                      Math.sin((i / 8) * Math.PI * 2) * 0.8,
                      0,
                    ]}
                  >
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial
                      color={nodeColor}
                      transparent
                      opacity={0.8}
                      blending={THREE.AdditiveBlending}
                    />
                  </mesh>
                ))}
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}
