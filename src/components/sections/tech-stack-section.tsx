"use client";

import { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import SkillTree from "../three/skill-tree";

interface SkillNode {
  id: string;
  name: string;
  level: number;
  position: [number, number, number];
  connections: string[];
  category: "frontend" | "backend" | "database" | "tools" | "languages";
  projects: string[];
  unlocked: boolean;
  description: string;
}

export default function TechStackSection() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 0, 10]);

  const handleNodeHover = (node: SkillNode | null) => {
    setSelectedNode(node);
  };

  const categoryStats = {
    frontend: { count: 7, mastery: 95 },
    backend: { count: 2, mastery: 85 },
    database: { count: 2, mastery: 80 },
    tools: { count: 2, mastery: 90 },
    languages: { count: 2, mastery: 92 },
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-blue-900/10" />

      {/* Animated Grid Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Interactive Skill Tree
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my technical skills like an RPG skill tree. Click and hover
            on nodes to discover my expertise, projects, and the connections
            between different technologies.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-[600px]">
          {/* Skill Tree Visualization */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="h-[600px] bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 overflow-hidden relative"
            >
              {/* Controls Instructions */}
              <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-gray-300 mb-1">🎮 Controls:</p>
                <p className="text-xs text-gray-400">
                  • Click & drag to rotate
                </p>
                <p className="text-xs text-gray-400">• Scroll to zoom</p>
                <p className="text-xs text-gray-400">
                  • Hover nodes for details
                </p>
              </div>

              {/* Skill Tree Canvas */}
              <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
                className="w-full h-full"
              >
                <PerspectiveCamera
                  makeDefault
                  position={cameraPosition}
                  fov={75}
                />

                {/* Lighting */}
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.5} />
                <pointLight
                  position={[-10, -10, -10]}
                  intensity={0.3}
                  color="#4f46e5"
                />

                {/* Skill Tree Component */}
                <SkillTree onNodeHover={handleNodeHover} />

                {/* Controls */}
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  minDistance={5}
                  maxDistance={20}
                  maxPolarAngle={Math.PI / 1.5}
                  minPolarAngle={Math.PI / 4}
                />
              </Canvas>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-gray-300 mb-2">Categories:</p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                    <span className="text-xs text-gray-400">Frontend</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs text-gray-400">Backend</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-orange-400"></div>
                    <span className="text-xs text-gray-400">Database</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                    <span className="text-xs text-gray-400">Tools</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <span className="text-xs text-gray-400">Languages</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Side Panel - Node Details & Stats */}
          <div className="space-y-6">
            {/* Selected Node Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-800 p-6"
            >
              {selectedNode ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: {
                          frontend: "#61dafb",
                          backend: "#68d391",
                          database: "#f6ad55",
                          tools: "#9f7aea",
                          languages: "#fc8181",
                        }[selectedNode.category],
                      }}
                    />
                    <h3 className="text-xl font-bold text-white">
                      {selectedNode.name}
                    </h3>
                    <span className="text-sm bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                      LV.{selectedNode.level}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4">
                    {selectedNode.description}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">
                        Category
                      </p>
                      <p className="text-white capitalize">
                        {selectedNode.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-1">
                        Projects
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedNode.projects.map((project, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-400">Mastery</span>
                        <span className="text-sm text-white">
                          {categoryStats[selectedNode.category]?.mastery || 85}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${
                              categoryStats[selectedNode.category]?.mastery ||
                              85
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Select a Skill Node
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Hover or click on any node in the skill tree to explore my
                    expertise and related projects.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Category Overview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-800 p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Skill Categories
              </h3>
              <div className="space-y-3">
                {Object.entries(categoryStats).map(([category, stats]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: {
                            frontend: "#61dafb",
                            backend: "#68d391",
                            database: "#f6ad55",
                            tools: "#9f7aea",
                            languages: "#fc8181",
                          }[category as keyof typeof categoryStats],
                        }}
                      />
                      <span className="text-sm text-gray-300 capitalize">
                        {category}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">
                        {stats.count} skills
                      </p>
                      <p className="text-sm text-white">{stats.mastery}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Game-like Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-800 p-6"
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Developer Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Skills Unlocked</span>
                  <span className="text-white font-bold">15/15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Experience Level</span>
                  <span className="text-white font-bold">Senior</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Years of Experience</span>
                  <span className="text-white font-bold">3+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Projects Completed</span>
                  <span className="text-white font-bold">50+</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 max-w-2xl mx-auto">
            This interactive skill tree represents my journey as a developer.
            Each connection shows how technologies relate to each other, and the
            level system indicates my expertise depth. Like in RPGs, I'm
            constantly leveling up and unlocking new abilities! 🎮
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </section>
  );
}
