"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

interface HologramCardProps {
  className?: string;
}

export default function HologramCard({ className = "" }: HologramCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        y: [0, -10, 0],
        rotateY: isHovered ? 5 : 0,
        rotateX: isHovered ? -2 : 0,
      }}
      transition={{
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateY: {
          duration: 0.3,
          ease: "easeOut",
        },
        rotateX: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Main Hologram Card */}
      <motion.div
        className="relative w-80 h-96 rounded-2xl overflow-hidden"
        animate={{
          boxShadow: isHovered
            ? [
                "0 0 20px rgba(0, 255, 255, 0.3)",
                "0 0 40px rgba(0, 255, 255, 0.5)",
                "0 0 20px rgba(0, 255, 255, 0.3)",
              ]
            : "0 0 20px rgba(0, 255, 255, 0.2)",
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Holographic Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Scan Lines */}
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "0% 100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 255, 0.1) 2px,
                rgba(0, 255, 255, 0.1) 4px
              )`,
              backgroundSize: "100% 20px",
            }}
          />

          {/* Holographic Shimmer */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.2) 50%, transparent 70%)",
                "linear-gradient(45deg, transparent 60%, rgba(0, 255, 255, 0.2) 80%, transparent 100%)",
                "linear-gradient(45deg, transparent 30%, rgba(0, 255, 255, 0.2) 50%, transparent 70%)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Corner Glow Effects */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-cyan-400 rounded-full opacity-60 blur-sm" />
          <div className="absolute top-2 right-2 w-3 h-3 bg-blue-400 rounded-full opacity-40 blur-sm" />
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-purple-400 rounded-full opacity-40 blur-sm" />
          <div className="absolute bottom-2 right-2 w-4 h-4 bg-cyan-400 rounded-full opacity-60 blur-sm" />

          {/* Grid Overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        {/* Profile Content */}
        <div className="relative z-20 p-8 h-full flex flex-col items-center justify-center">
          {/* Avatar Image Placeholder */}
          <motion.div
            className="relative mb-6"
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border-2 border-cyan-400/50 overflow-hidden relative">
              {/* Placeholder Avatar - Replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30 flex items-center justify-center">
                <motion.div
                  className="text-4xl font-bold text-white"
                  animate={{
                    textShadow: isHovered
                      ? "0 0 20px rgba(0, 255, 255, 0.8)"
                      : "0 0 10px rgba(0, 255, 255, 0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  UK
                </motion.div>
              </div>

              {/* Avatar Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isHovered
                    ? "0 0 30px rgba(0, 255, 255, 0.6)"
                    : "0 0 15px rgba(0, 255, 255, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Floating Particles Around Avatar */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  animate={{
                    x: [
                      Math.cos((i / 8) * Math.PI * 2) * 80,
                      Math.cos((i / 8) * Math.PI * 2) * 90,
                      Math.cos((i / 8) * Math.PI * 2) * 80,
                    ],
                    y: [
                      Math.sin((i / 8) * Math.PI * 2) * 80,
                      Math.sin((i / 8) * Math.PI * 2) * 90,
                      Math.sin((i / 8) * Math.PI * 2) * 80,
                    ],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Identity Information */}
          <motion.div
            className="text-center space-y-3"
            animate={{
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3
              className="text-2xl font-bold text-white"
              animate={{
                textShadow: isHovered
                  ? "0 0 15px rgba(0, 255, 255, 0.8)"
                  : "0 0 10px rgba(0, 255, 255, 0.4)",
              }}
            >
              Uday Kiran
            </motion.h3>

            <motion.p
              className="text-cyan-400 font-mono text-sm tracking-wider"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              FULL-STACK DEVELOPER
            </motion.p>

            <div className="space-y-2 text-xs text-gray-300">
              <motion.div
                className="flex justify-between font-mono"
                animate={{
                  color: isHovered ? "#00ffff" : "#a0aec0",
                }}
              >
                <span>ID:</span>
                <span>DEV-001</span>
              </motion.div>
              <motion.div
                className="flex justify-between font-mono"
                animate={{
                  color: isHovered ? "#00ffff" : "#a0aec0",
                }}
              >
                <span>LEVEL:</span>
                <span>EXPERT</span>
              </motion.div>
              <motion.div
                className="flex justify-between font-mono"
                animate={{
                  color: isHovered ? "#00ffff" : "#a0aec0",
                }}
              >
                <span>STATUS:</span>
                <motion.span
                  animate={{
                    color: ["#00ff00", "#00ffff", "#00ff00"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ACTIVE
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Progress Bars */}
          <div className="mt-6 w-full space-y-2">
            {[
              { skill: "React", level: 95 },
              { skill: "Three.js", level: 88 },
              { skill: "Node.js", level: 85 },
            ].map((item, index) => (
              <motion.div
                key={item.skill}
                className="space-y-1"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <div className="flex justify-between text-xs font-mono text-gray-400">
                  <span>{item.skill}</span>
                  <span>{item.level}%</span>
                </div>
                <div className="h-1 bg-gray-700/50 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level}%` }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Glowing Edges */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? [
                  "inset 0 0 20px rgba(0, 255, 255, 0.3)",
                  "inset 0 0 40px rgba(0, 255, 255, 0.5)",
                  "inset 0 0 20px rgba(0, 255, 255, 0.3)",
                ]
              : "inset 0 0 20px rgba(0, 255, 255, 0.1)",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Base Projection Effect */}
      <motion.div
        className="absolute -bottom-2 left-1/2 w-60 h-4 -translate-x-1/2 rounded-full"
        animate={{
          background: isHovered
            ? "radial-gradient(ellipse, rgba(0, 255, 255, 0.4) 0%, transparent 70%)"
            : "radial-gradient(ellipse, rgba(0, 255, 255, 0.2) 0%, transparent 70%)",
          scaleX: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          filter: "blur(4px)",
        }}
      />
    </motion.div>
  );
}
