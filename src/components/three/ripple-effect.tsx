"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface Ripple {
  id: number;
  position: THREE.Vector3;
  startTime: number;
  maxRadius: number;
  color: THREE.Color;
  intensity: number;
}

interface RippleEffectProps {
  maxRipples?: number;
}

export default function RippleEffect({ maxRipples = 8 }: RippleEffectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rippleIdRef = useRef(0);
  const { camera, size, raycaster, pointer } = useThree();

  // Plane geometry for the ripple effect
  const geometry = useMemo(() => new THREE.PlaneGeometry(50, 30, 128, 128), []);

  // Custom shader material for ripples
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uRipplePositions: {
          value: Array.from({ length: 8 }, () => new THREE.Vector3(0, 0, 0)),
        },
        uRippleStartTimes: { value: new Array(8).fill(-1000) },
        uRippleMaxRadii: { value: new Array(8).fill(0) },
        uRippleColors: {
          value: Array.from({ length: 8 }, () => new THREE.Vector3(0, 0, 0)),
        },
        uRippleIntensities: { value: new Array(8).fill(0) },
        uRippleCount: { value: 0 },
        uResolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;
        uniform int uRippleCount;
        uniform vec3 uRipplePositions[8];
        uniform float uRippleStartTimes[8];
        uniform float uRippleMaxRadii[8];
        uniform vec3 uRippleColors[8];
        uniform float uRippleIntensities[8];
        
        varying vec2 vUv;
        varying vec3 vPosition;
        
        vec3 hsv2rgb(vec3 c) {
          vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        
        void main() {
          vec3 color = vec3(0.0);
          float totalRipple = 0.0;
          
          for(int i = 0; i < 8; i++) {
            if(i >= uRippleCount) break;
            
            float elapsed = uTime - uRippleStartTimes[i];
            
            if(elapsed > 0.0 && elapsed < 4.0) {
              float dist = distance(vPosition.xy, uRipplePositions[i].xy);
              float radius = elapsed * uRippleMaxRadii[i] / 4.0;
              
              // Multiple ring effects for more complex patterns
              float ring1 = 1.0 - abs(dist - radius) / (ripple.maxRadius * 0.08);
              float ring2 = 1.0 - abs(dist - radius * 0.7) / (ripple.maxRadius * 0.06);
              float ring3 = 1.0 - abs(dist - radius * 0.4) / (ripple.maxRadius * 0.04);
              
              ring1 = max(0.0, ring1);
              ring2 = max(0.0, ring2);
              ring3 = max(0.0, ring3);
              
              // Fade out over time with ease-out curve
              float fade = 1.0 - (elapsed / 4.0);
              fade = fade * fade * fade;
              
              // Multiple wave frequencies for complexity
              float wave1 = sin(dist * 6.0 - elapsed * 10.0) * 0.5 + 0.5;
              float wave2 = sin(dist * 12.0 - elapsed * 8.0) * 0.3 + 0.7;
              float wave3 = sin(dist * 18.0 - elapsed * 6.0) * 0.2 + 0.8;
              
              float combinedWave = wave1 * wave2 * wave3;
              
              float rippleStrength = (ring1 + ring2 * 0.6 + ring3 * 0.3) * fade * combinedWave * uRippleIntensities[i];
              totalRipple += rippleStrength;
              
              // Enhanced color mixing with shimmer
              vec3 shimmer = vec3(
                sin(dist * 4.0 + elapsed * 3.0) * 0.2 + 0.8,
                sin(dist * 5.0 + elapsed * 4.0) * 0.2 + 0.8,
                sin(dist * 6.0 + elapsed * 5.0) * 0.2 + 0.8
              );
              
              color += uRippleColors[i] * shimmer * rippleStrength;
            }
          }
          
          // Transparent base - let aurora show through
          vec3 baseColor = vec3(0.0, 0.0, 0.0);
          
          // Aurora-like flowing colors
          float hue = sin(uTime * 0.3 + vPosition.x * 0.05 + vPosition.y * 0.03) * 0.5 + 0.5;
          vec3 auroraFlow = hsv2rgb(vec3(hue * 0.7 + 0.15, 0.6, 0.4)) * totalRipple * 0.5;
          
          color = baseColor + color + auroraFlow;
          
          // More transparent, let background show through
          gl_FragColor = vec4(color, totalRipple * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
  }, [size]);

  // Add ripple function
  const addRipple = useCallback(
    (position: THREE.Vector3) => {
      const colors = [
        new THREE.Color(0x00ffff), // Cyan
        new THREE.Color(0xff0080), // Hot Pink
        new THREE.Color(0x8000ff), // Purple
        new THREE.Color(0x00ff40), // Green
        new THREE.Color(0xff4000), // Orange
        new THREE.Color(0x4080ff), // Blue
      ];

      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        position: position.clone(),
        startTime: performance.now() * 0.001,
        maxRadius: 8 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        intensity: 0.8 + Math.random() * 0.4,
      };

      ripplesRef.current.push(newRipple);

      // Remove old ripples
      if (ripplesRef.current.length > maxRipples) {
        ripplesRef.current.shift();
      }
    },
    [maxRipples]
  );

  // Handle mouse interactions
  const handlePointerDown = useCallback(
    (event: any) => {
      event.stopPropagation();

      // Convert screen coordinates to 3D world position
      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Create world position
      const worldPos = new THREE.Vector3(x * 25, y * 15, 0);
      addRipple(worldPos);
    },
    [addRipple]
  );

  const lastMouseTime = useRef(0);
  const handlePointerMove = useCallback(
    (event: any) => {
      const currentTime = performance.now();

      if (event.buttons > 0) {
        // When dragging
        event.stopPropagation();

        // Throttle ripples during drag to avoid too many
        if (currentTime - lastMouseTime.current > 100) {
          const rect = event.target.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
          const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

          const worldPos = new THREE.Vector3(x * 25, y * 15, 0);
          addRipple(worldPos);
          lastMouseTime.current = currentTime;
        }
      }
    },
    [addRipple]
  );

  // Animation loop
  useFrame(({ clock }) => {
    if (!material) return;

    const currentTime = clock.getElapsedTime();
    material.uniforms.uTime.value = currentTime;

    // Clean up expired ripples
    ripplesRef.current = ripplesRef.current.filter(
      (ripple) => currentTime - ripple.startTime < 4.0
    );

    // Update shader uniforms
    material.uniforms.uRippleCount.value = Math.min(
      ripplesRef.current.length,
      8
    );

    // Update individual uniform arrays
    for (let i = 0; i < 8; i++) {
      const ripple = ripplesRef.current[i];
      if (ripple) {
        material.uniforms.uRipplePositions.value[i].copy(ripple.position);
        material.uniforms.uRippleStartTimes.value[i] = ripple.startTime;
        material.uniforms.uRippleMaxRadii.value[i] = ripple.maxRadius;
        material.uniforms.uRippleColors.value[i].set(
          ripple.color.r,
          ripple.color.g,
          ripple.color.b
        );
        material.uniforms.uRippleIntensities.value[i] = ripple.intensity;
      } else {
        // Default values for empty slots
        material.uniforms.uRipplePositions.value[i].set(0, 0, 0);
        material.uniforms.uRippleStartTimes.value[i] = -1000;
        material.uniforms.uRippleMaxRadii.value[i] = 0;
        material.uniforms.uRippleColors.value[i].set(0, 0, 0);
        material.uniforms.uRippleIntensities.value[i] = 0;
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[0, 0, -5]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
    />
  );
}
