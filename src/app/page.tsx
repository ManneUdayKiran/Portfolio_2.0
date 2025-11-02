"use client";
// import dynamic from "next/dynamic";

// import { Suspense } from "react";
// // import { Canvas } from "@react-three/fiber";
// import HeroSection from "@/components/sections/hero-section";
// import AboutSection from "@/components/sections/about-section";
// import ProjectsSection from "@/components/sections/projects-section";
// // import AchievementsSection from "@/components/sections/achievements-section";
// import TechStackSection from "@/components/sections/tech-stack-section";
// import ContactSection from "@/components/sections/contact-section";
// import Navigation from "@/components/navigation";
// import LoadingSpinner from "@/components/ui/loading-spinner";
// // import Scene from "@/components/scene"; // Removed to fix import conflict
// import ScrollProgress from "@/components/scroll-progress";
// // import Scene from "@/components/three/scene";
// // import dynamic from "next/dynamic";

// // Dynamically import the entire Scene component (client-only)
// const Scene = dynamic(() => import("@/components/three/scene"), { ssr: false });

// const AchievementsSection = dynamic(() => import("@/components/sections/achievements-section"), { ssr: false });

// // const ThreeCanvasClient = dynamic(
// //   () => import("@/components/scene/"),
// //   { ssr: false }
// // );
// // const Scene = dynamic(() => import("@/components/three/scene"), {
// //   ssr: false, // Important: disable server-side rendering
// // });

// export default function Home() {
//   return (
//     <main className="relative min-h-screen">
//       {/* Navigation */}
//       <Navigation />

//       {/* Scroll Progress Indicator */}
//       <ScrollProgress />

//       {/* ✅ Render 3D Canvas Client-side only */}
//       {/* <ThreeCanvasClient /> */}

//       {/* 3D Canvas Background (client-only) */}
//       <div className="fixed inset-0 -z-10">
//         <Scene />
//       </div>

//       {/* Content Sections */}
//       <div className="relative z-10">
//         <Suspense fallback={<LoadingSpinner />}>
//           <HeroSection />
//           <AboutSection />
//           <ProjectsSection />
//           <AchievementsSection />
//           <TechStackSection />
//           <ContactSection />
//         </Suspense>
//       </div>
//     </main>
//   );
// }

// "use client";

// "use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ProjectsSection from "@/components/sections/projects-section";
import TechStackSection from "@/components/sections/tech-stack-section";
import ContactSection from "@/components/sections/contact-section";
import Navigation from "@/components/navigation";
import ScrollProgress from "@/components/scroll-progress";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Temporarily disabled to fix React Three Fiber ReactCurrentOwner errors
// const SceneCanvas = dynamic(() => import("@/components/three/SceneClient"), { ssr: false });
const AchievementsSection = dynamic(
  () => import("@/components/sections/achievements-section"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navigation />
      <ScrollProgress />

      {/* CSS Background instead of 3D Scene */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-black to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {/* Animated particles background */}
        <div className="absolute inset-0 bg-stars animate-twinkle"></div>
      </div>

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

      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .bg-stars {
          background-image: radial-gradient(
              2px 2px at 20px 30px,
              #a855f7,
              transparent
            ),
            radial-gradient(2px 2px at 40px 70px, #06b6d4, transparent),
            radial-gradient(1px 1px at 90px 40px, #8b5cf6, transparent),
            radial-gradient(1px 1px at 130px 80px, #06b6d4, transparent),
            radial-gradient(2px 2px at 160px 30px, #a855f7, transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
        }

        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
