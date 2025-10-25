"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StarfieldProps {
  count?: number;
}

// Constellation patterns (relative positions)
const constellationShapes = [
  // Big Dipper shape
  [
    { x: 0, y: 0, z: 0 },
    { x: 2, y: 0.5, z: 0 },
    { x: 4, y: 0.3, z: 0 },
    { x: 5, y: 1, z: 0 },
    { x: 4.5, y: 2.5, z: 0 },
    { x: 3, y: 3, z: 0 },
    { x: 1.5, y: 2.8, z: 0 },
  ],
  // Orion's Belt
  [
    { x: 0, y: 0, z: 0 },
    { x: 2, y: 0.2, z: 0 },
    { x: 4, y: 0, z: 0 },
  ],
  // Triangle
  [
    { x: 0, y: 0, z: 0 },
    { x: 3, y: 0, z: 0 },
    { x: 1.5, y: 2.5, z: 0 },
  ],
  // W shape (Cassiopeia-like)
  [
    { x: 0, y: 0, z: 0 },
    { x: 1, y: 1.5, z: 0 },
    { x: 2, y: 0.5, z: 0 },
    { x: 3, y: 1.8, z: 0 },
    { x: 4, y: 0.3, z: 0 },
  ],
  // Cross
  [
    { x: 0, y: 2, z: 0 },
    { x: 0, y: 0, z: 0 },
    { x: -1.5, y: 1, z: 0 },
    { x: 1.5, y: 1, z: 0 },
  ],
];

