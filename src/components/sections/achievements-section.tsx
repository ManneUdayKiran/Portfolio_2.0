"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";

// All React Three Fiber imports commented out to avoid ReactCurrentOwner errors
// import * as THREE from "three";
// import { useFrame } from "@react-three/fiber";
// const Canvas = dynamic(() => import("@react-three/fiber").then(mod => mod.Canvas), { ssr: false });
// const OrbitControls = dynamic(() => import("@react-three/drei").then(mod => mod.OrbitControls), { ssr: false });
// const Html = dynamic(() => import("@react-three/drei").then(mod => mod.Html), { ssr: false });
// const Environment = dynamic(() => import("@react-three/drei").then(mod => mod.Environment), { ssr: false });
// const EffectComposer = dynamic(() => import("@react-three/postprocessing").then(mod => mod.EffectComposer), { ssr: false });
// const Bloom = dynamic(() => import("@react-three/postprocessing").then(mod => mod.Bloom), { ssr: false });
// const GodRays = dynamic(() => import("@react-three/postprocessing").then(mod => mod.GodRays), { ssr: false });

// AnimatedOrbitCard import commented out since it likely uses React Three Fiber
// import { AnimatedOrbitCard } from "./AnimatedOrbitCard";

// Energy Particle Component - COMMENTED OUT (uses React Three Fiber)
// function EnergyParticle({
//   index,
//   radius,
//   isActive,
// }: {
//   index: number;
//   radius: number;
//   isActive: boolean;
// }) {
//   const particleRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (particleRef.current) {
//       const time = state.clock.elapsedTime + index * 0.5;
//       const angle = (index / 8) * Math.PI * 2 + time * 0.3;

//       particleRef.current.position.set(
//         Math.cos(angle) * radius,
//         Math.sin(time * 0.8) * 1.5 + 1,
//         Math.sin(angle) * radius
//       );

//       // Scale and opacity based on activity
//       const scale = isActive ? 0.15 : 0.08;
//       particleRef.current.scale.setScalar(scale);

//       if (particleRef.current.material instanceof THREE.MeshBasicMaterial) {
//         particleRef.current.material.opacity = isActive ? 0.9 : 0.6;
//       }
//     }
//   });

//   return (
//     <mesh ref={particleRef}>
//       <sphereGeometry args={[0.1, 6, 6]} />
//       <meshBasicMaterial color="#FFD700" transparent opacity={0.6} />
//     </mesh>
//   );
// }

// Simplified Achievement Display Component - COMMENTED OUT (uses React Three Fiber Html)
// function AchievementStats() {
//   return (
//     <Html center position={[0, 4, 0]}>
//       <div className="bg-black/80 backdrop-blur-sm rounded-lg p-6 border border-gold-400/30 text-center">
//         <h3 className="text-gold-400 font-bold text-2xl mb-4">
//           🏆 Achievements
//         </h3>
//         <div className="grid grid-cols-2 gap-4 text-white">
//           <div>
//             <div className="text-3xl">🏅</div>
//             <div className="text-xl font-bold text-yellow-400">12</div>
//             <div className="text-sm">Certifications</div>
//           </div>
//           <div>
//             <div className="text-3xl">💻</div>
//             <div className="text-xl font-bold text-cyan-400">47</div>
//             <div className="text-sm">Projects</div>
//           </div>
//           <div>
//             <div className="text-3xl">🧠</div>
//             <div className="text-xl font-bold text-purple-400">23</div>
//             <div className="text-sm">Hackathons</div>
//           </div>
//           <div>
//             <div className="text-3xl">🥇</div>
//             <div className="text-xl font-bold text-emerald-400">8</div>
//             <div className="text-sm">Awards</div>
//           </div>
//         </div>
//       </div>
//     </Html>
//   );
// }

// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2,
  inView,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  inView: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// Achievement Stat Card Component (for the grid)
