"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  size?: number;
  spread?: number;
}

export default function ParticleField({
  count = 150,
  size = 0.02,
  spread = 15,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle data
  const { positions, colors, scales, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions in a large sphere
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread * 0.5;

      // Random colors in neon palette
      const colorVariant = Math.random();
      if (colorVariant < 0.3) {
        // Blue particles
        colors[i3] = 0.3 + Math.random() * 0.4; // R
        colors[i3 + 1] = 0.6 + Math.random() * 0.4; // G
        colors[i3 + 2] = 1.0; // B
      } else if (colorVariant < 0.6) {
        // Purple particles
        colors[i3] = 0.6 + Math.random() * 0.4; // R
        colors[i3 + 1] = 0.2 + Math.random() * 0.3; // G
        colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
      } else {
        // Pink particles
        colors[i3] = 0.9 + Math.random() * 0.1; // R
        colors[i3 + 1] = 0.4 + Math.random() * 0.3; // G
        colors[i3 + 2] = 0.7 + Math.random() * 0.3; // B
      }

      // Random scale for size variation
      scales[i] = 0.5 + Math.random() * 1.5;

      // Random phase for twinkling
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, colors, scales, phases };
  }, [count, spread]);

  // Create geometry and material
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
    return geometry;
  }, [positions, colors, scales, phases]);

  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: size * 100 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uSize;
        
        attribute float scale;
        attribute float phase;
        attribute vec3 customColor;
        
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = customColor;
          
          // Twinkling effect
          float twinkle = sin(uTime * 3.0 + phase) * 0.5 + 0.5;
          twinkle = pow(twinkle, 2.0); // Make twinkling more dramatic
          
          vAlpha = twinkle * 0.8 + 0.2; // Minimum alpha of 0.2
          
          // Floating animation
          vec3 pos = position;
          pos.y += sin(uTime * 0.5 + phase) * 0.5;
          pos.x += cos(uTime * 0.3 + phase * 1.5) * 0.3;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          
          gl_PointSize = uSize * scale * vAlpha * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          // Create circular particles
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          if (dist > 0.5) discard;
          
          // Soft edges with glow
          float alpha = (1.0 - dist * 2.0) * vAlpha;
          alpha = pow(alpha, 0.5); // Softer falloff
          
          // Add inner glow
          float glow = 1.0 - dist * 1.5;
          glow = max(0.0, glow);
          
          vec3 finalColor = vColor + vColor * glow * 0.5;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [size]);

  useFrame(({ clock }) => {
    if (particleMaterial.uniforms) {
      particleMaterial.uniforms.uTime.value = clock.elapsedTime;
    }

    // Slowly rotate the entire particle field
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <points
      ref={pointsRef}
      geometry={particleGeometry}
      material={particleMaterial}
    />
  );
}
