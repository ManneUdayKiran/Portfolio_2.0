import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControlsOptions {
  moveSpeed?: number;
  lookSpeed?: number;
  enabled?: boolean;
}

export function useCameraControls({
  moveSpeed = 0.1,
  lookSpeed = 0.002,
  enabled = true,
}: CameraControlsOptions = {}) {
  const { camera } = useThree();
  const keysPressed = useRef<Set<string>>(new Set());
  const mouseMovement = useRef({ x: 0, y: 0 });
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key.toLowerCase());
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key.toLowerCase());
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (document.pointerLockElement) {
        mouseMovement.current.x = e.movementX;
        mouseMovement.current.y = e.movementY;
      }
    };

    const handleClick = () => {
      if (enabled) {
        document.body.requestPointerLock();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
    };
  }, [enabled]);

  useFrame(() => {
    if (!enabled) return;

    // Mouse look
    if (document.pointerLockElement) {
      camera.rotation.y -= mouseMovement.current.x * lookSpeed;
      camera.rotation.x -= mouseMovement.current.y * lookSpeed;
      camera.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, camera.rotation.x)
      );
      mouseMovement.current.x = 0;
      mouseMovement.current.y = 0;
    }

    // WASD movement
    direction.current.set(0, 0, 0);

    if (keysPressed.current.has("w")) {
      direction.current.z -= 1;
    }
    if (keysPressed.current.has("s")) {
      direction.current.z += 1;
    }
    if (keysPressed.current.has("a")) {
      direction.current.x -= 1;
    }
    if (keysPressed.current.has("d")) {
      direction.current.x += 1;
    }
    if (keysPressed.current.has(" ")) {
      direction.current.y += 1;
    }
    if (keysPressed.current.has("shift")) {
      direction.current.y -= 1;
    }

    // Normalize direction
    if (direction.current.length() > 0) {
      direction.current.normalize();
    }

    // Apply movement in camera's local space
    const forward = new THREE.Vector3(0, 0, -1);
    forward.applyQuaternion(camera.quaternion);
    forward.y = 0;
    forward.normalize();

    const right = new THREE.Vector3(1, 0, 0);
    right.applyQuaternion(camera.quaternion);
    right.y = 0;
    right.normalize();

    velocity.current
      .set(0, 0, 0)
      .addScaledVector(forward, direction.current.z * moveSpeed)
      .addScaledVector(right, direction.current.x * moveSpeed)
      .add(new THREE.Vector3(0, direction.current.y * moveSpeed, 0));

    camera.position.add(velocity.current);

    // Boundaries (keep camera in room)
    camera.position.x = Math.max(-12, Math.min(12, camera.position.x));
    camera.position.y = Math.max(1.6, Math.min(8, camera.position.y));
    camera.position.z = Math.max(-12, Math.min(12, camera.position.z));
  });

  return null;
}
