"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ProjectsSection from "@/components/sections/projects-section";
import AchievementsSection from "@/components/sections/achievements-section";
import TechStackSection from "@/components/sections/tech-stack-section";
import ContactSection from "@/components/sections/contact-section";
import Navigation from "@/components/navigation";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Scene from "@/components/three/scene";
import ScrollProgress from "@/components/scroll-progress";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 3D Canvas Background */}
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

      {/* Content Sections */}
      <div className="relative z-10">
        <Suspense fallback={<LoadingSpinner />}>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <AchievementsSection />
          <TechStackSection />
          <ContactSection />
        </Suspense>
      </div>
    </main>
  );
}