function StatCard({
  icon,
  title,
  count,
  suffix = "",
  prefix = "",
  delay = 0,
  inView,
  gradient,
  description,
}: {
  icon: string;
  title: string;
  count: number;
  suffix?: string;
  prefix?: string;
  delay?: number;
  inView: boolean;
  gradient: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
      className="relative group"
    >
      {/* Neon Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500 animate-pulse" />

      {/* Main Card */}
      <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-gray-600 transition-all duration-500 group-hover:scale-105">
        {/* Icon */}
        <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Counter */}
        <div
          className={`text-5xl md:text-6xl font-bold text-center mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
        >
          <AnimatedCounter
            end={count}
            duration={2 + delay * 0.5}
            inView={inView}
            prefix={prefix}
            suffix={suffix}
          />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white text-center mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-center text-sm">{description}</p>

        {/* Glow Effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
        />
      </div>
    </motion.div>
  );
}

export default function AchievementsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [selectedStat, setSelectedStat] = useState<any>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [trophyHovered, setTrophyHovered] = useState(false);

  // Achievement Statistics Data
  const achievementStats = [
    {
      id: 1,
      icon: "🏅",
      title: "Certifications",
      count: 12,
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      description: "Professional certifications earned",
      details: [
        "AWS Solutions Architect Professional",
        "Google Cloud Professional Developer",
        "Microsoft Azure Developer Associate",
        "Kubernetes Certified Developer",
        "React Developer Certification",
        "Node.js Professional Certification",
        "MongoDB Certified Developer",
        "Docker Certified Associate",
        "Terraform Associate Certification",
        "GitHub Actions Certification",
        "Cybersecurity Fundamentals",
        "Agile & Scrum Master Certification",
      ],
    },
    {
      id: 2,
      icon: "💻",
      title: "Projects Completed",
      count: 47,
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      description: "Full-stack applications delivered",
      details: [
        "E-commerce platforms with 3D product viewers",
        "Real-time collaboration tools",
        "AI-powered recommendation systems",
        "Mobile-first progressive web apps",
        "Blockchain-based voting systems",
        "IoT device management dashboards",
        "AR/VR web experiences",
        "Microservices architectures",
        "Serverless application frameworks",
        "Open source developer tools",
      ],
    },
    {
      id: 3,
      icon: "🧠",
      title: "Hackathons",
      count: 23,
      gradient: "from-purple-400 via-pink-500 to-red-500",
      description: "Innovation challenges participated",
      details: [
        "TechCrunch Disrupt 2024 - 1st Place",
        "Google Developer Challenge - Winner",
        "NASA Space Apps Challenge - Top 10",
        "Meta Reality Hack - 2nd Place",
        "OpenAI GPT Hackathon - Finalist",
        "GitHub Copilot Challenge - Winner",
        "AWS Global Hackathon - 3rd Place",
        "Microsoft Imagine Cup - Regional Winner",
        "AngelHack Global Series - Top 5",
        "Junction Helsinki - Best Technical",
      ],
    },
    {
      id: 4,
      icon: "🥇",
      title: "Awards Won",
      count: 8,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      description: "Recognition for excellence",
      details: [
        "Developer of the Year 2024",
        "Innovation Excellence Award",
        "Best Open Source Contributor",
        "Rising Star in Tech Award",
        "Community Champion Recognition",
        "Technical Leadership Award",
        "Outstanding Performance Award",
        "Mentor of the Year Recognition",
      ],
    },
  ];

  // Update the certificateStats array to include links to certificates
  const certificateStats = [
    {
      id: 1,
      icon: "📜",
      title: "C++ Certification",
      count: 1,
      gradient: "from-blue-400 to-purple-500",
      description: "Certified C++ Developer",
      link: "https://drive.google.com/file/d/1MLAql_prt85RsDt96qe9ccXBMEeiHdxv/view?usp=sharing",
    },
    {
      id: 2,
      icon: "☕",
      title: "Java Certification",
      count: 1,
      gradient: "from-orange-400 to-red-500",
      description: "Certified Java Developer",
      link: "https://drive.google.com/file/d/10mJwFo-R3zGn4am79tCDTtU9dVn48ZpJ/view?usp=sharing",
    },
    {
      id: 3,
      icon: "🐍",
      title: "Python Certification",
      count: 1,
      gradient: "from-green-400 to-blue-500",
      description: "Certified Python Developer",
      link: "https://drive.google.com/python-certificate",
    },
    {
      id: 4,
      icon: "#️⃣",
      title: "C# Certification",
      count: 1,
      gradient: "from-purple-400 to-pink-500",
      description: "Certified C# Developer",
      link: "https://drive.google.com/csharp-certificate",
    },
    {
      id: 5,
      icon: "🌐",
      title: "MERN Stack Certification",
      count: 1,
      gradient: "from-teal-400 to-green-500",
      description: "Certified MERN Stack Developer",
      link: "https://drive.google.com/file/d/1CbxdzQcv4iLaKqdLQgzUUDNRm4MwOdm-/view?usp=sharing",
    },
    {
      id: 6,
      icon: "🤖",
      title: "AI & Machine Learning",
      count: 1,
      gradient: "from-teal-400 to-green-500",
      description: "Certified AI & Machine Learning Developer",
      link: "https://drive.google.com/file/d/1xTTnmDjW8EZFnZFZD_GIK_Dpgu-neufu/view?usp=sharing",
    },
    {
      id: 7,
      icon: "🗄️",
      title: "MongoDB Certification",
      count: 1,
      gradient: "from-teal-400 to-green-500",
      description: "Certified MongoDB Developer",
      link: "#",
    },
    {
      id: 8,
      icon: "🏆",
      title: "Code For Change Hackathon",
      count: 1,
      gradient: "from-teal-400 to-green-500",
      description: "",
      link: "https://credsverse.com/credentials/a4837d22-0acb-4111-a7b6-02b09f7bab84",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section
      id="achievements"
      ref={ref}
      className="min-h-screen py-24 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-purple-900/10 to-pink-900/10" />
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-900/5 via-transparent to-emerald-900/5" />

        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  3 + Math.random() * 4
                }s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Add a dark futuristic animated background */}
      <div className="absolute inset-0 -z-10">
        {/* First Grid Layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "pulseGrid1 6s infinite alternate",
          }}
        />

        {/* Second Grid Layer */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "pulseGrid2 8s infinite alternate",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-20"
        >
          <motion.h2
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
              Achievements
            </span>
            <br />
            <span className="text-4xl md:text-5xl text-gray-300 font-light"></span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Quantifying excellence through dynamic counters that showcase my
            journey of continuous learning, innovation, and professional growth
            in technology.
          </motion.p>
        </motion.div>

        {/* Render certificates as cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certificateStats.map((stat, index) => (
            <a
              key={stat.id}
              href={stat.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              title={`View ${stat.title}`}
            >
              <StatCard
                icon={stat.icon}
                title={stat.title}
                count={stat.count}
                gradient={stat.gradient}
                description={stat.description}
                delay={index * 0.2}
                inView={inView}
              />
            </a>
          ))}
        </div>

        {/* Backup Stats Grid (Hidden) */}
        {/* <div className="hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievementStats.map((stat, index) => (
            <StatCard
              key={stat.id}
              icon={stat.icon}
              title={stat.title}
              count={stat.count}
              gradient={stat.gradient}
              description={stat.description}
              delay={index * 0.2}
              inView={inView}
            />
          ))}
        </div> */}

        {/* Interactive Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          {/* <h3 className="text-3xl font-bold text-white mb-8">
            Click any stat to explore details
          </h3> */}

          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievementStats.map((stat) => (
              <button
                key={stat.id}
                onClick={() => setSelectedStat(stat)}
                className="group relative bg-black/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div
                  className={`text-lg font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.count}
                </div>
                <div className="text-xs text-gray-400 mt-1">{stat.title}</div>
              </button>
            ))}
          </div> */}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedStat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStat(null)}
          >
            <motion.div
              initial={{ y: 30, rotateX: -10 }}
              animate={{ y: 0, rotateX: 0 }}
              exit={{ y: 30, rotateX: -10 }}
              className="bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 rounded-3xl p-8 max-w-4xl w-full border border-gray-700 relative overflow-hidden backdrop-blur-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Animated Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${selectedStat.gradient} opacity-5`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse" />

              <button
                onClick={() => setSelectedStat(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 text-2xl"
              >
                ✕
              </button>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="text-8xl mb-4 animate-bounce">
                    {selectedStat.icon}
                  </div>

                  <div
                    className={`text-6xl font-bold mb-4 bg-gradient-to-r ${selectedStat.gradient} bg-clip-text text-transparent`}
                  >
                    {selectedStat.count}
                  </div>

                  <h3 className="text-4xl font-bold text-white mb-2">
                    {selectedStat.title}
                  </h3>

                  <p className="text-gray-300 text-lg">
                    {selectedStat.description}
                  </p>
                </div>

                <div className="grid gap-3 max-h-64 overflow-y-auto">
                  {selectedStat.details.map((detail: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-black/40 rounded-lg p-3 border-l-4 border-gradient-to-r backdrop-blur-sm"
                      style={{
                        borderLeftColor: selectedStat.gradient.includes("cyan")
                          ? "#06b6d4"
                          : selectedStat.gradient.includes("yellow")
                          ? "#f59e0b"
                          : selectedStat.gradient.includes("purple")
                          ? "#a855f7"
                          : "#10b981",
                      }}
                    >
                      <div className="text-white font-medium">{detail}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes pulseGrid1 {
          0% {
            opacity: 0.5;
            transform: scale(1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes pulseGrid2 {
          0% {
            opacity: 0.3;
            transform: scale(1);
          }
          100% {
            opacity: 0.6;
            transform: scale(1.02);
          }
        }
      `}</style>
    </section>
  );
}
