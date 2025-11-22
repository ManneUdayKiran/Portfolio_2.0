"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useState, useRef, useEffect } from "react";

export default function AboutSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1, // Reduced threshold for mobile
    triggerOnce: true,
  });

  const [showContent, setShowContent] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("/uk.jpg");
  const imageRef = useRef<HTMLImageElement>(null);

  // Ensure component is mounted before animations
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reduced for mobile
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reduced movement for mobile
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Faster animation
        ease: "easeOut",
      },
    },
  };

  // Use simple opacity for mobile
  const simpleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
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
      className="about-section min-h-screen py-24 bg-black relative overflow-hidden"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left Side - Profile Image */}
            <div className="order-1 lg:order-1 flex items-center justify-center">
              <div className="relative">
                {/* Image with Colorful Animated Border */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500  p-2">
                    <div className="w-full h-full rounded-full bg-black p-2">
                      <img
                        ref={imageRef}
                        src={imageSrc}
                        alt="Uday Kiran"
                        className="w-full h-full rounded-full object-cover"
                        onLoad={() => {
                          console.log("Image loaded successfully");
                          setImageLoaded(true);
                        }}
                        onError={(e) => {
                          console.log(
                            "Image failed to load, trying alternatives"
                          );
                          const img = e.currentTarget as HTMLImageElement;

                          // Try different image extensions if not already tried
                          if (imageSrc === "/uk.jpg") {
                            setImageSrc("/uk.png");
                          } else if (imageSrc === "/uk.png") {
                            setImageSrc("/udaykiran.jpg");
                          } else if (imageSrc === "/udaykiran.jpg") {
                            setImageSrc("/udaykiran.png");
                          } else {
                            // Final fallback to SVG
                            console.log("Using final SVG fallback");
                            setImageSrc(
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%236366f1'/%3E%3Ctext x='50' y='60' font-family='Arial' font-size='30' fill='white' text-anchor='middle'%3EUK%3C/text%3E%3C/svg%3E"
                            );
                          }
                        }}
                      />
                    </div>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-pink-500/20 blur-xl animate-pulse"></div>
                </div>
              </div>
            </div>

                {/* Right Side - Introduction */}
                <div className="order-2 lg:order-2 space-y-8">
                  {/* Always show content, use conditional animations */}
                  <div
                    className={`space-y-6 ${
                      isMounted && inView 
                        ? 'mobile-intro-visible' 
                        : 'mobile-intro-hidden'
                    }`}
                  >
                    {isMounted ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="space-y-6"
                      >
                        {/* Greeting with fallback */}
                        <div className="space-y-4">
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            <span className="text-white">Hi, I'm </span>
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-text-glow">
                              Uday Kiran
                            </span>
                            {isMounted && (
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
                            )}
                            {!isMounted && <span className="inline-block ml-4 text-4xl">👋</span>}
                          </h1>

                          <p className="text-xl text-gray-300 leading-relaxed">
                            A passionate{" "}
                            <span className="text-cyan-400 font-semibold">
                              Full-Stack Developer
                            </span>{" "}
                            crafting immersive digital experiences that blend
                            cutting-edge technology with stunning visual design.
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      // Fallback content without animations
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                            <span className="text-white">Hi, I'm </span>
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                              Uday Kiran
                            </span>
                            <span className="inline-block ml-4 text-4xl">👋</span>
                          </h1>
                          <p className="text-xl text-gray-300 leading-relaxed">
                            A passionate{" "}
                            <span className="text-cyan-400 font-semibold">
                              Full-Stack Developer
                            </span>{" "}
                            crafting immersive digital experiences that blend
                            cutting-edge technology with stunning visual design.
                          </p>
                        </div>
                      </div>
                    )}

                {/* Animated Stats - Always visible with conditional animations */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
                  {stats.map((stat, index) => {
                    const StatComponent = isMounted ? motion.div : 'div';
                    const statProps = isMounted ? {
                      initial: { opacity: 0, scale: 0.8 },
                      animate: inView ? { opacity: 1, scale: 1 } : { opacity: 0.3, scale: 0.95 },
                      transition: { delay: 0.3 + index * 0.1, duration: 0.5 }
                    } : {
                      className: inView ? 'mobile-fallback-visible' : 'mobile-fallback-hidden'
                    };

                    return (
                      <StatComponent
                        key={stat.label}
                        {...statProps}
                        className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-cyan-400/50 transition-all duration-300 group"
                      >
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                          {stat.value}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </StatComponent>
                    );
                  })}
                </div>
                  </div>
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
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
                      the boundaries of what&apos;s possible on the web.
                    </p>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      When I&apos;m not coding, you&apos;ll find me exploring
                      new technologies, contributing to open-source projects, or
                      sharing knowledge with the developer community.
                    </p>
                  </div>

                  {/* Education Timeline */}
                  <div className="mt-8 sm:mt-12 w-full">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 md:mb-8 flex items-center gap-2 sm:gap-3">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                        Education Timeline
                      </span>
                      <div className="h-0.5 flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                    </h3>

                    <div className="relative w-full overflow-hidden">
                      {/* Timeline Line */}
                      <div className="absolute left-2 sm:left-3 md:left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 z-10" />

                      {/* Timeline Items */}
                      <div className="space-y-4 sm:space-y-6 md:space-y-8 relative z-20">
                        {[
                          {
                            year: "2024-2027",
                            degree: "Bachelor's in Computer Science",
                            institution:
                              "Chaitanya Bharathiya Institute of Technology",
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
                            description: "",
                            color: "from-pink-400 to-rose-500",
                            orbColor: "bg-pink-400",
                            glowColor: "shadow-pink-400/50",
                          },
                        ].map((item, index) => {
                          const TimelineComponent = isMounted ? motion.div : 'div';
                          const timelineProps = isMounted ? {
                            initial: { opacity: 0, x: -50 },
                            animate: inView ? { opacity: 1, x: 0 } : { opacity: 0.5 },
                            transition: { delay: 0.2 * index, duration: 0.6 }
                          } : {
                            className: inView ? 'mobile-fallback-visible' : 'mobile-fallback-hidden'
                          };

                          return (
                          <TimelineComponent
                            key={index}
                            {...timelineProps}
                            className="relative pl-8 sm:pl-10 md:pl-12 group w-full"
                          >
                            {/* Colorful Orb - Always visible */}
                            <div
                              className={`absolute left-0 top-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 ${item.orbColor} rounded-full shadow-lg ${item.glowColor} flex items-center justify-center z-30`}
                            >
                              <div
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-white rounded-full"
                              />
                            </div>

                            {/* Pulsing Ring - Only with animation when mounted */}
                            {isMounted && (
                            <motion.div
                              className={`absolute left-0 top-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 ${item.orbColor} rounded-full opacity-0 group-hover:opacity-30 z-20`}
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
                            )}

                            {/* Content Card - Always visible */}
                            <div
                              className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 group-hover:border-opacity-100 transition-all duration-300 w-full max-w-full"
                            >
                              <div
                                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color} text-white`}
                              >
                                {item.year}
                              </div>
                              <h4
                                className={`text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                              >
                                {item.degree.replace("'", "&apos;")}
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
                            </div>
                          </TimelineComponent>
                        );
                      })}
                      </div>

                      {/* Timeline End Indicator - Simplified for mobile */}
                      <div
                        className={`relative pl-8 sm:pl-10 md:pl-12 mt-4 sm:mt-6 md:mt-8 ${
                          inView ? 'mobile-fallback-visible' : 'mobile-fallback-hidden'
                        }`}
                      >
                        <div className="absolute left-0 top-0 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 via-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50 flex items-center justify-center z-30">
                          {isMounted ? (
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
                          ) : (
                            <div>✨</div>
                          )}
                        </div>
                        <div className="text-gray-500 italic">
                          Journey continues...
                        </div>
                      </div>
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
                            {item.title.replace("'", "&apos;")}
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
                <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
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

          /* Hide all scrollbars globally in this section */
        :global(.about-section) {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        :global(.about-section)::-webkit-scrollbar {
          display: none; /* WebKit */
        }
        
        /* Ensure no overflow on timeline elements */
        .timeline-content {
          box-sizing: border-box;
          max-width: 100%;
        }

        /* Mobile-specific fixes for timeline */
          @media (max-width: 640px) {
            .relative {
              position: relative !important;
            }
            
            .timeline-container {
              min-height: 50px;
              display: block;
              width: 100%;
              overflow: hidden;
            }
            
            .timeline-item {
              display: block;
              width: 100%;
              margin-bottom: 1rem;
              position: relative;
              overflow: visible;
            }          .timeline-orb {
            position: absolute !important;
            left: 0 !important;
            top: 8px !important;
            z-index: 50 !important;
            display: flex !important;
            background: linear-gradient(45deg, #06b6d4, #8b5cf6) !important;
          }
          
          .timeline-line {
            position: absolute !important;
            left: 7px !important;
            top: 0 !important;
            bottom: 0 !important;
            width: 2px !important;
            background: linear-gradient(to bottom, #06b6d4, #8b5cf6, #ec4899) !important;
            z-index: 10 !important;
          }
          
          .timeline-content {
            margin-left: 2rem !important;
            padding: 0.75rem !important;
            display: block !important;
            width: calc(100% - 2rem) !important;
          }
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

        /* Hologram scanning effect */
        @keyframes scan {
          0% {
            top: -10%;
          }
          100% {
            top: 110%;
          }
        }

        .animate-scan {
          animation: scan 2s linear infinite;
        }

        .animate-ping-delayed-1 {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 0.5s;
        }

        .animate-ping-delayed-2 {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
}
