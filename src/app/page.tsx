"use client";

import dynamic from "next/dynamic";
import { Suspense, lazy } from "react";

import HeroSection from "@/components/sections/hero-section";
import Navigation from "@/components/navigation";
import ScrollProgress from "@/components/scroll-progress";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Lazy load all non-critical sections for better performance
const AboutSection = dynamic(
  () => import("@/components/sections/about-section"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const ProjectsSection = dynamic(
  () => import("@/components/sections/projects-section"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const TechStackSection = dynamic(
  () => import("@/components/sections/tech-stack-section"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const ContactSection = dynamic(
  () => import("@/components/sections/contact-section"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

const AchievementsSection = dynamic(
  () => import("@/components/sections/achievements-section"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
  }
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <ScrollProgress />

      {/* Simplified CSS Background for better performance */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Load hero immediately for better UX */}
        <HeroSection />

        {/* Lazy load other sections */}
        <Suspense fallback={<LoadingSpinner />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <AchievementsSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <TechStackSection />
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <ContactSection />
        </Suspense>
      </div>
    </main>
  );
}