export default function Starfield({ count = 3000 }: StarfieldProps) {
  const starsRef = useRef<THREE.Points>(null);
  const cometsRef = useRef<THREE.Group>(null);
  const constellationsRef = useRef<THREE.Group>(null);

  // Create constellations
  const constellations = useMemo(() => {
    const constellationGroups = [];
    const numConstellations = 5;

    for (let i = 0; i < numConstellations; i++) {
      const shape = constellationShapes[i % constellationShapes.length];
      const baseX = (Math.random() - 0.5) * 100;
      const baseY = (Math.random() - 0.5) * 60;
      const baseZ = (Math.random() - 0.5) * 80 - 30;
      const scale = Math.random() * 2 + 1.5;

      const stars = shape.map((pos) => ({
        x: baseX + pos.x * scale,
        y: baseY + pos.y * scale,
        z: baseZ + pos.z * scale,
        phase: Math.random() * Math.PI * 2, // Random phase for twinkling
      }));

      constellationGroups.push(stars);
    }

    return constellationGroups;
  }, []);

  // Create comets with varied directional trajectories
  const comets = useMemo(() => {
    const directions = [
      // Diagonal movements
      { start: [-60, -40, -30], end: [60, 40, 30] }, // bottom-left to top-right
      { start: [60, -40, -30], end: [-60, 40, 30] }, // bottom-right to top-left
      { start: [-60, 40, -30], end: [60, -40, 30] }, // top-left to bottom-right
      { start: [60, 40, -30], end: [-60, -40, 30] }, // top-right to bottom-left
      // Horizontal movements
      { start: [-70, 0, -20], end: [70, 0, 20] }, // left to right
      { start: [70, 0, -20], end: [-70, 0, 20] }, // right to left
      // Vertical movements
      { start: [0, -50, -25], end: [0, 50, 25] }, // bottom to top
      { start: [0, 50, -25], end: [0, -50, 25] }, // top to bottom
    ];

    return Array.from({ length: 1 }, (_, i) => {
      const direction = directions[0]; // Start with first direction

      return {
        start: new THREE.Vector3(
          direction.start[0],
          direction.start[1],
          direction.start[2]
        ),
        end: new THREE.Vector3(
          direction.end[0],
          direction.end[1],
          direction.end[2]
        ),
        current: new THREE.Vector3(
          direction.start[0],
          direction.start[1],
          direction.start[2]
        ),
        progress: 0,
        duration: 20 + Math.random() * 10, // 20-30 seconds for slower speed
        delay: 3 + Math.random() * 4, // 3-7 seconds delay between comets
        waiting: true,
        waitTimer: 0,
        colorIndex: 0, // Single comet uses first color scheme
        directionIndex: 0, // Track which direction to use next
      };
    });
  }, []); // Regular stars - tiny twinkling dots
  const [positions, colors, sizes, velocities, phases] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Random positions in a large sphere for 3D space feel
      const radius = Math.random() * 150 + 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // No movement velocities for static stars
      velocities[i * 3] = 0;
      velocities[i * 3 + 1] = 0;
      velocities[i * 3 + 2] = 0;

      // Random twinkling phase for each star
      phases[i] = Math.random() * Math.PI * 2;

      // Varied star colors - mostly white with some variations
      const colorChoice = Math.random();
      if (colorChoice < 0.8) {
        // White stars (most common)
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.92) {
        // Blue-white stars
        colors[i * 3] = 0.9;
        colors[i * 3 + 1] = 0.95;
        colors[i * 3 + 2] = 1;
      } else if (colorChoice < 0.98) {
        // Cyan stars
        colors[i * 3] = 0.8;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
      } else {
        // Subtle yellow stars
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 0.9;
      }

      // Tiny sizes for dots
      sizes[i] = Math.random() * 0.3 + 0.1;
    }

    return [positions, colors, sizes, velocities, phases];
  }, [count]);

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // Slow rotation of the entire starfield for 3D space effect
    if (starsRef.current) {
      starsRef.current.rotation.y += delta * 0.08; // Slow rotation around Y axis
      starsRef.current.rotation.x += delta * 0.02; // Very slow rotation around X axis

      const geometry = starsRef.current.geometry;
      const sizes = geometry.attributes.size.array as Float32Array;

      // Random twinkling for each star
      for (let i = 0; i < count; i++) {
        const baseSize = 0.1 + (i % 0.3);
        // Each star twinkles at its own random speed and phase
        const twinkleSpeed = 0.5 + (i % 2.0); // Different speeds
        const phase = phases[i];
        sizes[i] = baseSize + Math.sin(time * twinkleSpeed + phase) * 0.15;
      }
      geometry.attributes.size.needsUpdate = true;
    }

    // Slow rotation for constellations too
    if (constellationsRef.current) {
      constellationsRef.current.rotation.y += delta * 0.05;
      constellationsRef.current.rotation.x += delta * 0.01;

      let childIndex = 0;
      constellations.forEach((constellation, groupIndex) => {
        constellation.forEach((star, starIndex) => {
          const sphere = constellationsRef.current?.children[
            childIndex
          ] as THREE.Mesh;
          if (sphere && sphere.type === "Mesh") {
            // Smooth pulsing glow effect
            const pulse = Math.sin(time * 1.5 + star.phase) * 0.5 + 0.5;
            const scale = 1 + pulse * 0.4;
            sphere.scale.setScalar(scale);

            // Update material opacity
            const material = sphere.material as THREE.MeshBasicMaterial;
            material.opacity = 0.7 + pulse * 0.3;

            // Update point light intensity
            const light = sphere.children[0] as THREE.PointLight;
            if (light && light.isLight) {
              light.intensity = 0.3 + pulse * 0.4;
            }
          }
          childIndex++;
        });
      });
    }

    // Animate comets - smooth transition from start to end
    if (cometsRef.current) {
      comets.forEach((comet, index) => {
        if (comet.waiting) {
          comet.waitTimer += delta;
          if (comet.waitTimer >= comet.delay) {
            // Reset for new journey
            comet.waiting = false;
            comet.waitTimer = 0;
            comet.progress = 0;

            // Cycle through different directions for variety
            const directions = [
              { start: [-60, -40, -30], end: [60, 40, 30] },
              { start: [60, -40, -30], end: [-60, 40, 30] },
              { start: [-60, 40, -30], end: [60, -40, 30] },
              { start: [60, 40, -30], end: [-60, -40, 30] },
              { start: [-70, 0, -20], end: [70, 0, 20] },
              { start: [70, 0, -20], end: [-70, 0, 20] },
              { start: [0, -50, -25], end: [0, 50, 25] },
              { start: [0, 50, -25], end: [0, -50, 25] },
            ];

            // Get next direction and update index
            const currentDirIndex =
              (comet.directionIndex || 0) % directions.length;
            const direction = directions[currentDirIndex];
            comet.directionIndex = currentDirIndex + 1;

            comet.start.set(
              direction.start[0],
              direction.start[1],
              direction.start[2]
            );
            comet.end.set(direction.end[0], direction.end[1], direction.end[2]);
            comet.current.copy(comet.start);
            comet.duration = 20 + Math.random() * 10; // Slower speed
          }
          // Hide comet while waiting
          const cometGroup = cometsRef.current?.children[index] as THREE.Group;
          if (cometGroup) {
            cometGroup.visible = false;
          }
        } else {
          // Smooth interpolation from start to end
          comet.progress += delta / comet.duration;

          if (comet.progress >= 1) {
            // Reached end, start waiting
            comet.waiting = true;
            comet.waitTimer = 0;
            comet.delay = Math.random() * 5 + 3;
          } else {
            // Linear motion for realistic comet movement
            comet.current.lerpVectors(comet.start, comet.end, comet.progress);

            // Update comet visuals
            const cometGroup = cometsRef.current?.children[
              index
            ] as THREE.Group;
            if (cometGroup) {
              cometGroup.visible = true;
              cometGroup.position.copy(comet.current);

              // Point tail away from direction of movement
              const direction = new THREE.Vector3()
                .subVectors(comet.end, comet.start)
                .normalize();

              // Rotate comet so tail points opposite to movement direction
              cometGroup.lookAt(
                comet.current.x + direction.x,
                comet.current.y + direction.y,
                comet.current.z + direction.z
              );

              // Brightness based on distance and progress
              let opacity = 1.0;
              if (comet.progress < 0.05) {
                opacity = comet.progress / 0.05;
              } else if (comet.progress > 0.95) {
                opacity = (1 - comet.progress) / 0.05;
              }

              // Update materials for smooth fading with color preservation
              cometGroup.children.forEach((child, childIndex) => {
                if (child instanceof THREE.Mesh && child.material) {
                  const material = child.material as THREE.MeshBasicMaterial;

                  // Apply different opacity based on component
                  switch (childIndex) {
                    case 0: // Head
                      material.opacity = opacity * 1.0;
                      break;
                    case 1: // Inner glow (orange/red)
                      material.opacity = opacity * 0.7;
                      break;
                    case 2: // Outer glow (blue)
                      material.opacity = opacity * 0.4;
                      break;
                    case 3: // Main tail (red/blue)
                      material.opacity = opacity * 0.8;
                      break;
                    case 4: // Secondary tail (purple/blue)
                      material.opacity = opacity * 0.6;
                      break;
                    case 5: // Outer tail (pink/cyan)
                      material.opacity = opacity * 0.4;
                      break;
                    case 6: // Color mixing particles 1
                      material.opacity = opacity * 0.2;
                      break;
                    case 7: // Color mixing particles 2
                      material.opacity = opacity * 0.15;
                      break;
                    default:
                      material.opacity = opacity * 0.3;
                  }
                }
              });

              // Update point lights intensity
              cometGroup.children.forEach((child) => {
                if (child instanceof THREE.PointLight) {
                  const baseIntensity =
                    child.userData?.baseIntensity || child.intensity;
                  if (!child.userData?.baseIntensity) {
                    child.userData.baseIntensity = child.intensity;
                  }
                  child.intensity = baseIntensity * opacity;
                }
              });
            }
          }
        }
      });
    }
  });

  return (
    <group>
      {/* Regular Stars - Small Glowing Dots */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={count}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.8}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          map={(() => {
            const canvas = document.createElement("canvas");
            canvas.width = 16;
            canvas.height = 16;
            const context = canvas.getContext("2d")!;
            const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.3, "rgba(255,255,255,0.9)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");
            context.fillStyle = gradient;
            context.fillRect(0, 0, 16, 16);
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
          })()}
        />
      </points>

      {/* Constellations - Glowing Spheres */}
      <group ref={constellationsRef}>
        {constellations.map((constellation, groupIndex) =>
          constellation.map((star, starIndex) => (
            <mesh
              key={`${groupIndex}-${starIndex}`}
              position={[star.x, star.y, star.z]}
            >
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshBasicMaterial
                color="#00ffff"
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
              />
              {/* Glow effect */}
              <pointLight
                color="#00ffff"
                intensity={0.8}
                distance={4}
                decay={2}
              />
            </mesh>
          ))
        )}
      </group>

      {/* Comets - Single Comet with Clean Structure */}
      <group ref={cometsRef}>
        {comets.map((comet, index) => {
          // Colorful mixture scheme for the comet
          const colors = {
            head: "#e80a0aff",
            glow1: "#ff6b35", // Orange glow
            glow2: "#4285f4", // Blue glow
            glow3: "#ff4757", // Red glow
            // Tail gradient (fallback color plus gradient stops)
            tailGlow: "#e5edf0ff", // Purple tail glow
          };

          return (
            <group key={`comet-${index}`}>
              {/* Comet Head - Small bright core */}
              <mesh position={[0, 0, 0.5]}>
                <sphereGeometry args={[0.03, 12, 12]} />
                <meshBasicMaterial
                  color={colors.head}
                  transparent
                  opacity={1.0}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              {/* Multi-colored glow layers for head */}
              <mesh position={[0, 0, 0.5]}>
                <sphereGeometry args={[0.06, 12, 12]} />
                <meshBasicMaterial
                  color={colors.glow1}
                  transparent
                  opacity={0.7}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              <mesh position={[0, 0, 0.5]}>
                <sphereGeometry args={[0.09, 12, 12]} />
                <meshBasicMaterial
                  color={colors.glow2}
                  transparent
                  opacity={0.5}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              <mesh position={[0, 0, 0.5]}>
                <sphereGeometry args={[0.12, 12, 12]} />
                <meshBasicMaterial
                  color={colors.glow3}
                  transparent
                  opacity={0.3}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              {/* Single tail with fading effect */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2]}>
                <coneGeometry args={[0.08, 8, 16]} />
                <meshBasicMaterial
                  color={colors.tail}
                  transparent
                  opacity={0.6}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              {/* Tail glow for fading effect */}
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -2.2]}>
                <coneGeometry args={[0.1, 10, 16]} />
                <meshBasicMaterial
                  color={colors.tailGlow}
                  transparent
                  opacity={0.3}
                  blending={THREE.AdditiveBlending}
                />
              </mesh>

              {/* Head lighting - mixture of colors */}
              <pointLight
                position={[0, 0, 0.5]}
                color={colors.glow1}
                intensity={1.2}
                distance={5}
                decay={2}
              />

              <pointLight
                position={[0, 0, 0.5]}
                color={colors.glow2}
                intensity={0.8}
                distance={4}
                decay={2}
              />

              {/* Tail lighting for glow */}
              <pointLight
                position={[0, 0, -2]}
                color={colors.tail}
                intensity={0.4}
                distance={6}
                decay={2}
              />
            </group>
          );
        })}
      </group>
    </group>
  );
}
