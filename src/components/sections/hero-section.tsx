"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useTypingEffect } from "@/hooks/use-typing-effect";
// removed useLoopingTypingEffect import (we implement local looping logic)
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import * as THREE from "three";
import FloatingBlob from "@/components/three/floating-blob";
import AuroraBackground from "@/components/three/aurora-background";
import AuroraCSS from "@/components/three/aurora-css";
import ParticleField from "@/components/three/particle-field";
import Fireflies from "@/components/three/fireflies";
import RippleEffect from "@/components/three/ripple-effect";

export default function HeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [showProfession, setShowProfession] = useState(false);
  const [nameGlow, setNameGlow] = useState(false);
  const [auroraIndex, setAuroraIndex] = useState(0);

  // Aurora background variants
  const auroraBackgrounds = [
    "from-slate-900/95 via-purple-900/90 to-indigo-900/95",
    "from-indigo-900/95 via-purple-800/90 to-pink-900/95",
    "from-purple-900/95 via-blue-800/90 to-cyan-900/95",
    "from-blue-900/95 via-indigo-800/90 to-purple-900/95",
  ];

  // Name types once and stays
  const nameTyping = useTypingEffect({
    text: "Uday Kiran",
    speed: 150,
    delay: 500,
  });

  // Local looping profession typing (starts only after showProfession === true)
  const professions = [
    "Full Stack Developer",
    "Creative Coder",
    "UI/UX Enthusiast",
  ];
  const [professionText, setProfessionText] = useState("");
  const profRef = useRef({ index: 0, text: "", isDeleting: false });
  const profTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (nameTyping.isComplete) {
      const timer = setTimeout(() => setShowProfession(true), 500);
      return () => clearTimeout(timer);
    }
  }, [nameTyping.isComplete]);

  useEffect(() => {
    if (!showProfession) return;

    const typeSpeed = 120;
    const deleteSpeed = 80;
    const delayBetween = 2500;
    const initialDelay = 200;

    let mounted = true;

    const tick = () => {
      if (!mounted) return;
      const state = profRef.current;
      const full = professions[state.index];

      if (!state.isDeleting) {
        // type next char
        state.text = full.slice(0, state.text.length + 1);
        setProfessionText(state.text);

        if (state.text === full) {
          // Completed typing: wait then start deleting
          profTimeout.current = setTimeout(() => {
            state.isDeleting = true;
            tick();
          }, delayBetween);
        } else {
          profTimeout.current = setTimeout(tick, typeSpeed);
        }
      } else {
        // deleting
        state.text = full.slice(0, state.text.length - 1);
        setProfessionText(state.text);

        if (state.text === "") {
          // Move to next profession and start typing again
          state.isDeleting = false;
          state.index = (state.index + 1) % professions.length;
          profTimeout.current = setTimeout(tick, typeSpeed);
        } else {
          profTimeout.current = setTimeout(tick, deleteSpeed);
        }
      }
    };

    profTimeout.current = setTimeout(tick, initialDelay);

    return () => {
      mounted = false;
      if (profTimeout.current) clearTimeout(profTimeout.current);
    };
    // only re-run if showProfession toggles (we want the loop to run continuously after start)
  }, [showProfession]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.5 } },
  };

  return (
    <section
      id="home"
      ref={ref}
      className={`min-h-screen relative overflow-hidden bg-gradient-to-br transition-all duration-1000 cursor-ripple ${auroraBackgrounds[auroraIndex]}`}
    >
      {/* Aurora Borealis Background */}
      <AuroraCSS />

      {/* Interactive 3D Ripple Effect */}
      <div className="absolute inset-0 z-3">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{ alpha: true, antialias: true }}
          style={{ pointerEvents: "auto" }}
        >
          <Suspense fallback={null}>
            <RippleEffect maxRipples={12} />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Side - Professional Introduction */}
            <motion.div
              variants={leftVariants}
              className="space-y-8 relative z-10"
            >
              <div className="space-y-6">
                <motion.div
                  className="text-sm text-gray-400 font-mono tracking-widest uppercase border-l-2 border-cyan-500 pl-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Software Engineer & 3D Developer
                </motion.div>

                <div className="space-y-2">
                  <h1
                    id="hero-name"
                    className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                  >
                    <span className="block text-white">Uday Kiran</span>
                  </h1>

                  {showProfession && (
                    <motion.h2
                      className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <span className="font-mono">
                        {professionText}
                        <span className="animate-pulse text-cyan-400">_</span>
                      </span>
                    </motion.h2>
                  )}
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: showProfession ? 1 : 0,
                  y: showProfession ? 0 : 20,
                }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg text-gray-400 leading-relaxed max-w-2xl font-light"
              >
                Specializing in building exceptional digital experiences with{" "}
                <span className="text-cyan-400 font-medium">
                  React, Three.js,
                </span>{" "}
                using cutting-edge technologies. Specializing in{" "}
                <span className="text-purple-300 font-semibold">React</span>,{" "}
                <span className="text-blue-300 font-semibold">Three.js</span>,
                and modern web technologies. Transforming complex ideas into
                elegant, high-performance solutions.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: showProfession ? 1 : 0,
                  y: showProfession ? 0 : 20,
                }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex flex-wrap gap-4"
              >
                <motion.button
                  className="group px-8 py-4 bg-white text-black hover:bg-gray-100 rounded-lg font-medium text-base transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document
                      .querySelector("#projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="flex items-center gap-2">
                    View Projects
                    <motion.span
                      className="inline-block"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </motion.button>

                <motion.button
                  className="group px-8 py-4 border border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-lg font-medium text-base transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get In Touch
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: showProfession ? 1 : 0,
                }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="flex items-center gap-6 pt-4"
              >
                <span className="text-sm text-gray-500 font-mono">
                  Connect:
                </span>
                {[
                  {
                    name: "GitHub",
                    href: "https://github.com/ManneUdayKiran",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                  {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/uday-kiran-536520282/",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    ),
                  },
                  {
                    name: "Twitter",
                    href: "https://twitter.com",
                    icon: (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    ),
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                  >
                    <span className="block group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - 3D Floating Blob */}
            <motion.div
              variants={rightVariants}
              className="relative h-96 lg:h-full"
            >
              <div className="absolute inset-0">
                <Canvas
                  camera={{ position: [0, 0, 6], fov: 50 }}
                  gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                    stencil: false,
                    depth: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2,
                  }}
                >
                  <Suspense fallback={null}>
                    {/* Shader Aurora Background */}
                    <AuroraBackground />

                    {/* Enhanced atmospheric lighting */}
                    <ambientLight intensity={0.3} color="#4f46e5" />

                    {/* Main key light with blue tint */}
                    <directionalLight
                      position={[5, 5, 5]}
                      intensity={1.5}
                      color="#60a5fa"
                      castShadow
                    />

                    {/* Purple fill light */}
                    <pointLight
                      position={[10, 10, 10]}
                      intensity={1.0}
                      color="#8b5cf6"
                      distance={25}
                      decay={2}
                    />

                    {/* Pink accent light */}
                    <pointLight
                      position={[-8, -8, 8]}
                      intensity={0.8}
                      color="#ec4899"
                      distance={20}
                      decay={2}
                    />

                    {/* Cyan rim light */}
                    <pointLight
                      position={[0, 10, -10]}
                      intensity={0.6}
                      color="#06b6d4"
                      distance={18}
                      decay={2}
                    />

                    {/* Dramatic rim lighting */}
                    <spotLight
                      position={[-5, 0, 10]}
                      angle={0.4}
                      penumbra={0.6}
                      intensity={0.8}
                      color="#3b82f6"
                      distance={30}
                      decay={2}
                    />

                    <FloatingBlob position={[0, 0, 0]} />
                    <Fireflies
                      count={12}
                      onHit={() => {
                        setNameGlow(true);
                        setAuroraIndex(
                          (prev) => (prev + 1) % auroraBackgrounds.length
                        );
                        setTimeout(() => setNameGlow(false), 2000);
                      }}
                    />
                  </Suspense>
                </Canvas>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="relative group cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() =>
            document
              .querySelector("#projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {/* Outer glow */}
          <div className="absolute inset-0 w-8 h-12 border-2 border-cyan-400/60 rounded-full blur-sm"></div>

          {/* Main indicator */}
          <div className="relative w-8 h-12 border-2 border-cyan-400 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <motion.div
              className="w-1.5 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-2 shadow-lg"
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Scroll text */}
          <motion.p
            className="absolute top-16 left-1/2 transform -translate-x-1/2 text-cyan-300/80 text-sm font-medium tracking-wider whitespace-nowrap"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
