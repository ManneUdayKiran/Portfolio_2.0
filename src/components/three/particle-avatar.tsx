"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface ParticleAvatarProps {
  onFormationComplete?: () => void;
}

export default function ParticleAvatar({
  onFormationComplete,
}: ParticleAvatarProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const [isFormed, setIsFormed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create particle system for forming "UDAY KIRAN"
  const { positions, targetPositions, colors, sizes } = useMemo(() => {
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Define text formation pattern for "UDAY KIRAN"
    const textPoints = [];

    // Create letter shapes using simple line patterns
    const letterShapes = {
      U: [
        [-1.5, 1],
        [-1.5, 0.5],
        [-1.5, 0],
        [-1.5, -0.5],
        [-1.5, -1],
        [-1.5, -1],
        [-1, -1],
        [-0.5, -1],
        [0, -1],
        [0, -1],
        [0, -0.5],
        [0, 0],
        [0, 0.5],
        [0, 1],
      ],
      D: [
        [-1.5, 1],
        [-1.5, 0.5],
        [-1.5, 0],
        [-1.5, -0.5],
        [-1.5, -1],
        [-1.5, 1],
        [-1, 1],
        [-0.5, 1],
        [-0.5, 1],
        [-0.5, 0.5],
        [-0.5, 0],
        [-0.5, -0.5],
        [-0.5, -1],
        [-1.5, -1],
        [-1, -1],
        [-0.5, -1],
      ],
      A: [
        [-1.5, -1],
        [-1.25, -0.5],
        [-1, 0],
        [-0.75, 0.5],
        [-0.5, 1],
        [-0.5, 1],
        [-0.25, 0.5],
        [0, 0],
        [0.25, -0.5],
        [0.5, -1],
        [-1, 0],
        [-0.5, 0],
        [0, 0],
      ],
      Y: [
        [-1, 1],
        [-0.5, 0.5],
        [0, 0],
        [1, 1],
        [0.5, 0.5],
        [0, 0],
        [0, 0],
        [0, -0.5],
        [0, -1],
      ],
      K: [
        [-1, 1],
        [-1, 0.5],
        [-1, 0],
        [-1, -0.5],
        [-1, -1],
        [-1, 0],
        [-0.5, 0.5],
        [0, 1],
        [-1, 0],
        [-0.5, -0.5],
        [0, -1],
      ],
      I: [
        [-0.5, 1],
        [0, 1],
        [0.5, 1],
        [0, 1],
        [0, 0.5],
        [0, 0],
        [0, -0.5],
        [0, -1],
        [-0.5, -1],
        [0, -1],
        [0.5, -1],
      ],
      R: [
        [-1, 1],
        [-1, 0.5],
        [-1, 0],
        [-1, -0.5],
        [-1, -1],
        [-1, 1],
        [-0.5, 1],
        [0, 1],
        [0, 1],
        [0, 0.5],
        [0, 0],
        [-1, 0],
        [-0.5, 0],
        [0, 0],
        [-1, 0],
        [-0.5, -0.5],
        [0, -1],
      ],
      N: [
        [-1, 1],
        [-1, 0.5],
        [-1, 0],
        [-1, -0.5],
        [-1, -1],
        [-1, 1],
        [-0.75, 0.5],
        [-0.5, 0],
        [-0.25, -0.5],
        [0, -1],
        [0, -1],
        [0, -0.5],
        [0, 0],
        [0, 0.5],
        [0, 1],
      ],
    };

    // Position letters to spell "UDAY KIRAN"
    const word1 = "UDAY";
    const word2 = "KIRAN";
    let particleIndex = 0;

    // First word "UDAY"
    for (let i = 0; i < word1.length; i++) {
      const letter = word1[i] as keyof typeof letterShapes;
      const letterPoints = letterShapes[letter] || [];
      const baseX = (i - word1.length / 2) * 3;
      const baseY = 1;

      letterPoints.forEach(([x, y]) => {
        if (particleIndex < particleCount) {
          targetPositions[particleIndex * 3] = baseX + x;
          targetPositions[particleIndex * 3 + 1] = baseY + y;
          targetPositions[particleIndex * 3 + 2] = 0;
          particleIndex++;
        }
      });
    }

    // Second word "KIRAN"
    for (let i = 0; i < word2.length; i++) {
      const letter = word2[i] as keyof typeof letterShapes;
      const letterPoints = letterShapes[letter] || [];
      const baseX = (i - word2.length / 2) * 3;
      const baseY = -1.5;

      letterPoints.forEach(([x, y]) => {
        if (particleIndex < particleCount) {
          targetPositions[particleIndex * 3] = baseX + x;
          targetPositions[particleIndex * 3 + 1] = baseY + y;
          targetPositions[particleIndex * 3 + 2] = 0;
          particleIndex++;
        }
      });
    }

    // Fill remaining particles around the text for extra glow effect
    for (let i = particleIndex; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 8 + Math.random() * 4;
      targetPositions[i * 3] = Math.cos(angle) * radius;
      targetPositions[i * 3 + 1] = Math.sin(angle) * radius;
      targetPositions[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    // Initialize particles at random scattered positions
    for (let i = 0; i < particleCount; i++) {
      // Start scattered
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      // Color variations - cyan to purple gradient
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        colors[i * 3] = 0.0; // R
        colors[i * 3 + 1] = 1.0; // G (cyan)
        colors[i * 3 + 2] = 1.0; // B
      } else if (colorChoice < 0.6) {
        colors[i * 3] = 0.5; // R
        colors[i * 3 + 1] = 0.0; // G (purple)
        colors[i * 3 + 2] = 1.0; // B
      } else {
        colors[i * 3] = 1.0; // R (white/pink)
        colors[i * 3 + 1] = 0.5; // G
        colors[i * 3 + 2] = 1.0; // B
      }

      // Size variations
      sizes[i] = Math.random() * 0.5 + 0.2;
    }

    return { positions, targetPositions, colors, sizes };
  }, []);

  // Mouse movement handler for parallax effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    const time = state.clock.elapsedTime;
    const geometry = particlesRef.current.geometry;
    const positionsArray = geometry.attributes.position.array as Float32Array;
    const sizesArray = geometry.attributes.size.array as Float32Array;

    let allFormed = true;

    for (let i = 0; i < positionsArray.length / 3; i++) {
      const i3 = i * 3;

      // Get current and target positions
      const currentX = positionsArray[i3];
      const currentY = positionsArray[i3 + 1];
      const currentZ = positionsArray[i3 + 2];

      let targetX = targetPositions[i3];
      let targetY = targetPositions[i3 + 1];
      let targetZ = targetPositions[i3 + 2];

      // Add mouse parallax effect when formed
      if (isFormed) {
        const distance = Math.sqrt(targetX * targetX + targetY * targetY);
        const parallaxStrength = Math.min(distance * 0.1, 1.0);
        targetX += mousePosition.x * parallaxStrength * 0.5;
        targetY += mousePosition.y * parallaxStrength * 0.5;
      }

      // Smooth movement towards target with easing
      const lerpSpeed = 0.02;
      const newX = THREE.MathUtils.lerp(currentX, targetX, lerpSpeed);
      const newY = THREE.MathUtils.lerp(currentY, targetY, lerpSpeed);
      const newZ = THREE.MathUtils.lerp(currentZ, targetZ, lerpSpeed);

      positionsArray[i3] = newX;
      positionsArray[i3 + 1] = newY;
      positionsArray[i3 + 2] = newZ;

      // Check if particle is close to target
      const distance = Math.sqrt(
        (newX - targetX) ** 2 + (newY - targetY) ** 2 + (newZ - targetZ) ** 2
      );

      if (distance > 0.5) {
        allFormed = false;
      }

      // Animate size and add floating effect when formed
      if (isFormed) {
        const baseSize = sizes[i];
        const floatEffect = Math.sin(time * 2 + i * 0.1) * 0.1;
        const breathEffect = Math.sin(time * 0.5) * 0.1;
        sizesArray[i] = baseSize + floatEffect + breathEffect;
      } else {
        sizesArray[i] = sizes[i];
      }
    }

    // Check if formation is complete
    if (allFormed && !isFormed) {
      setIsFormed(true);
      onFormationComplete?.();
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.size.needsUpdate = true;

    // Gentle rotation of the entire particle system
    if (isFormed) {
      particlesRef.current.rotation.z = Math.sin(time * 0.1) * 0.02;
    }
  });

  return (
    <group>
      {/* Particle System */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={sizes.length}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          map={(() => {
            // Create a glowing particle texture
            const canvas = document.createElement("canvas");
            canvas.width = 32;
            canvas.height = 32;
            const context = canvas.getContext("2d")!;
            const gradient = context.createRadialGradient(
              16,
              16,
              0,
              16,
              16,
              16
            );
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.2, "rgba(0,255,255,0.8)");
            gradient.addColorStop(0.4, "rgba(128,0,255,0.6)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, 32, 32);
            return new THREE.CanvasTexture(canvas);
          })()}
        />
      </points>

      {/* Ambient glow effect */}
      <pointLight
        position={[0, 0, 2]}
        color="#00ffff"
        intensity={isFormed ? 2 : 0}
        distance={10}
        decay={2}
      />

      <pointLight
        position={[0, 0, -2]}
        color="#8000ff"
        intensity={isFormed ? 1.5 : 0}
        distance={8}
        decay={2}
      />
    </group>
  );
}
