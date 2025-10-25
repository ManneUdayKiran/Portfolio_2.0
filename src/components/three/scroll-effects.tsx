"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useLenisScroll } from "@/hooks/use-lenis";
import * as THREE from "three";

export function ScrollCamera() {
  const { scrollProgress } = useLenisScroll();
  const cameraRef = useRef<THREE.Camera | null>(null);

  useFrame(({ camera }) => {
    if (!cameraRef.current) {
      cameraRef.current = camera;
    }

    // Smooth camera movement based on scroll
    const targetY = scrollProgress * 10; // Adjust multiplier for effect intensity
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      0.05 // Smoothness factor
    );

    // Optional: Add rotation based on scroll
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      scrollProgress * 0.1,
      0.05
    );
  });

  return null;
}

// Parallax effect for 3D objects
export function ScrollParallax({
  children,
  speed = 1,
}: {
  children: React.ReactNode;
  speed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollY } = useLenisScroll();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = (scrollY * speed) / 100;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

// Rotation based on scroll velocity
export function ScrollRotation({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scrollVelocity } = useLenisScroll();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += scrollVelocity * 0.01;
    }
  });

  return <group ref={groupRef}>{children}</group>;
}
