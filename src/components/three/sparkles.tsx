"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SparklesProps {
  count?: number;
  radius?: number;
  speed?: number;
}

export default function Sparkles({
  count = 20,
  radius = 3,
  speed = 1,
}: SparklesProps) {
  const sparklesRef = useRef<THREE.Group>(null);

  const sparkles = useMemo(() => {
    const sparkleData = [];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      sparkleData.push({
        position: [x, y, z] as [number, number, number],
        scale: Math.random() * 0.3 + 0.2,
        color: new THREE.Color().setHSL(
          0.55 + Math.random() * 0.2,
          0.9,
          0.6 + Math.random() * 0.4
        ),
        orbitSpeed: (Math.random() - 0.5) * 0.3,
        orbitRadius: radius + Math.random() * 0.8,
        initialAngle: Math.random() * Math.PI * 2,
      });
    }

    return sparkleData;
  }, [count, radius]);

  useFrame((state) => {
    if (sparklesRef.current) {
      sparklesRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3;
      sparklesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

      sparklesRef.current.children.forEach((child, index) => {
        const sparkle = sparkles[index];
        if (child && sparkle) {
          const time = state.clock.elapsedTime * speed;
          const angle = sparkle.initialAngle + time * sparkle.orbitSpeed;

          const x = sparkle.orbitRadius * Math.cos(angle);
          const z = sparkle.orbitRadius * Math.sin(angle);
          const y = Math.sin(time * 2 + sparkle.initialAngle) * 0.5;

          child.position.set(x, y, z);

          const pulse = 1 + Math.sin(time * 3 + sparkle.initialAngle) * 0.2;
          child.scale.setScalar(sparkle.scale * pulse);
        }
      });
    }
  });

  return (
    <group ref={sparklesRef}>
      {sparkles.map((sparkle, index) => (
        <group key={index} position={sparkle.position}>
          <mesh>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshBasicMaterial
              color={sparkle.color}
              transparent
              opacity={0.8}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.06, 6, 6]} />
            <meshBasicMaterial
              color={sparkle.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
