"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

// Commented out React Three Fiber imports to avoid ReactCurrentOwner errors
// const Canvas = dynamic(
//   () => import("@react-three/fiber").then((mod) => mod.Canvas),
//   { ssr: false }
// );
// const OrbitControls = dynamic(
//   () => import("@react-three/drei").then((mod) => mod.OrbitControls),
//   { ssr: false }
// );
// const ProjectCarousel = dynamic(
//   () => import("@/components/three/project-carousel"),
//   { ssr: false }
// );
// const Starfield = dynamic(
//   () => import("@/components/three/starfield"),
//   { ssr: false }
// );

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
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Antd Design",
      "Socket.IO",
      "Emoji Picker",
    ],
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
    technologies: [
      "React",
      "Antd",
      "FastApi",
      "Firebase",
      "LLM Models",
      "TailWind CSS",
    ],
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
    technologies: [
      "React",
      "Material UI",
      "FastApi",
      "MongoDB",
      "Machine Learning",
      "LLM Model",
    ],
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
    technologies: [
      "React",
      "MongoDB",
      "Antd",
      "Material UI",
      "Node.js",
      "Express.js",
    ],
    liveUrl: "https://ai-journalentry-app.onrender.com",
    githubUrl: "https://github.com/ManneUdayKiran/AI-Journal-App.git",
    image: "☁️",
    category: "DevOps",
    gradient: "from-blue-500 to-indigo-500",
  },
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleHoverChange = (isHovered: boolean, hoveredIndex?: number) => {
    // Keep for future use if needed
  };

  return (
    <section
      ref={ref}
      id="projects"
      className="min-h-screen py-20 relative overflow-hidden bg-black"
    >
      {/* CSS Starfield Background */}
      <div className="absolute inset-0">
        {/* Starfield Effect */}
        <div className="starfield-container absolute inset-0">
          {[...Array(200)].map((_, i) => (
            <div
              key={i}
              className={`star absolute bg-white rounded-full opacity-70 star-${
                i % 10
              }`}
            />
          ))}
        </div>

        {/* Gradient Overlays for Lighting Effect */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl gradient-glow-1" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl gradient-glow-2" />
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

      {/* Projects Grid */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 80,
                  scale: 0.8,
                  rotateX: -15,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotateX: 0,
                  transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 100,
                    duration: 0.8,
                  },
                },
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
                rotateY: 2,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 300,
                },
              }}
              className="group relative cursor-pointer"
              onClick={() => handleProjectClick(project)}
              onMouseEnter={() => handleHoverChange(true, index)}
              onMouseLeave={() => handleHoverChange(false)}
            >
              {/* Project Card */}
              <motion.div
                className="relative h-96 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl border border-gray-700 overflow-hidden backdrop-blur-sm transition-all duration-500"
                whileHover={{
                  borderColor: "rgba(34, 211, 238, 0.5)",
                  boxShadow:
                    "0 20px 40px rgba(34, 211, 238, 0.1), 0 0 0 1px rgba(34, 211, 238, 0.2)",
                }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 400,
                }}
              >
                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20"
                  initial={{ opacity: 0 }}
                  whileHover={{
                    opacity: 1,
                    background:
                      "linear-gradient(45deg, rgba(34, 211, 238, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Project Icon/Image */}
                <motion.div
                  className="absolute top-6 left-6 w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center text-3xl shadow-lg"
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, 0],
                    boxShadow: "0 10px 30px rgba(34, 211, 238, 0.4)",
                  }}
                  transition={{
                    type: "spring",
                    damping: 20,
                    stiffness: 300,
                    rotate: {
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <motion.span
                    whileHover={{
                      scale: 1.1,
                      filter: "brightness(1.2)",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.image}
                  </motion.span>
                </motion.div>

                {/* Content */}
                <div className="relative p-6 pt-24 h-full flex flex-col">
                  <div className="flex-grow">
                    <motion.h3
                      className="text-xl font-bold text-white mb-3"
                      whileHover={{
                        color: "#22d3ee",
                        x: 5,
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-300 text-sm mb-4 line-clamp-description-fixed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{
                        opacity: 1,
                        color: "#d1d5db",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {project.description}
                    </motion.p>
                  </div>

                  {/* Bottom Section - Fixed at bottom */}
                  <div className="mt-auto space-y-4">
                    {/* Technologies */}
                    <motion.div
                      className="flex flex-wrap gap-2"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {project.technologies
                        .slice(0, 3)
                        .map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="px-2 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-lg border border-gray-600"
                            variants={{
                              hidden: { opacity: 0, y: 10, scale: 0.8 },
                              visible: {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                transition: {
                                  type: "spring",
                                  damping: 20,
                                  stiffness: 300,
                                },
                              },
                            }}
                            whileHover={{
                              scale: 1.05,
                              borderColor: "rgba(34, 211, 238, 0.8)",
                              color: "#22d3ee",
                              backgroundColor: "rgba(34, 211, 238, 0.1)",
                              y: -2,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      {project.technologies.length > 3 && (
                        <motion.span
                          className="px-2 py-1 bg-gray-800/80 text-gray-400 text-xs rounded-lg border border-gray-600"
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1 },
                          }}
                          whileHover={{
                            scale: 1.05,
                            color: "#9ca3af",
                          }}
                        >
                          +{project.technologies.length - 3}
                        </motion.span>
                      )}
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-center py-2 px-4 rounded-lg font-medium text-sm shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{
                          scale: 1.05,
                          boxShadow: "0 10px 25px rgba(34, 211, 238, 0.3)",
                          background:
                            "linear-gradient(90deg, #06b6d4, #3b82f6)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 400,
                        }}
                      >
                        <motion.span
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          Live Demo
                        </motion.span>
                      </motion.a>
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gray-800 text-white text-center py-2 px-4 rounded-lg font-medium text-sm border border-gray-600"
                        onClick={(e) => e.stopPropagation()}
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "#374151",
                          borderColor: "#6b7280",
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          damping: 20,
                          stiffness: 400,
                        }}
                      >
                        <motion.span
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                        >
                          GitHub
                        </motion.span>
                      </motion.a>
                    </motion.div>
                  </div>
                </div>

                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Floating Particles on Hover */}
                <div className="absolute inset-0 pointer-events-none">
                  {[1, 2, 3, 4, 5, 6].map((particle) => (
                    <motion.div
                      key={particle}
                      className={`absolute w-1 h-1 bg-cyan-400 rounded-full particle-${particle}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{
                        opacity: [0, 0.6, 0],
                        scale: [0, 1.2, 0],
                        y: [0, -10, -20],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: (particle - 1) * 0.2,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Category Badge */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                {project.category.split(" ")[0]}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={
            inView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 50, scale: 0.9 }
          }
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 100,
            delay: 1.2,
            duration: 0.8,
          }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/ManneUdayKiran"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl font-medium border border-gray-600 shadow-lg"
            whileHover={{
              scale: 1.05,
              background: "linear-gradient(90deg, #374151, #1f2937)",
              borderColor: "#6b7280",
              boxShadow:
                "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(34, 211, 238, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 400,
            }}
          >
            <motion.svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </motion.svg>
            <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
              View More Projects on GitHub
            </motion.span>
          </motion.a>
        </motion.div>
      </motion.div>

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

      <style jsx>{`
        .starfield-container .star {
          animation: twinkle linear infinite;
          width: 2px;
          height: 2px;
        }

        .star-0 {
          left: 10%;
          top: 20%;
        }
        .star-1 {
          left: 25%;
          top: 45%;
        }
        .star-2 {
          left: 40%;
          top: 15%;
        }
        .star-3 {
          left: 65%;
          top: 70%;
        }
        .star-4 {
          left: 80%;
          top: 30%;
        }
        .star-5 {
          left: 15%;
          top: 60%;
        }
        .star-6 {
          left: 50%;
          top: 80%;
        }
        .star-7 {
          left: 75%;
          top: 55%;
        }
        .star-8 {
          left: 90%;
          top: 10%;
        }
        .star-9 {
          left: 5%;
          top: 85%;
        }

        .star:nth-child(odd) {
          animation-delay: 0s;
          animation-duration: 2s;
        }

        .star:nth-child(even) {
          animation-delay: 1s;
          animation-duration: 3s;
        }

        .star:nth-child(3n) {
          animation-delay: 0.5s;
          animation-duration: 2.5s;
          width: 3px;
          height: 3px;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .gradient-glow-1 {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        .gradient-glow-2 {
          animation: glow-pulse 3s ease-in-out infinite 1s;
        }

        @keyframes glow-pulse {
          0%,
          100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.1);
          }
        }

        /* Particle positioning for project cards */
        .particle-1 {
          left: 20%;
          top: 30%;
          animation-delay: 0s;
        }
        .particle-2 {
          left: 35%;
          top: 30%;
          animation-delay: 0.2s;
        }
        .particle-3 {
          left: 50%;
          top: 50%;
          animation-delay: 0.4s;
        }
        .particle-4 {
          left: 65%;
          top: 50%;
          animation-delay: 0.6s;
        }
        .particle-5 {
          left: 80%;
          top: 70%;
          animation-delay: 0.8s;
        }
        .particle-6 {
          left: 95%;
          top: 70%;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
