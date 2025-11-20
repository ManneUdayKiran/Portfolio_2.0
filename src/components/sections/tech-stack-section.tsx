"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// React Three Fiber imports removed to avoid ReactCurrentOwner errors
// All 3D functionality replaced with CSS-based interactive skill tree

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
    frontend: { count: 10, mastery: 95 },
    backend: { count: 4, mastery: 85 },
    database: { count: 3, mastery: 80 },
    tools: { count: 5, mastery: 90 },
    languages: { count: 3, mastery: 92 },
  };

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden py-20 section-skill-clusters">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-blue-900/10" />

      {/* Animated Grid Background (removed for cleaner skill clusters) */}
      {/* <div className="absolute inset-0 opacity-20 animated-grid" /> */}

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
              {/* Interactive Skills Visualization */}
              <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-gray-300 mb-1">💻 Tech Skills:</p>
                <p className="text-xs text-gray-400">• Hover for details</p>
                <p className="text-xs text-gray-400">• Click to explore</p>
              </div>

              {/* Skills Bubble Universe */}
              <div className="w-full h-full flex items-center justify-center p-8">
                <div className="relative w-full max-w-4xl h-full">
                  {/* Skills Bubble Grid - 5x5 Layout */}

                  {/* Row 1 */}
                  <div
                    data-name="React"
                    title="React"
                    data-tooltip="React • Level 95 • Frontend Framework"
                    className="absolute top-[20%] left-[10%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "react",
                        name: "React",
                        level: 95,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: ["Portfolio", "E-commerce", "SaaS Apps"],
                        unlocked: true,
                        description:
                          "Expert in React with hooks, context, and modern patterns",
                      })
                    }
                  >
                    <span className="text-lg">⚛️</span>
                    <span className="skill-name">React</span>
                  </div>

                  <div
                    data-name="Next.js"
                    title="Next.js"
                    data-tooltip="Next.js • Level 92 • React Framework"
                    className="absolute top-[12%] left-[25%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "nextjs",
                        name: "Next.js",
                        level: 92,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: ["SSR Apps", "Static Sites", "Full-stack"],
                        unlocked: true,
                        description:
                          "Advanced Next.js for SSR, SSG, and full-stack applications",
                      })
                    }
                  >
                    <span className="text-lg">🟢</span>
                    <span className="skill-name">Next.js</span>
                  </div>

                  <div
                    data-name="Vue.js"
                    title="Vue.js"
                    data-tooltip="Vue.js • Level 88 • Frontend Framework"
                    className="absolute top-[4%] left-[40%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "vue",
                        name: "Vue.js",
                        level: 88,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: [
                          "SPAs",
                          "Progressive Apps",
                          "Interactive UIs",
                        ],
                        unlocked: true,
                        description:
                          "Proficient in Vue.js ecosystem and composition API",
                      })
                    }
                  >
                    <span className="text-lg">💚</span>
                    <span className="skill-name">Vue.js</span>
                  </div>

                  <div
                    data-name="Tailwind CSS"
                    title="Tailwind CSS"
                    data-tooltip="Tailwind CSS • Level 95 • CSS Framework"
                    className="absolute top-[-5%] left-[55%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "tailwind",
                        name: "Tailwind CSS",
                        level: 95,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: [
                          "Al UI Projects",
                          "Design Systems",
                          "Responsive Design",
                        ],
                        unlocked: true,
                        description:
                          "Expert in Tailwind CSS and utility-first styling",
                      })
                    }
                  >
                    <span className="text-lg">🎨</span>
                    <span className="skill-name">Tailwind CSS</span>
                  </div>

                  <div
                    data-name="TypeScript"
                    title="TypeScript"
                    data-tooltip="TypeScript • Level 95 • Programming Language"
                    className="absolute top-[-14%] left-[70%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "typescript",
                        name: "TypeScript",
                        level: 95,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: [
                          "All Modern Projects",
                          "Type-safe Apps",
                          "Enterprise",
                        ],
                        unlocked: true,
                        description:
                          "Expert in TypeScript for type-safe development",
                      })
                    }
                  >
                    <span className="text-lg">📘</span>
                    <span className="skill-name">TypeScript</span>
                  </div>

                  {/* Row 2 */}
                  <div
                    data-name="Node.js"
                    title="Node.js"
                    data-tooltip="Node.js • Level 90 • Backend Runtime"
                    className="absolute top-[-5%] left-[10%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "nodejs",
                        name: "Node.js",
                        level: 90,
                        position: [0, 0, 0],
                        connections: [],
                        category: "backend",
                        projects: ["APIs", "Microservices", "Real-time Apps"],
                        unlocked: true,
                        description:
                          "Skilled in Node.js backend development and APIs",
                      })
                    }
                  >
                    <span className="text-lg">🟢</span>
                    <span className="skill-name">Node.js</span>
                  </div>

                  <div
                    data-name="Python"
                    title="Python"
                    data-tooltip="Python • Level 88 • Programming Language"
                    className="absolute top-[-14%] left-[25%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "python",
                        name: "Python",
                        level: 88,
                        position: [0, 0, 0],
                        connections: [],
                        category: "backend",
                        projects: ["APIs", "Data Processing", "Automation"],
                        unlocked: true,
                        description:
                          "Skilled in Python, Django, and data processing",
                      })
                    }
                  >
                    <span className="text-lg">🐍</span>
                    <span className="skill-name">Python</span>
                  </div>

                  <div
                    data-name="Express.js"
                    title="Express.js"
                    className="absolute top-[-22%] left-[40%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "express",
                        name: "Express.js",
                        level: 92,
                        position: [0, 0, 0],
                        connections: [],
                        category: "backend",
                        projects: ["REST APIs", "Microservices", "Web Servers"],
                        unlocked: true,
                        description:
                          "Expertise in Express.js and Node.js backend development",
                      })
                    }
                  >
                    <span className="text-lg">⚡</span>
                    <span className="skill-name">Express.js</span>
                  </div>

                  <div
                    data-name="JavaScript"
                    title="JavaScript"
                    data-tooltip="JavaScript • Level 95 • Programming Language"
                    className="absolute top-[-32%] left-[55%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "javascript",
                        name: "JavaScript",
                        level: 95,
                        position: [0, 0, 0],
                        connections: [],
                        category: "languages",
                        projects: ["All Web Projects", "Full-stack Apps"],
                        unlocked: true,
                        description: "Expert in modern JavaScript and ES6+",
                      })
                    }
                  >
                    <span className="text-lg">📜</span>
                    <span className="skill-name">JavaScript</span>
                  </div>

                  <div
                    data-name="Java"
                    title="Java"
                    className="absolute top-[-41%] left-[70%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "java",
                        name: "Java",
                        level: 80,
                        position: [0, 0, 0],
                        connections: [],
                        category: "languages",
                        projects: ["Enterprise Apps", "Spring Boot APIs"],
                        unlocked: true,
                        description:
                          "Solid foundation in Java and Spring framework",
                      })
                    }
                  >
                    <span className="text-lg">☕</span>
                    <span className="skill-name">Java</span>
                  </div>

                  {/* Row 3 */}
                  <div
                    data-name="MongoDB"
                    title="MongoDB"
                    data-tooltip="MongoDB • Level 85 • NoSQL Database"
                    className="absolute top-[-30%] left-[10%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "mongodb",
                        name: "MongoDB",
                        level: 85,
                        position: [0, 0, 0],
                        connections: [],
                        category: "database",
                        projects: [
                          "E-commerce",
                          "Content Management",
                          "Analytics",
                        ],
                        unlocked: true,
                        description:
                          "Proficient in MongoDB and NoSQL databases",
                      })
                    }
                  >
                    <span className="text-lg">🍃</span>
                    <span className="skill-name">MongoDB</span>
                  </div>

                  <div
                    data-name="PostgreSQL"
                    title="PostgreSQL"
                    className="absolute top-[-38%] left-[25%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "postgresql",
                        name: "PostgreSQL",
                        level: 82,
                        position: [0, 0, 0],
                        connections: [],
                        category: "database",
                        projects: [
                          "Complex Applications",
                          "Analytics",
                          "Enterprise",
                        ],
                        unlocked: true,
                        description:
                          "Advanced SQL and PostgreSQL database design",
                      })
                    }
                  >
                    <span className="text-lg">🐘</span>
                    <span className="skill-name">PostgreSQL</span>
                  </div>

                  <div
                    data-name="Docker"
                    title="Docker"
                    className="absolute top-[-47%] left-[40%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "docker",
                        name: "Docker",
                        level: 85,
                        position: [0, 0, 0],
                        connections: [],
                        category: "tools",
                        projects: [
                          "Containerization",
                          "DevOps",
                          "Microservices",
                        ],
                        unlocked: true,
                        description:
                          "Container orchestration and DevOps practices",
                      })
                    }
                  >
                    <span className="text-lg">🐳</span>
                    <span className="skill-name">Docker</span>
                  </div>

                  <div
                    data-name="Git/GitHub"
                    title="Git/GitHub"
                    className="absolute top-[-55%] left-[55%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "git",
                        name: "Git/GitHub",
                        level: 95,
                        position: [0, 0, 0],
                        connections: [],
                        category: "tools",
                        projects: [
                          "All Projects",
                          "Version Control",
                          "Collaboration",
                        ],
                        unlocked: true,
                        description:
                          "Advanced version control and collaboration workflows",
                      })
                    }
                  >
                    <span className="text-lg">🔧</span>
                    <span className="skill-name">Git/GitHub</span>
                  </div>

                  <div
                    data-name="Redux"
                    title="Redux"
                    className="absolute top-[-65%] left-[70%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "redux",
                        name: "Redux",
                        level: 88,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: [
                          "State Management",
                          "Complex Apps",
                          "Enterprise",
                        ],
                        unlocked: true,
                        description:
                          "Advanced state management with Redux and Zustand",
                      })
                    }
                  >
                    <span className="text-sm">🔄</span>
                    <span className="skill-name">Redux</span>
                  </div>

                  {/* Row 4 */}
                  <div
                    data-name="Framer Motion"
                    title="Framer Motion"
                    className="absolute top-[-55%] left-[10%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "framer",
                        name: "Framer Motion",
                        level: 90,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: ["Animations", "Interactive UI", "Modern UX"],
                        unlocked: true,
                        description:
                          "Advanced animations and interactive experiences",
                      })
                    }
                  >
                    <span className="text-sm">🎬</span>
                    <span className="skill-name">Framer Motion</span>
                  </div>

                  <div
                    data-name="SASS/SCSS"
                    title="SASS/SCSS"
                    className="absolute top-[-63%] left-[25%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "sass",
                        name: "SASS/SCSS",
                        level: 90,
                        position: [0, 0, 0],
                        connections: [],
                        category: "frontend",
                        projects: ["Styling Systems", "Component Libraries"],
                        unlocked: true,
                        description:
                          "Advanced CSS preprocessing and styling architectures",
                      })
                    }
                  >
                    <span className="text-sm">🎨</span>
                    <span className="skill-name">SASS/SCSS</span>
                  </div>

                  <div
                    data-name="GraphQL"
                    title="GraphQL"
                    className="absolute top-[-71%] left-[40%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "graphql",
                        name: "GraphQL",
                        level: 82,
                        position: [0, 0, 0],
                        connections: [],
                        category: "backend",
                        projects: ["Modern APIs", "Data Fetching", "Apollo"],
                        unlocked: true,
                        description: "Modern API development with GraphQL",
                      })
                    }
                  >
                    <span className="text-lg">🔗</span>
                    <span className="skill-name">GraphQL</span>
                  </div>

                  <div
                    data-name="Redis"
                    title="Redis"
                    className="absolute top-[-79%] left-[55%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "redis",
                        name: "Redis",
                        level: 82,
                        position: [0, 0, 0],
                        connections: [],
                        category: "database",
                        projects: ["Caching", "Sessions", "Real-time Features"],
                        unlocked: true,
                        description: "Advanced caching and session management",
                      })
                    }
                  >
                    <span className="text-lg">💎</span>
                    <span className="skill-name">Redis</span>
                  </div>

                  <div
                    data-name="AWS"
                    title="AWS"
                    className="absolute top-[-88%] left-[70%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "aws",
                        name: "AWS",
                        level: 78,
                        position: [0, 0, 0],
                        connections: [],
                        category: "tools",
                        projects: [
                          "Cloud Infrastructure",
                          "Serverless",
                          "CI/CD",
                        ],
                        unlocked: true,
                        description:
                          "Cloud infrastructure and serverless architectures",
                      })
                    }
                  >
                    <span className="text-sm">☁️</span>
                    <span className="skill-name">AWS</span>
                  </div>

                  {/* Row 5 */}
                  <div
                    data-name="Firebase"
                    title="Firebase"
                    className="absolute top-[-0%] left-[10%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "firebase",
                        name: "Firebase",
                        level: 85,
                        position: [0, 0, 0],
                        connections: [],
                        category: "tools",
                        projects: [
                          "Real-time Apps",
                          "Authentication",
                          "Hosting",
                        ],
                        unlocked: true,
                        description:
                          "Firebase services for rapid application development",
                      })
                    }
                  >
                    <span className="text-sm">🔥</span>
                    <span className="skill-name">Firebase</span>
                  </div>

                  <div
                    data-name="VS Code"
                    title="VS Code"
                    className="absolute top-[-80%] left-[25%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "vscode",
                        name: "VS Code",
                        level: 95,
                        position: [0, 0, 0],
                        connections: [],
                        category: "tools",
                        projects: ["Development", "Extensions", "Productivity"],
                        unlocked: true,
                        description:
                          "Expert-level proficiency in VS Code development environment",
                      })
                    }
                  >
                    <span className="text-sm">📝</span>
                    <span className="skill-name">VS Code</span>
                  </div>

                  <div
                    data-name="Figma"
                    title="Figma"
                    className="absolute top-[-80%] left-[40%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "figma",
                        name: "Figma",
                        level: 85,
                        position: [0, 0, 0],
                        connections: [],
                        category: "tools",
                        projects: [
                          "UI/UX Design",
                          "Prototyping",
                          "Design Systems",
                        ],
                        unlocked: true,
                        description:
                          "Advanced UI/UX design and prototyping skills",
                      })
                    }
                  >
                    <span className="text-sm">🎨</span>
                    <span className="skill-name">Figma</span>
                  </div>

                  <div
                    data-name="C++"
                    title="C++"
                    className="absolute top-[-80%] left-[55%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "cpp",
                        name: "C++",
                        level: 75,
                        position: [0, 0, 0],
                        connections: [],
                        category: "languages",
                        projects: [
                          "Algorithms",
                          "System Programming",
                          "Performance",
                        ],
                        unlocked: true,
                        description:
                          "Strong foundation in C++ and system programming",
                      })
                    }
                  >
                    <span className="text-sm">⚙️</span>
                    <span className="skill-name">C++</span>
                  </div>

                  <div
                    data-name="Linux"
                    title="Linux"
                    className="absolute top-[-80%] left-[70%] w-12 h-12 rounded-full skill-bubble flex items-center justify-center cursor-pointer hover:scale-110 shadow-lg backdrop-blur-md"
                    onClick={() =>
                      setSelectedNode({
                        id: "linux",
                        name: "Linux",
                        level: 80,
                        position: [0, 0, 0],
                        connections: [],
                        category: "tools",
                        projects: [
                          "Server Management",
                          "DevOps",
                          "System Admin",
                        ],
                        unlocked: true,
                        description:
                          "Proficient in Linux system administration and shell scripting",
                      })
                    }
                  >
                    <span className="text-sm">🐧</span>
                    <span className="skill-name">Linux</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              {/* <div className="absolute bottom-4 left-4 z-20 bg-black/70 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm text-gray-300 mb-2">Skill Clusters:</p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      Frontend (Top Left)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      Backend (Top Right)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      Database (Bottom Left)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      DevOps (Bottom Right)
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-xs text-gray-400">
                      Languages (Center Top)
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ⚡ Core Full-Stack at center
                </p>
              </div> */}
            </motion.div>
          </div>

          {/* Side Panel - Node Details & Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-800 p-6">
              {selectedNode ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        selectedNode.category === "frontend"
                          ? "bg-cyan-400"
                          : selectedNode.category === "backend"
                          ? "bg-green-400"
                          : selectedNode.category === "database"
                          ? "bg-orange-400"
                          : selectedNode.category === "tools"
                          ? "bg-purple-400"
                          : "bg-red-400"
                      }`}
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
                          className={`bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ${
                            selectedNode.category === "frontend"
                              ? "w-[95%]"
                              : selectedNode.category === "backend"
                              ? "w-[85%]"
                              : selectedNode.category === "database"
                              ? "w-[80%]"
                              : selectedNode.category === "tools"
                              ? "w-[90%]"
                              : "w-[92%]"
                          }`}
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
            </div>

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
                        className={`w-3 h-3 rounded-full ${
                          category === "frontend"
                            ? "bg-cyan-400"
                            : category === "backend"
                            ? "bg-green-400"
                            : category === "database"
                            ? "bg-orange-400"
                            : category === "tools"
                            ? "bg-purple-400"
                            : "bg-red-400"
                        }`}
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
            level system indicates my expertise depth. Like in RPGs, I&apos;m
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

        @keyframes skillFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes skillPulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }

        /* Skill Bubble Cluster Animations & Cluster-style visuals */
        .skill-bubble {
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.25);
          transition: all 0.35s ease;
          background: #3a3a3a; /* dark bubble */
          color: #10b981; /* green text */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          position: absolute;
          gap: 2px;
          border-radius: 50%;
          /* Initial state for entrance animation */
          transform: translate(calc(-50vw + 50%), calc(-50vh + 50%)) scale(0.3);
          opacity: 0;
          /* Animation sequence: entrance first, then floating */
          animation: distributeFromCenter 2s ease-out forwards, gentleFloat 6s ease-in-out infinite 2.5s;
        }

        /* Hover tooltip for skill details */
        .skill-bubble {
          position: relative;
        }

        .skill-bubble::before {
          content: attr(data-tooltip);
          position: absolute;
          bottom: 120%;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.9);
          color: #10b981;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1000;
          border: 1px solid #10b981;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .skill-bubble::after {
          content: '';
          position: absolute;
          bottom: 112%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 5px solid #10b981;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .skill-bubble:hover::before,
        .skill-bubble:hover::after {
          opacity: 1;
          visibility: visible;
        }

        /* Skill name text under icon */
        .skill-bubble .skill-name {
          font-size: 10px;
          font-weight: 500;
          color: #10b981;
          text-align: center;
          line-height: 1.2;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 100%;
        }

        /* small label inside bubble (emoji kept) */
        

        /* bottom semicircle accent */
        // .skill-bubble::after {
        //   content: '';
        //   position: absolute;
        //   left: 50%;
        //   transform: translateX(-50%);
        //   bottom: -6px;
        //   width: 60%;
        //   height: 12px;
        //   background: linear-gradient(0deg, rgba(16,185,129,0.95), rgba(16,185,129,0.75));
        //   border-radius: 50%;
        //   box-shadow: 0 2px 6px rgba(16,185,129,0.08);
        // }

        /* tooltip using data-name attribute */
        .skill-bubble::before {
          content: attr(data-name);
          position: absolute;
          top: -40px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 10px;
          font-size: 12px;
          white-space: nowrap;
          background: rgba(18,18,18,0.9);
          color: #e6ffe9;
          border-radius: 8px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease, transform 0.18s ease;
          box-shadow: 0 6px 18px rgba(0,0,0,0.6);
        }

        .skill-bubble:hover::before {
          opacity: 1;
          transform: translateX(-50%) translateY(-6px);
        }

        /* Staggered entrance animations for natural movement */
        .skill-bubble:nth-child(1) { animation-delay: 0s, 0.1s; }
        .skill-bubble:nth-child(2) { animation-delay: 0s, 0.2s; }
        .skill-bubble:nth-child(3) { animation-delay: 0s, 0.3s; }
        .skill-bubble:nth-child(4) { animation-delay: 0s, 0.4s; }
        .skill-bubble:nth-child(5) { animation-delay: 0s, 0.5s; }
        .skill-bubble:nth-child(6) { animation-delay: 0s, 0.6s; }
        .skill-bubble:nth-child(7) { animation-delay: 0s, 0.7s; }
        .skill-bubble:nth-child(8) { animation-delay: 0s, 0.8s; }
        .skill-bubble:nth-child(9) { animation-delay: 0s, 0.9s; }
        .skill-bubble:nth-child(10) { animation-delay: 0s, 1.0s; }
        .skill-bubble:nth-child(11) { animation-delay: 0s, 1.1s; }
        .skill-bubble:nth-child(12) { animation-delay: 0s, 1.2s; }
        .skill-bubble:nth-child(13) { animation-delay: 0s, 1.3s; }
        .skill-bubble:nth-child(14) { animation-delay: 0s, 1.4s; }
        .skill-bubble:nth-child(15) { animation-delay: 0s, 1.5s; }
        .skill-bubble:nth-child(16) { animation-delay: 0s, 1.6s; }
        .skill-bubble:nth-child(17) { animation-delay: 0s, 1.7s; }
        .skill-bubble:nth-child(18) { animation-delay: 0s, 1.8s; }
        .skill-bubble:nth-child(19) { animation-delay: 0s, 1.9s; }
        .skill-bubble:nth-child(20) { animation-delay: 0s, 2.0s; }

        /* Entrance animation - bubbles start clustered in center then distribute */
        @keyframes distributeFromCenter {
          0% {
            transform: translate(calc(-50vw + 50%), calc(-50vh + 50%)) scale(0.3);
            opacity: 0;
          }
          30% {
            opacity: 1;
            transform: translate(calc(-25vw + 50%), calc(-25vh + 50%)) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        /* Floating animation for continuous gentle movement */
        @keyframes gentleFloat { 
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          } 
          25% { 
            transform: translate(2px, -6px) scale(1); 
          } 
          50% { 
            transform: translate(-1px, -10px) scale(1); 
          } 
          75% { 
            transform: translate(3px, -4px) scale(1); 
          } 
        }

        /* Hover emphasis */
        .skill-bubble:hover { transform: scale(1.16) !important; z-index: 30; box-shadow: 0 8px 28px rgba(0,0,0,0.6); }

        /* Core node gentle animation */
        .glassmorphism-core { animation: gentleFloat 8s ease-in-out infinite, corePulse 4s ease-in-out infinite; }
        @keyframes corePulse { 0%,100%{ box-shadow:0 0 18px rgba(16,185,129,0.18);}50%{box-shadow:0 0 36px rgba(16,185,129,0.28);} }
          position: relative;
          z-index: 3;
        }

        .d-secondary {
          background: rgba(34, 197, 94, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .d-secondary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #22c55e, #10b981, #22c55e, #16a34a, #22c55e);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .d-secondary > * {
          position: relative;
          z-index: 3;
        }

        .d-tertiary {
          background: rgba(249, 115, 22, 0.15);
          border: none;
          position: relative;
          box-shadow: 0 8px 32px rgba(249, 115, 22, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .d-tertiary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #f97316, #ef4444, #f97316, #ea580c, #f97316);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        . {
          background: rgba(34, 197, 94, 0.15);
          border: none;
          position: relative;
          box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: conic-gradient(0deg, #22c55e, #84cc16, #22c55e, #16a34a, #22c55e);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .-secondary {
          background: rgba(37, 99, 235, 0.15);
          border: none;
          position: relative;
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .-secondary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #2563eb, #6366f1, #2563eb, #3b82f6, #2563eb);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .e {
          background: rgba(249, 115, 22, 0.15);
          border: none;
          position: relative;
          box-shadow: 0 8px 32px rgba(249, 115, 22, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .e::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: conic-gradient(0deg, #f97316, #f59e0b, #f97316, #ea580c, #f97316);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .e-secondary {
          background: rgba(59, 130, 246, 0.15);
          border: none;
          position: relative;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .e-secondary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #3b82f6, #0ea5e9, #3b82f6, #2563eb, #3b82f6);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .
          background: rgba(168, 85, 247, 0.15);
          border: none;
          position: relative;
          box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .before {
          content: '';
          position: absolute;
          inset: -3px;
          background: conic-gradient(0deg, #a855f7, #ec4899, #a855f7, #8b5cf6, #a855f7);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }
        }

        .es-secondary {
          background: rgba(239, 68, 68, 0.15);
          border: none;
          position: relative;
          box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .es-secondary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #ef4444, #ec4899, #ef4444, #f97316, #ef4444);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        /* Additional  for New Skills */
        .d-quaternary {
          background: rgba(59, 130, 246, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .d-quaternary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #3b82f6, #1d4ed8, #3b82f6, #2563eb, #3b82f6);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .d-quaternary > * {
          position: relative;
          z-index: 3;
        }

        .-tertiary {
          background: rgba(34, 197, 94, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .-tertiary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #22c55e, #15803d, #22c55e, #16a34a, #22c55e);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .-tertiary > * {
          position: relative;
          z-index: 3;
        }

        .-quaternary {
          background: rgba(16, 185, 129, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .-quaternary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #10b981, #059669, #10b981, #14b8a6, #10b981);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .-quaternary > * {
          position: relative;
          z-index: 3;
        }

        .ertiary {
          background: rgba(59, 130, 246, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .ertiary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #3b82f6, #0284c7, #3b82f6, #0ea5e9, #3b82f6);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .ertiary > * {
          position: relative;
          z-index: 3;
        }

        .uaternary {
          background: rgba(249, 115, 22, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(249, 115, 22, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .uaternary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #f97316, #ea580c, #f97316, #dc2626, #f97316);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .uaternary > * {
          position: relative;
          z-index: 3;
        }

        .es-tertiary {
          background: rgba(168, 85, 247, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 32px rgba(168, 85, 247, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .es-tertiary::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #a855f7, #7c3aed, #a855f7, #8b5cf6, #a855f7);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .es-tertiary > * {
          position: relative;
          z-index: 3;
        }

        /* Extra Skills CSS */
        .xtra {
          background: rgba(99, 102, 241, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 6px 24px rgba(99, 102, 241, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .xtra::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #6366f1, #4f46e5, #6366f1, #7c3aed, #6366f1);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .xtra > * {
          position: relative;
          z-index: 3;
        }

        .e-extra {
          background: rgba(239, 68, 68, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 6px 24px rgba(239, 68, 68, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .e-extra::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #ef4444, #dc2626, #ef4444, #f97316, #ef4444);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .e-extra > * {
          position: relative;
          z-index: 3;
        }

        .d-extra {
          background: rgba(236, 72, 153, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 6px 24px rgba(236, 72, 153, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .d-extra::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #ec4899, #be185d, #ec4899, #f97316, #ec4899);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .d-extra > * {
          position: relative;
          z-index: 3;
        }

        .-extra {
          background: rgba(16, 185, 129, 0.15);
          border: none;
          position: relative;
          z-index: 2;
          box-shadow: 0 6px 24px rgba(16, 185, 129, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .-extra::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(0deg, #10b981, #059669, #10b981, #14b8a6, #10b981);
          border-radius: 50%;
          z-index: -1;
          /* removed spin animation */
        }

        .-extra > * {
          position: relative;
          z-index: 3;
        }

        /* Ensure all ave proper z-index layering */
        .d-tertiary,
        .d-quaternary,
        .d-extra,
        .,
        .-secondary,
        .-tertiary,
        .-quaternary,
        .-extra,
        .e,
        .e-secondary,
        .e-extra,
        .        .econdary,
        .ertiary,
        .uaternary,
        .xtra,
        .es,
        .es-secondary,
        .es-tertiary {
          position: relative;
          z-index: 2;
        }

        /* Ensure all child elements (icons) are visible above the background */
        .d-tertiary > *,
        .d-quaternary > *,
        .d-extra > *,
        . > *,
        .-secondary > *,
        .-tertiary > *,
        .-quaternary > *,
        .e > *,
        .e-secondary > *,
        .e-extra > *,
        . *,
        .econdary > *,
        .ertiary > *,
        .uaternary > *,
        .xtra > *,
        .es > *,
        .es-secondary > *,
        .es-tertiary > * {
          position: relative;
          z-index: 3;
        }

        /* Removed all spin animations */

        /* Cluster-based staggered animations */
        .d .skill-bubble {
          animation-delay: 0s;
        }

        .d .skill-bubble:nth-of-type(2) {
          animation-delay: -1.5s;
        }

        .d .skill-bubble:nth-of-type(3) {
          animation-delay: -3s;
        }

        . .skill-bubble {
          animation-delay: -2s;
        }

        . .skill-bubble:nth-of-type(2) {
          animation-delay: -3.5s;
        }

        .e .skill-bubble {
          animation-delay: -4s;
        }

        .skill-bubble {
          animation-delay: -1s;
        }

        .es .skill-bubble {
          animation-delay: -2.5s;
        }

        /* Removed clusterFloat animation with rotation */

        /* Removed bubbleRotate animation */

        /* Cluster hover effects */
        .skill-bubble:hover {
          transform: scale(1.15) !important;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
          z-index: 10;
        }

        /* Core node special animation */
        .          animation: coreOrbit 12s ease-in-out infinite, corePulse 3s ease-in-out infinite;
        }

        @keyframes coreOrbit {
          0%, 100% { 
            transform: translateX(0px) translateY(0px) scale(1); 
          }
          25% { 
            transform: translateX(5px) translateY(-8px) scale(1.05); 
          }
          50% { 
            transform: translateX(-5px) translateY(5px) scale(1.1); 
          }
          75% { 
            transform: translateX(8px) translateY(3px) scale(1.05); 
          }
        }

        @keyframes corePulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); 
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); 
          }
        }

        /* Enhanced hover effects for /
        .ver,
        .d:hover,
        .d-secondary:hover,
        .d-tertiary:hover,
        .d-quaternary:hover,
        .d-extra:hover,
        .:hover,
        .-secondary:hover,
        .-tertiary:hover,
        .-quaternary:hover,
        .-extra:hover,
        .e:hover,
        .e-secondary:hover,
        .e-extra:hover,
        .over,
        .econdary:hover,
        .ertiary:hover,
        .uaternary:hover,
        .xtra:hover,
        .es:hover,
        .es-secondary:hover,
        .es-tertiary:hover {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 12px 40px rgba(139, 92, 246, 0.5),
                      inset 0 2px 0 rgba(255, 255, 255, 0.3),
                      0 0 20px rgba(139, 92, 246, 0.4);
        }

        .ver::before,
        .d:hover::before,
        .d-secondary:hover::before,
        .d-tertiary:hover::before,
        .d-quaternary:hover::before,
        .d-extra:hover::before,
        .:hover::before,
        .-secondary:hover::before,
        .-tertiary:hover::before,
        .-quaternary:hover::before,
        .e:hover::before,
        .e-secondary:hover::before,
        .e-extra:hover::before,
        .over::before,
        .econdary:hover::before,
        .ertiary:hover::before,
        .uaternary:hover::before,
        .xtra:hover::before,
        .es:hover::before,
        .es-secondary:hover::before,
        .es-tertiary:hover::before {
          inset: -4px;
          filter: brightness(1.3) saturate(1.2);

        /* Hide any large rotating background rods/lines inside this section */
        .section-skill-clusters .animated-grid,
        .section-skill-clusters .aurora-rod,
        .section-skill-clusters .aurora-bar,
        .section-skill-clusters .ribbon,
        .section-skill-clusters .neon-rod,
        .section-skill-clusters .floating-bar,
        .section-skill-clusters .long-streak {
          display: none !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
          animation-duration: 1s;
        }
      `}</style>
    </section>
  );
}
