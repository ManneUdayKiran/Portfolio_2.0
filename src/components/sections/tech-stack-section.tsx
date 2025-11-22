"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";

interface SkillNode {
  id: string;
  name: string;
  level: number;
  category: "frontend" | "backend" | "database" | "tools" | "languages";
  projects: string[];
  description: string;
  emoji: string;
}

const SKILLS_DATA: SkillNode[] = [
  {
    id: "react",
    name: "React",
    level: 95,
    category: "frontend",
    projects: ["Portfolio", "E-commerce", "SaaS Apps"],
    description: "Expert in React with hooks, context, and modern patterns",
    emoji: "⚛️",
  },
  {
    id: "nextjs",
    name: "Next.js",
    level: 92,
    category: "frontend",
    projects: ["SSR Apps", "Static Sites", "Full-stack"],
    description: "Advanced Next.js for SSR, SSG, and full-stack applications",
    emoji: "🟢",
  },
  {
    id: "vue",
    name: "Vue.js",
    level: 88,
    category: "frontend",
    projects: ["SPAs", "Progressive Apps", "Interactive UIs"],
    description: "Proficient in Vue.js ecosystem and composition API",
    emoji: "💚",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    level: 95,
    category: "frontend",
    projects: ["All UI Projects", "Design Systems", "Responsive Design"],
    description: "Expert in Tailwind CSS and utility-first styling",
    emoji: "🎨",
  },
  {
    id: "typescript",
    name: "TypeScript",
    level: 95,
    category: "languages",
    projects: ["All Modern Projects", "Type-safe Apps", "Enterprise"],
    description: "Expert in TypeScript for type-safe development",
    emoji: "📘",
  },
  {
    id: "nodejs",
    name: "Node.js",
    level: 90,
    category: "backend",
    projects: ["APIs", "Microservices", "Real-time Apps"],
    description: "Skilled in Node.js backend development and APIs",
    emoji: "🟢",
  },
  {
    id: "python",
    name: "Python",
    level: 88,
    category: "backend",
    projects: ["APIs", "Data Processing", "Automation"],
    description: "Skilled in Python, Django, and data processing",
    emoji: "🐍",
  },
  {
    id: "express",
    name: "Express.js",
    level: 92,
    category: "backend",
    projects: ["REST APIs", "Microservices", "Web Servers"],
    description: "Expertise in Express.js and Node.js backend development",
    emoji: "⚡",
  },
  {
    id: "javascript",
    name: "JavaScript",
    level: 95,
    category: "languages",
    projects: ["All Web Projects", "Full-stack Apps"],
    description: "Expert in modern JavaScript and ES6+",
    emoji: "📜",
  },
  {
    id: "java",
    name: "Java",
    level: 80,
    category: "languages",
    projects: ["Enterprise Apps", "Spring Boot APIs"],
    description: "Solid foundation in Java and Spring framework",
    emoji: "☕",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    level: 85,
    category: "database",
    projects: ["E-commerce", "Content Management", "Analytics"],
    description: "Proficient in MongoDB and NoSQL databases",
    emoji: "🍃",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    level: 82,
    category: "database",
    projects: ["Complex Applications", "Analytics", "Enterprise"],
    description: "Advanced SQL and PostgreSQL database design",
    emoji: "🐘",
  },
  {
    id: "docker",
    name: "Docker",
    level: 85,
    category: "tools",
    projects: ["Containerization", "DevOps", "Microservices"],
    description: "Container orchestration and DevOps practices",
    emoji: "🐳",
  },
  {
    id: "git",
    name: "Git/GitHub",
    level: 95,
    category: "tools",
    projects: ["All Projects", "Version Control", "Collaboration"],
    description: "Advanced version control and collaboration workflows",
    emoji: "🔧",
  },
  {
    id: "redux",
    name: "Redux",
    level: 88,
    category: "frontend",
    projects: ["State Management", "Complex Apps", "Enterprise"],
    description: "Advanced state management with Redux and Zustand",
    emoji: "🔄",
  },
  {
    id: "framer",
    name: "Framer Motion",
    level: 90,
    category: "frontend",
    projects: ["Animations", "Interactive UI", "Modern UX"],
    description: "Advanced animations and interactive experiences",
    emoji: "🎬",
  },
  {
    id: "sass",
    name: "SASS/SCSS",
    level: 90,
    category: "frontend",
    projects: ["Styling Systems", "Component Libraries"],
    description: "Advanced CSS preprocessing and styling architectures",
    emoji: "🎨",
  },
  {
    id: "graphql",
    name: "GraphQL",
    level: 82,
    category: "backend",
    projects: ["Modern APIs", "Data Fetching", "Apollo"],
    description: "Modern API development with GraphQL",
    emoji: "🔗",
  },
  {
    id: "redis",
    name: "Redis",
    level: 82,
    category: "database",
    projects: ["Caching", "Sessions", "Real-time Features"],
    description: "Advanced caching and session management",
    emoji: "💎",
  },
  {
    id: "aws",
    name: "AWS",
    level: 78,
    category: "tools",
    projects: ["Cloud Infrastructure", "Serverless", "CI/CD"],
    description: "Cloud infrastructure and serverless architectures",
    emoji: "☁️",
  },
  {
    id: "firebase",
    name: "Firebase",
    level: 85,
    category: "tools",
    projects: ["Real-time Apps", "Authentication", "Hosting"],
    description: "Firebase services for rapid application development",
    emoji: "🔥",
  },
  {
    id: "vscode",
    name: "VS Code",
    level: 95,
    category: "tools",
    projects: ["Development", "Extensions", "Productivity"],
    description: "Expert-level proficiency in VS Code development environment",
    emoji: "📝",
  },
  {
    id: "figma",
    name: "Figma",
    level: 85,
    category: "tools",
    projects: ["UI/UX Design", "Prototyping", "Design Systems"],
    description: "Advanced UI/UX design and prototyping skills",
    emoji: "🎨",
  },
  {
    id: "cpp",
    name: "C++",
    level: 75,
    category: "languages",
    projects: ["Algorithms", "System Programming", "Performance"],
    description: "Strong foundation in C++ and system programming",
    emoji: "⚙️",
  },
  {
    id: "linux",
    name: "Linux",
    level: 80,
    category: "tools",
    projects: ["Server Management", "DevOps", "System Admin"],
    description:
      "Proficient in Linux system administration and shell scripting",
    emoji: "🐧",
  },
];

