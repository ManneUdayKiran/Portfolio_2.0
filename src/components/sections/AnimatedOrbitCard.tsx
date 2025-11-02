"use client";

// COMPONENT TEMPORARILY DISABLED - uses React Three Fiber
// import { Html } from "@react-three/drei";
// import { useRef, useEffect, useState } from "react";
// import { useFrame } from "@react-three/fiber";

// COMPONENT TEMPORARILY DISABLED - uses React Three Fiber
export function AnimatedOrbitCard({
  achievement,
  index,
  total,
}: {
  achievement: any;
  index: number;
  total: number;
}) {
  // Placeholder component to avoid errors
  return null;
}

// Original component commented out:
/*
export function AnimatedOrbitCard({
  achievement,
  index,
  total,
}: {
  achievement: any;
  index: number;
  total: number;
}) {
  const groupRef = useRef<any>(null);
  const [visible, setVisible] = useState(false);

  // Staggered appearance
  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 800 + index * 700);
    return () => clearTimeout(timeout);
  }, [index]);

  useFrame((state) => {
    if (groupRef.current && visible) {
      // Orbit around trophy
      const orbitRadius = 2.5;
      const angle =
        (index / total) * Math.PI * 2 + state.clock.elapsedTime * 0.5;
      groupRef.current.position.set(
        Math.cos(angle) * orbitRadius,
        0.7 + Math.sin(angle) * 0.7,
        Math.sin(angle) * orbitRadius
      );
      // Always face camera
      groupRef.current.lookAt(0, 0.7, 6);
    }
  });

  return (
    <group ref={groupRef} visible={visible}>
      <Html
        center
        distanceFactor={2.5}
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s cubic-bezier(.6,.2,.2,1)",
          pointerEvents: "auto",
          width: "120px",
        }}
      >
        <div className="bg-black/80 backdrop-blur-md rounded-xl p-3 border border-gold-400/30 text-center shadow-lg">
          <div className="text-3xl mb-1">{achievement.icon}</div>
          <div
            className="text-xl font-bold mb-1"
            style={{
              color:
                achievement.gradient?.split(" ")[0]?.replace("from-", "") ||
                "#FFD700",
            }}
          >
            {achievement.count}
          </div>
          <div className="text-sm text-white mb-1">{achievement.title}</div>
        </div>
      </Html>
    </group>
  );
}
*/
