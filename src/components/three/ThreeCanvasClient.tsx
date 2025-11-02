"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Scene from "./scene";

export default function ThreeCanvasClient() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
