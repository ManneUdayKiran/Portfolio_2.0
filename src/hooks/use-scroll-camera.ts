import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ScrollCameraProps {
  curve: THREE.CatmullRomCurve3;
  scrollProgress: number;
  isAutoPlaying?: boolean;
  lookAtCenter?: boolean;
}

export function useScrollCamera({
  curve,
  scrollProgress,
  isAutoPlaying = false,
  lookAtCenter = true,
}: ScrollCameraProps) {
  const { camera } = useThree();

  useFrame((state) => {
    if (isAutoPlaying) {
      // Auto-travel animation
      const time = state.clock.getElapsedTime();
      const t = (Math.sin(time * 0.2) + 1) / 2; // Oscillate between 0 and 1

      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t);

      camera.position.copy(point);
      camera.position.x += 3; // Offset to the side
      camera.position.z += 3;

      if (lookAtCenter) {
        const lookAtPoint = new THREE.Vector3().addVectors(point, tangent);
        camera.lookAt(lookAtPoint);
      }
    } else {
      // Scroll-based movement
      const t = Math.max(0, Math.min(1, scrollProgress));
      const point = curve.getPoint(t);
      const tangent = curve.getTangent(t);

      // Position camera along the curve with offset
      const targetPosition = new THREE.Vector3().copy(point);
      targetPosition.x += 4 + Math.cos(t * Math.PI * 4) * 2;
      targetPosition.z += 4 + Math.sin(t * Math.PI * 4) * 2;

      // Smooth camera movement
      camera.position.lerp(targetPosition, 0.05);

      if (lookAtCenter) {
        const lookAtPoint = new THREE.Vector3().addVectors(point, tangent);
        camera.lookAt(lookAtPoint);
      }
    }
  });

  return null;
}
