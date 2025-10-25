"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const auroraVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  // Noise function for organic movement
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }
  
  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = noise(i);
    float b = noise(i + vec2(1.0, 0.0));
    float c = noise(i + vec2(0.0, 1.0));
    float d = noise(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    
    for(int i = 0; i < 6; i++) {
      value += amplitude * smoothNoise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    
    return value;
  }
  
  void main() {
    vec2 uv = vUv;
    vec2 p = uv * 2.0 - 1.0;
    
    // Create flowing aurora effect
    float time = uTime * 0.5;
    
    // Multiple layers of aurora
    float aurora1 = fbm(vec2(p.x * 3.0 + time * 0.3, p.y * 2.0 + sin(time * 0.4) * 0.5));
    float aurora2 = fbm(vec2(p.x * 2.0 - time * 0.2, p.y * 3.0 + cos(time * 0.3) * 0.3));
    float aurora3 = fbm(vec2(p.x * 4.0 + sin(time * 0.5) * 0.4, p.y * 1.5 - time * 0.1));
    
    // Combine layers with different intensities
    float combined = aurora1 * 0.5 + aurora2 * 0.3 + aurora3 * 0.2;
    
    // Create wave-like movement
    float wave = sin(p.x * 4.0 + time * 2.0) * 0.5 + 0.5;
    float wave2 = cos(p.y * 3.0 + time * 1.5) * 0.5 + 0.5;
    
    combined *= wave * wave2;
    
    // Aurora colors - purple, blue, pink gradient
    vec3 color1 = vec3(0.4, 0.2, 0.8); // Deep purple
    vec3 color2 = vec3(0.2, 0.6, 1.0); // Bright blue
    vec3 color3 = vec3(0.8, 0.4, 0.9); // Pink-purple
    vec3 color4 = vec3(0.1, 0.9, 0.8); // Cyan
    
    // Create color gradients based on position and noise
    vec3 finalColor = mix(color1, color2, smoothstep(0.2, 0.8, aurora1));
    finalColor = mix(finalColor, color3, smoothstep(0.3, 0.7, aurora2));
    finalColor = mix(finalColor, color4, smoothstep(0.4, 0.9, aurora3));
    
    // Add vertical gradient for more realistic aurora
    float verticalGradient = smoothstep(0.0, 0.6, 1.0 - abs(p.y));
    combined *= verticalGradient;
    
    // Enhance intensity in certain areas
    float intensity = smoothstep(0.1, 0.8, combined) * 0.8;
    
    // Final color with glow effect
    finalColor *= intensity;
    finalColor += finalColor * 0.5; // Add glow
    
    gl_FragColor = vec4(finalColor, intensity * 0.7);
  }
`;

export default function AuroraBackground() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]} scale={[20, 12, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={auroraVertexShader}
        fragmentShader={auroraFragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uResolution: { value: [window.innerWidth, window.innerHeight] },
        }}
        transparent
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
