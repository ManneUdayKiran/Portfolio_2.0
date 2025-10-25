"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import HologramCard from "@/components/three/hologram-card";

export default function AboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [showContent, setShowContent] = useState(true); // Show content immediately with hologram card

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { label: "Years Experience", value: "3+", icon: "🚀" },
    { label: "Projects Completed", value: "50+", icon: "💼" },
    { label: "Technologies", value: "15+", icon: "⚡" },
    { label: "Client Satisfaction", value: "100%", icon: "⭐" },
  ];

  const expertise = [
    {
      title: "Mern Stack Development",
      description:
        "Building responsive, accessible, and performant web applications with React, Next.js, and TypeScript.",
      icon: "⚛️",
      color: "#61dafb",
    },
    {
      title: "3D Visualization",
      description:
        "Creating immersive 3D experiences using Three.js and React Three Fiber for interactive web graphics.",
      icon: "🎨",
      color: "#ff6b6b",
    },
    {
      title: "Performance Optimization",
      description:
        "Implementing advanced optimization techniques to ensure lightning-fast load times and smooth interactions.",
      icon: "⚡",
      color: "#ffd93d",
    },
    {
      title: "UI/UX Design",
      description:
        "Crafting intuitive and visually stunning interfaces that prioritize user experience and accessibility.",
      icon: "✨",
      color: "#a855f7",
    },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen py-24 bg-black relative overflow-hidden"
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />

      {/* Animated Particles Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full animate-background-shift" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Hero Section with Particle Avatar */}
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            {/* Left Side - Hologram Card */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <HologramCard className="transform-gpu" />
            </div>

            {/* Right Side - Introduction */}
            <div className="order-1 lg:order-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Greeting */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h1 className="text-5xl md:text-6xl font-bold">
                    <span className="text-white">Hi, I'm </span>
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text-glow">
                      Uday Kiran
                    </span>
                    <motion.span
                      className="inline-block ml-4 text-4xl"
                      animate={{
                        rotate: [0, 14, -8, 14, -4, 10, 0],
                        scale: [1, 1.2, 1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    >
                      👋
                    </motion.span>
                  </h1>

                  <motion.p
                    className="text-xl text-gray-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 1 }}
                  >
                    A passionate{" "}
                    <span className="text-cyan-400 font-semibold">
                      Full-Stack Developer
                    </span>{" "}
                    crafting immersive digital experiences that blend
                    cutting-edge technology with stunning visual design.
                  </motion.p>
                </motion.div>

                {/* Animated Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.8 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                      className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300 group"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Hologram Info Panel */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-400/20 rounded-xl p-6 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    Hologram Identity System
                  </h3>
                  <p className="text-gray-400 text-sm">
                    The holographic identity card showcases real-time developer
                    metrics, skill progressions, and system status. Interact
                    with the card to reveal enhanced biometric data and
                    professional capabilities.
                  </p>
                </motion.div> */}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-32 space-y-20"
            >
              {/* About Story */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16"
              >
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-white mb-8">
                    My <span className="text-cyan-400">Journey</span>
                  </h2>
                  <div className="prose prose-invert space-y-4">
                    <p className="text-gray-300 text-lg leading-relaxed">
                      With over 3 years of experience in web development, I
                      specialize in building high-performance applications that
                      combine stunning visuals with robust functionality. My
                      journey began with a fascination for how code could bring
                      creative visions to life.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      Today, I focus on creating immersive digital experiences
                      using React, Three.js, and modern web technologies. I
                      believe in writing clean, maintainable code while pushing
                      the boundaries of what's possible on the web.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      When I'm not coding, you'll find me exploring new
                      technologies, contributing to open-source projects, or
                      sharing knowledge with the developer community.
                    </p>
                  </div>

                  {/* Education Timeline */}
                  <div className="mt-12">
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Education Timeline
                      </span>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </h3>

                    <div className="relative">
                      {/* Timeline Line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500" />

                      {/* Timeline Items */}
                      <div className="space-y-8">
                        {[
                          {
                            year: "2024-2027",
                            degree: "Bachelor's in Computer Science",
                            institution: "Chaitanya Bharathiya Institute of Technology",
                            description:
                              "Specialized in computer science and Engineering",
                            color: "from-cyan-400 to-blue-500",
                            orbColor: "bg-cyan-400",
                            glowColor: "shadow-cyan-400/50",
                          },
                          {
                            year: "2021-2024",
                            degree: "Diploma in Computer Science",
                            institution: "Institute of Technical Education",
                            description:
                              "Focus on Web Technologies and Cloud Computing",
                            color: "from-purple-400 to-indigo-500",
                            orbColor: "bg-purple-400",
                            glowColor: "shadow-purple-400/50",
                          },
                          {
                            year: "2020",
                            degree: "St.isaac Advent High School",
                            
                            description:
                              "",
                            color: "from-pink-400 to-rose-500",
                            orbColor: "bg-pink-400",
                            glowColor: "shadow-pink-400/50",
                          },
                          
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.2 * index, duration: 0.6 }}
                            className="relative pl-12 group"
                          >
                            {/* Colorful Orb */}
                            <motion.div
                              className={`absolute left-0 w-8 h-8 ${item.orbColor} rounded-full shadow-lg ${item.glowColor} flex items-center justify-center`}
                              whileHover={{ scale: 1.3, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <motion.div
                                className="w-3 h-3 bg-white rounded-full"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                              />
                            </motion.div>

                            {/* Pulsing Ring */}
                            <motion.div
                              className={`absolute left-0 w-8 h-8 ${item.orbColor} rounded-full opacity-0 group-hover:opacity-30`}
                              animate={{
                                scale: [1, 2, 1],
                                opacity: [0.5, 0, 0.5],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                              }}
                            />

                            {/* Content Card */}
                            <motion.div
                              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 group-hover:border-opacity-100 transition-all duration-300"
                              style={{
                                borderColor: `var(--border-color-${index})`,
                              }}
                              whileHover={{
                                y: -5,
                                boxShadow: `0 20px 40px -15px ${
                                  [
                                    "rgba(34, 211, 238, 0.4)",
                                    "rgba(168, 85, 247, 0.4)",
                                    "rgba(244, 114, 182, 0.4)",
                                    "rgba(251, 146, 60, 0.4)",
                                  ][index]
                                }`,
                              }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white`}
                                >
                                  {item.year}
                                </div>
                              </div>

                              <h4
                                className={`text-xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                              >
                                {item.degree}
                              </h4>

                              <p className="text-gray-300 font-medium mb-2 flex items-center gap-2">
                                <span className="text-lg">🎓</span>
                                {item.institution}
                              </p>

                              <p className="text-gray-400 text-sm">
                                {item.description}
                              </p>

                              {/* Decorative Corner */}
                              <div
                                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${item.color} opacity-5 rounded-bl-full`}
                              />
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Timeline End Indicator */}
                      <motion.div
                        className="relative pl-12 mt-8"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 1, duration: 0.6 }}
                      >
                        <div className="absolute left-0 w-8 h-8 bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            ✨
                          </motion.div>
                        </div>
                        <div className="text-gray-500 italic">
                          Journey continues...
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Expertise Cards */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white mb-6">
                    Areas of Expertise
                  </h3>
                  {expertise.map((item, index) => (
                    <motion.div
                      key={item.title}
                      variants={itemVariants}
                      className="group bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:bg-gradient-to-br hover:from-gray-800/80 hover:to-black/80 hover:border-cyan-400/50 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-3xl p-3 rounded-lg bg-icon-bg">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-gray-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                variants={itemVariants}
                className="text-center bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-400/20 rounded-2xl p-12 backdrop-blur-sm"
              >
                <h4 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Let's Create Something
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                    {" "}
                    Extraordinary
                  </span>
                </h4>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  I'm always excited to discuss new projects, creative ideas, or
                  opportunities to bring your vision to life with cutting-edge
                  technology.
                </p>
                <motion.button
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-400 hover:to-purple-400 rounded-lg font-semibold text-lg transition-all duration-300 inline-flex items-center gap-3 shadow-lg shadow-cyan-500/25"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start a Conversation
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </motion.svg>
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-background-shift {
          background: radial-gradient(
              circle at 20% 80%,
              rgba(120, 119, 198, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(255, 119, 198, 0.3) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 40%,
              rgba(120, 200, 255, 0.3) 0%,
              transparent 50%
            );
          animation: backgroundShift 20s ease-in-out infinite;
        }

        .animate-text-glow {
          text-shadow: 0 0 30px rgba(0, 255, 255, 0.5);
        }

        .bg-icon-bg {
          background-color: rgba(96, 165, 250, 0.125);
        }

        @keyframes backgroundShift {
          0%,
          100% {
            background: radial-gradient(
                circle at 20% 80%,
                rgba(120, 119, 198, 0.3) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 80% 20%,
                rgba(255, 119, 198, 0.3) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 40% 40%,
                rgba(120, 200, 255, 0.3) 0%,
                transparent 50%
              );
          }
          50% {
            background: radial-gradient(
                circle at 80% 20%,
                rgba(120, 119, 198, 0.3) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 20% 80%,
                rgba(255, 119, 198, 0.3) 0%,
                transparent 50%
              ),
              radial-gradient(
                circle at 60% 60%,
                rgba(120, 200, 255, 0.3) 0%,
                transparent 50%
              );
          }
        }
      `}</style>
    </section>
  );
}