const SkillBubble = ({
  skill,
  onSelect,
  isSelected,
}: {
  skill: SkillNode;
  onSelect: (skill: SkillNode) => void;
  isSelected: boolean;
}) => {
  const handleClick = useCallback(() => {
    onSelect(skill);
  }, [skill, onSelect]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend": return "from-cyan-400/20 to-blue-500/20 border-cyan-400/50";
      case "backend": return "from-green-400/20 to-emerald-500/20 border-green-400/50";
      case "database": return "from-orange-400/20 to-red-500/20 border-orange-400/50";
      case "tools": return "from-purple-400/20 to-violet-500/20 border-purple-400/50";
      case "languages": return "from-yellow-400/20 to-amber-500/20 border-yellow-400/50";
      default: return "from-gray-400/20 to-gray-500/20 border-gray-400/50";
    }
  };

  const categoryColor = getCategoryColor(skill.category);

  return (
    <div
      className="relative group cursor-pointer"
      onClick={handleClick}
    >
      {/* Tooltip */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
        <div className="bg-black/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap border border-gray-700">
          <div className="font-medium">{skill.name}</div>
          <div className="text-xs text-gray-300">{skill.level}% • {skill.category}</div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-700"></div>
        </div>
      </div>

      {/* Skill bubble container */}
      <div className="flex flex-col items-center justify-center hover:scale-110 transition-all duration-300">
        <div
          className={`relative w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 rounded-full skill-bubble bg-gradient-to-br ${categoryColor} flex items-center justify-center shadow-xl transition-all duration-300 ${
            isSelected ? "ring-2 ring-cyan-400 shadow-cyan-400/50" : ""
          }`}
          data-category={skill.category}
        >
          {/* Animated background ring */}
          <div className="absolute inset-0 rounded-full skill-bubble-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Skill level indicator ring */}
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent skill-level-ring"
            style={{
              background: `conic-gradient(from 0deg, ${
                skill.category === 'frontend' ? '#06b6d4' :
                skill.category === 'backend' ? '#10b981' :
                skill.category === 'database' ? '#f97316' :
                skill.category === 'tools' ? '#8b5cf6' :
                '#eab308'
              } ${skill.level * 3.6}deg, transparent ${skill.level * 3.6}deg)`,
              mask: 'radial-gradient(circle at center, transparent 65%, black 67%)'
            }}
          />
          
          {/* Emoji */}
          <span className="relative z-10 text-2xl sm:text-3xl lg:text-3xl transform group-hover:scale-110 transition-transform duration-300">
            {skill.emoji}
          </span>
          
          {/* Pulse effect for selected */}
          {isSelected && (
            <div className="absolute inset-0 rounded-full animate-pulse bg-cyan-400/20"></div>
          )}
        </div>
        
        {/* Skill name (visible on mobile/tablet) */}
        <span className="text-xs sm:text-sm mt-2 text-center text-gray-300 xl:hidden font-medium max-w-[80px] leading-tight">
          {skill.name}
        </span>
      </div>
    </div>
  );
};

