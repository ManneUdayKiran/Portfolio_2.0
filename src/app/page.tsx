"use client";

import dynamic from "next/dynamic";

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
// import Scene from "@/components/scene"; // Removed to fix import conflict
import ScrollProgress from "@/components/scroll-progress";

// const ThreeCanvasClient = dynamic(
//   () => import("@/components/scene/"),
//   { ssr: false }
// );
const Scene = dynamic(() => import("@/components/scene"), {
  ssr: false, // Important: disable server-side rendering
});

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* ✅ Render 3D Canvas Client-side only */}
      {/* <ThreeCanvasClient /> */}

      {/* 3D Canvas Background (client-only) */}
      <div className="fixed inset-0 -z-10">
        <Scene />
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
