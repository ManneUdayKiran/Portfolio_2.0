"use client";

import { useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useInView } from "@/hooks/use-in-view";
import ProjectCarousel from "@/components/three/project-carousel";
import Starfield from "@/components/three/starfield";
import * as THREE from "three";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
  category: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Real-Time Chat App",
    description:
      "A full-stack real-time chat app built with MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. It supports one-on-one messaging, real-time typing indicators, emoji picker, image upload, and theme toggling.",
    technologies: ["React", "Node.js", "MongoDB", "Antd Design","Socket.IO","Emoji Picker"],
    liveUrl: "https://chat-app-fu9v.onrender.com",
    githubUrl: "https://github.com/ManneUdayKiran/Real-Time-Chat-App.git",
    image: "🌌",
    category: "Full Stack Development",
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    title: "Mini RAG",
    description:
      "Mini RAG is a modern, responsive app for Retrieval-Augmented Generation. Upload PDFs, DOCX, images (OCR), or add web URLs, then ask questions and get answers strictly from your provided content. Built with React, Ant Design, and FastAPI for rapid, user-friendly knowledge retrieval.",
    technologies: ["React", "FastApi", "MongoDB", "LLM MOdels"],
    liveUrl: "",
    githubUrl: "https://github.com/ManneUdayKiran/MiniRAG-Project.git",
    image: "🛒",
    category: "Machine Learning",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "AI-Powered Dashboard",
    description:
      "Advanced data visualization platform with AI-driven insights, interactive charts, and predictive analytics for business intelligence.",
    technologies: ["React", "D3.js", "Python", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#",
    image: "📊",
    category: "AI & Data",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 4,
    title: "Prompt-to-Product",
    description:
      "Prompt-to-Product is a powerful MVP platform that lets developers instantly turn prompts into usable code or insights. It combines the capabilities of AI chat and code generation in a single, intuitive interface..",
    technologies: ["React", "Antd", "FastApi", "Firebase","LLM Models","TailWind CSS"],
    liveUrl: "https://prompt-to-product.onrender.com",
    githubUrl: "https://github.com/ManneUdayKiran/MVP-Platform-Project.git",
    image: "📱",
    category: "Full Stack Development",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: 5,
    title: "Resume Analyzer",
    description:
      "A comprehensive resume analysis tool that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS) and provides personalized improvement suggestions.",
    technologies: ["React", "Material UI", "FastApi", "MongoDB","Machine Learning","LLM Model"],
    liveUrl: "https://frontend-two-pi-49.vercel.app/",
    githubUrl: "https://github.com/ManneUdayKiran/ResuScan-Resume-Analyser.git",
    image: "💬",
    category: "Full Stack Development",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    id: 6,
    title: "Intelligent Journaling App",
    description:
      "An intelligent journaling app powered by LLMs that allows users to record daily thoughts and receive AI-generated summaries, mood detection, and mental wellness suggestions.",
    technologies: ["React", "MongoDB", "Antd", "Material UI","Node.js","Express.js"],
    liveUrl: "https://ai-journalentry-app.onrender.com",
    githubUrl: "https://github.com/ManneUdayKiran/AI-Journal-App.git",
    image: "☁️",
    category: "DevOps",
    gradient: "from-blue-500 to-indigo-500",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setAutoRotate(false);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setAutoRotate(true);
  };

  const handleHoverChange = (isHovered: boolean, hoveredIndex?: number) => {
    setIsCardHovered(isHovered);
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen py-20 relative overflow-hidden bg-black"
    >
      {/* 3D Carousel Scene */}
      <div className="absolute inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 2, 12], fov: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
        >
          <Suspense fallback={null}>
            {/* Starfield Background */}
            <Starfield count={3000} />

            {/* Lighting */}
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
            <pointLight
              position={[-10, -10, -10]}
              intensity={0.5}
              color="#ff00ff"
            />
            <spotLight
              position={[0, 15, 0]}
              angle={0.5}
              penumbra={1}
              intensity={1}
              castShadow
              color="#ffffff"
            />

            {/* Project Carousel */}
            <ProjectCarousel
              projects={projects}
              onProjectClick={handleProjectClick}
              autoRotate={autoRotate && !isCardHovered}
              onHoverChange={handleHoverChange}
            />

            {/* Camera Controls */}
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3}
              maxPolarAngle={Math.PI / 2}
              autoRotate={autoRotate && !isCardHovered}
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 pointer-events-none">
        {/* Header */}
        <motion.div
          className="text-center pt-8 px-4"
          initial={{ opacity: 0, y: -50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.5 }}
          >
            <span className="text-cyan-400 text-sm font-mono">
              🎡 3D PROJECT CAROUSEL
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Explore My </span>
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          {/* <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Drag to rotate • Click panels to view details
          </p> */}
        </motion.div>

        {/* Controls */}
        <motion.div
          className="absolute top-24 right-8 pointer-events-auto space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Auto Rotate Toggle */}
          <motion.button
            onClick={() => setAutoRotate(!autoRotate)}
            className="w-14 h-14 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-full flex items-center justify-center hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title={autoRotate ? "Stop Rotation" : "Start Rotation"}
          >
            {autoRotate ? (
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-cyan-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
              </svg>
            )}
          </motion.button>
        </motion.div>

        {/* Instructions */}
        {/* <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-lg px-6 py-3"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">🖱️</span>
              <span>Drag to rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">👆</span>
              <span>Click panels</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-cyan-400">🎮</span>
              <span>Use controls</span>
            </div>
          </div>
        </motion.div> */}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              background: "rgba(0,0,0,0.95)",
              backdropFilter: "blur(20px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="relative max-w-4xl w-full rounded-2xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(0,255,255,0.3)",
                boxShadow:
                  "0 0 80px rgba(0,255,255,0.4), inset 0 0 40px rgba(0,255,255,0.1)",
              }}
              initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(90deg, #00ffff, #0080ff, #00ffff)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <div className="absolute inset-[2px] rounded-2xl bg-black" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/80 backdrop-blur-sm border border-cyan-500/50 rounded-full flex items-center justify-center text-white hover:bg-cyan-500/20 hover:border-cyan-500 transition-all"
                title="Close"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Modal Content */}
              <div className="relative z-10 p-8 md:p-12">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      className={`text-7xl`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {selectedProject.image}
                    </motion.div>
                    <div>
                      <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/50 rounded-full text-xs text-cyan-400 font-mono">
                        {selectedProject.category}
                      </span>
                      <h3
                        className={`text-4xl font-bold mt-2 bg-gradient-to-r ${selectedProject.gradient} bg-clip-text text-transparent`}
                      >
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ⚡
                    </motion.span>
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-mono text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(0,255,255,0.2)",
                          borderColor: "rgba(0,255,255,0.8)",
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.a
                    href={selectedProject.liveUrl}
                    className={`flex-1 text-center py-4 bg-gradient-to-r ${selectedProject.gradient} rounded-xl font-bold text-white flex items-center justify-center gap-2`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View Live Demo
                  </motion.a>
                  <motion.a
                    href={selectedProject.githubUrl}
                    className="flex-1 text-center py-4 bg-white/5 border-2 border-cyan-500/50 rounded-xl font-bold text-cyan-400 flex items-center justify-center gap-2 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    View Source Code
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