export default function TechStackSection() {
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null);

  const categoryStats = useMemo(
    () => ({
      frontend: { count: 7, mastery: 95 },
      backend: { count: 4, mastery: 85 },
      database: { count: 3, mastery: 80 },
      tools: { count: 7, mastery: 88 },
      languages: { count: 4, mastery: 87 },
    }),
    []
  );

  const handleNodeSelect = useCallback((node: SkillNode) => {
    setSelectedNode(node);
  }, []);

  return (
    <section className="min-h-screen bg-black text-white relative overflow-hidden py-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-black to-blue-900/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore my technical skills and expertise across different
            technologies.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[600px]">
          {/* Skill Tree Visualization */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="min-h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-800 overflow-hidden relative"
            >
              <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
                <div className="w-full max-w-4xl h-full">
                  {/* Skills Grid - Enhanced Responsive Layout */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6 lg:gap-8 h-full items-center justify-items-center p-4">
                    {SKILLS_DATA.map((skill, index) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: index * 0.05, 
                          type: "spring",
                          stiffness: 100 
                        }}
                        className="w-full flex justify-center"
                      >
                        <SkillBubble
                          skill={skill}
                          onSelect={handleNodeSelect}
                          isSelected={selectedNode?.id === skill.id}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Side Panel - Node Details */}
          <div className="hidden lg:block lg:col-span-1 space-y-6 max-w-sm">
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-xl border border-gray-800 p-6">
              {selectedNode ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700">
                      <span className="text-lg">{selectedNode.emoji}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedNode.name}
                    </h3>
                    <span className="text-sm bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                      {selectedNode.level}%
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
                        <span className="text-sm text-gray-400">
                          Proficiency
                        </span>
                        <span className="text-sm text-white">
                          {selectedNode.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500`}
                          data-level={selectedNode.level}
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
                    Select a Skill
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Click on any skill to explore my expertise and related
                    projects.
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
                    <span className="text-sm text-gray-300 capitalize">
                      {category}
                    </span>
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

          {/* Mobile Skill Details Modal */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed inset-x-4 bottom-4 lg:hidden z-50 bg-gray-900/95 backdrop-blur-md rounded-xl border border-gray-700 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-700">
                    <span className="text-lg">{selectedNode.emoji}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {selectedNode.name}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {selectedNode.level}% proficiency
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close skill details"
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
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-300">
                  {selectedNode.description}
                </p>

                {selectedNode.projects && selectedNode.projects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-200 mb-2">
                      Projects:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.projects.map((project, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-800 rounded-full h-2">
                    <div
                      className={`h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500`}
                      data-level={selectedNode.level}
                    />
                  </div>
                  <span className="text-xs text-gray-400">
                    {selectedNode.level}%
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx>{`
        /* Enhanced skill bubbles with category-specific styling */
        .skill-bubble {
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .skill-bubble::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-bubble:hover::before {
          opacity: 1;
        }

        /* Animated glow effect */
        .skill-bubble-glow {
          background: radial-gradient(circle at center, rgba(99, 102, 241, 0.4) 0%, transparent 70%);
          animation: pulse-glow 2s infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }

        /* Skill level ring animation */
        .skill-level-ring {
          transition: all 0.3s ease;
        }

        .group:hover .skill-level-ring {
          transform: rotate(10deg);
        }

        /* Floating animation for bubbles */
        .skill-bubble {
          animation: float 6s ease-in-out infinite;
        }

        .skill-bubble:nth-child(2n) {
          animation-delay: -2s;
        }

        .skill-bubble:nth-child(3n) {
          animation-delay: -4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        /* Tooltip improvements */
        .group:hover .tooltip {
          visibility: visible;
          opacity: 1;
        }

        /* Dynamic width classes for progress bars */
        [data-level="75"] { width: 75%; }
        [data-level="78"] { width: 78%; }
        [data-level="80"] { width: 80%; }
        [data-level="82"] { width: 82%; }
        [data-level="85"] { width: 85%; }
        [data-level="88"] { width: 88%; }
        [data-level="90"] { width: 90%; }
        [data-level="92"] { width: 92%; }
        [data-level="95"] { width: 95%; }

        /* Responsive grid adjustments */
        @media (max-width: 640px) {
          .skill-bubble {
            animation: none; /* Disable float animation on mobile for performance */
          }
        }

        /* Enhanced hover effects */
        .skill-bubble:hover {
          box-shadow: 
            0 0 20px rgba(99, 102, 241, 0.4),
            0 0 40px rgba(99, 102, 241, 0.2),
            0 0 60px rgba(99, 102, 241, 0.1);
        }

        /* Category-specific glow colors */
        .group:hover .skill-bubble[data-category="frontend"] {
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
        }
        
        .group:hover .skill-bubble[data-category="backend"] {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.4);
        }
        
        .group:hover .skill-bubble[data-category="database"] {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);
        }
        
        .group:hover .skill-bubble[data-category="tools"] {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
        }
        
        .group:hover .skill-bubble[data-category="languages"] {
          box-shadow: 0 0 20px rgba(234, 179, 8, 0.4);
        }
      `}</style>
    </section>
  );
}
