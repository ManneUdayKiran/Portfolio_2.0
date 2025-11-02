"use client";
import { useEffect, useRef, useState } from "react";

export default function SceneClient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let scene: any, camera: any, renderer: any, animationId: number;
    let spheres: any[] = [];

    const initThreeScene = async () => {
      try {
        // Dynamically import Three.js without React Three Fiber
        const THREE = await import("three");

        if (!canvasRef.current) return;

        // Scene setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          antialias: true,
          alpha: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0x4f46e5, 0.8);
        directionalLight.position.set(10, 10, 5);
        scene.add(directionalLight);

        const pointLight1 = new THREE.PointLight(0x7c3aed, 0.6);
        pointLight1.position.set(-10, -10, -10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x60a5fa, 0.5);
        pointLight2.position.set(5, -5, 5);
        scene.add(pointLight2);

        // Create floating spheres
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({
          color: 0x4f46e5,
          shininess: 100,
          transparent: true,
          opacity: 0.8,
        });

        // Add multiple spheres at different positions
        const positions = [
          [0, 0, -8],
          [12, 8, -15],
          [-10, -5, -12],
        ];

        positions.forEach((pos) => {
          const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
          sphere.position.set(pos[0], pos[1], pos[2]);
          sphere.material.color.setHSL(Math.random(), 0.7, 0.6);
          spheres.push(sphere);
          scene.add(sphere);
        });

        camera.position.z = 15;
        setIsLoaded(true);

        // Animation loop
        const animate = () => {
          animationId = requestAnimationFrame(animate);

          // Rotate spheres
          spheres.forEach((sphere, index) => {
            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.02;

            // Add floating animation
            const time = Date.now() * 0.001;
            sphere.position.y = Math.sin(time + index) * 2;
          });

          renderer.render(scene, camera);
        };

        animate();

        // Handle resize
        const handleResize = () => {
          if (camera && renderer) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          }
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      } catch (error) {
        console.error("Failed to initialize Three.js scene:", error);
      }
    };

    initThreeScene();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div className="w-full h-full relative bg-black">
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${isLoaded ? "block" : "hidden"}`}
      />

      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <div className="text-white">Loading 3D Scene...</div>
          </div>
        </div>
      )}
    </div>
  );
}
