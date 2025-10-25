"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Animated Counter Component
function AnimatedCounter({ 
  end, 
  duration = 2, 
  inView,
  prefix = "",
  suffix = ""
}: {
  end: number;
  duration?: number;
  inView: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
      let startTime: number;
      let animationId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };

      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [inView, end, duration, hasAnimated]);

  return (
    <span className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

// Achievement Card Component
function AchievementCard({
  icon,
  title,
  count,
  suffix = "",
  prefix = "",
  delay = 0,
  inView,
  gradient,
  description,
  details,
  links,
  onClick,
  borderColor,
  glowColor
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
  details: string[];
  links?: { name: string; url: string; verified?: boolean }[];
  onClick: () => void;
  borderColor: string;
  glowColor: string;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut" 
      }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-2xl blur-lg transition-all duration-500 ${
          isHovered ? 'opacity-40 blur-xl' : 'opacity-20'
        }`}
      />
      
      {/* Main Card */}
      <div 
        className={`relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 border-2 transition-all duration-500 group-hover:scale-105 h-full`}
      >
        {/* Icon */}
        <div className="text-5xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Counter */}
        <div className={`text-4xl md:text-5xl font-bold text-center mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          <AnimatedCounter
            end={count}
            duration={2 + delay * 0.5}
            inView={inView}
            prefix={prefix}
            suffix={suffix}
          />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold text-white text-center mb-2">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-400 text-center text-sm mb-4">
          {description}
        </p>

        {/* Details Preview */}
        <div className="space-y-1">
          {details.slice(0, 2).map((detail, index) => (
            <div key={index} className="text-xs text-gray-500 text-center truncate">
              {detail}
            </div>
          ))}
          {details.length > 2 && (
            <div className="text-xs text-gray-600 text-center">
              +{details.length - 2} more...
            </div>
          )}
        </div>

        {/* Click indicator */}
        <div className="absolute top-3 right-3 text-gray-500 group-hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        
        {/* Hover Glow Effect */}
        <div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-10"
        />
      </div>
    </motion.div>
  );
}

// Detail Modal Component
function DetailModal({ 
  isOpen, 
  onClose, 
  achievement 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  achievement: any; 
}) {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="bg-gradient-to-br from-gray-900/95 via-black/90 to-gray-800/95 rounded-3xl max-w-4xl w-full max-h-[90vh] border-2 relative overflow-hidden backdrop-blur-md my-8 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background */}
            <div className={`absolute inset-0 bg-gradient-to-r ${achievement.gradient} opacity-5`} />
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent animate-pulse" />
            
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10 text-2xl"
            >
              ✕
            </button>
            
            {/* Header - Fixed */}
            <div className="text-center p-8 pb-4 flex-shrink-0">
              <div className="text-6xl mb-3 animate-bounce">
                {achievement.icon}
              </div>
              
              <div className={`text-5xl font-bold mb-3 bg-gradient-to-r ${achievement.gradient} bg-clip-text text-transparent`}>
                {achievement.count}
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-2">
                {achievement.title}
              </h3>
              
              <p className="text-gray-300 text-base">
                {achievement.description}
              </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
              <div className="space-y-6">
                {/* Links Section */}
                {achievement.links && achievement.links.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4 text-center">
                      🔗 Certification Links
                    </h4>
                    <div className="grid gap-3">
                      {achievement.links.map((link: any, index: number) => (
                        <motion.a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="group bg-black/40 rounded-lg p-3 border-l-4 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 hover:scale-105"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-xl">{link.verified ? '✅' : '🔗'}</div>
                              <div className="text-white font-medium text-base">
                                {link.name}
                              </div>
                            </div>
                            <div className="text-gray-400 group-hover:text-white transition-colors">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Details Section */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-4 text-center">
                    📋 Complete List
                  </h4>
                  <div className="grid gap-3">
                    {achievement.details.map((detail: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/40 rounded-lg p-3 border-l-4 backdrop-blur-sm"
                      >
                        <div className="text-white font-medium text-sm">
                          {detail}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function AchievementCards() {
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);
  const [inView, setInView] = useState<boolean>(true);

  // Enhanced Achievement Statistics Data with more cards and unique colors
  const achievementStats = [
    {
      id: 1,
      icon: "🏅",
      title: "Professional Certifications",
      count: 12,
      gradient: "from-yellow-400 via-orange-500 to-red-500",
      description: "Industry-recognized certifications earned",
      borderColor: "#f59e0b",
      glowColor: "#f59e0b",
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
        "Agile & Scrum Master Certification"
      ],
      links: [
        { name: "AWS Solutions Architect Professional", url: "https://aws.amazon.com/certification/certified-solutions-architect-professional/", verified: true },
        { name: "Google Cloud Professional Developer", url: "https://cloud.google.com/certification/cloud-developer", verified: true },
        { name: "Microsoft Azure Developer Associate", url: "https://learn.microsoft.com/en-us/certifications/azure-developer/", verified: true },
        { name: "Kubernetes Certified Developer", url: "https://www.cncf.io/certification/ckad/", verified: true },
        { name: "React Developer Certification", url: "https://react.dev/", verified: true },
        { name: "Node.js Professional Certification", url: "https://nodejs.org/", verified: true },
        { name: "MongoDB Certified Developer", url: "https://www.mongodb.com/certification", verified: true },
        { name: "Docker Certified Associate", url: "https://www.docker.com/certification/", verified: true },
        { name: "Terraform Associate Certification", url: "https://www.hashicorp.com/certification/terraform-associate", verified: true },
        { name: "GitHub Actions Certification", url: "https://github.com/features/actions", verified: true },
        { name: "Cybersecurity Fundamentals", url: "https://www.isc2.org/certifications/cc", verified: true },
        { name: "Agile & Scrum Master Certification", url: "https://www.scrum.org/certification", verified: true }
      ]
    },
    {
      id: 2,
      icon: "💻",
      title: "Projects Completed",
      count: 47,
      gradient: "from-cyan-400 via-blue-500 to-purple-600",
      description: "Full-stack applications delivered",
      borderColor: "#06b6d4",
      glowColor: "#06b6d4",
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
        "Open source developer tools"
      ],
      links: [
        { name: "Portfolio Website", url: "https://github.com/yourusername/portfolio", verified: true },
        { name: "E-commerce Platform", url: "https://github.com/yourusername/ecommerce-3d", verified: true },
        { name: "Real-time Chat App", url: "https://github.com/yourusername/realtime-chat", verified: true },
        { name: "AI Recommendation System", url: "https://github.com/yourusername/ai-recommendations", verified: true },
        { name: "Blockchain Voting", url: "https://github.com/yourusername/blockchain-voting", verified: true }
      ]
    },
    {
      id: 3,
      icon: "🧠",
      title: "Hackathons",
      count: 23,
      gradient: "from-purple-400 via-pink-500 to-red-500",
      description: "Innovation challenges participated",
      borderColor: "#a855f7",
      glowColor: "#a855f7",
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
        "Junction Helsinki - Best Technical"
      ],
      links: [
        { name: "TechCrunch Disrupt 2024", url: "https://techcrunch.com/events/disrupt-2024/", verified: true },
        { name: "Google Developer Challenge", url: "https://developers.google.com/", verified: true },
        { name: "NASA Space Apps Challenge", url: "https://www.spaceappschallenge.org/", verified: true },
        { name: "Meta Reality Hack", url: "https://about.meta.com/realitylabs/", verified: true },
        { name: "OpenAI GPT Hackathon", url: "https://openai.com/", verified: true }
      ]
    },
    {
      id: 4,
      icon: "🥇",
      title: "Awards Won",
      count: 8,
      gradient: "from-emerald-400 via-teal-500 to-cyan-600",
      description: "Recognition for excellence",
      borderColor: "#10b981",
      glowColor: "#10b981",
      details: [
        "Developer of the Year 2024",
        "Innovation Excellence Award",
        "Best Open Source Contributor",
        "Rising Star in Tech Award",
        "Community Champion Recognition",
        "Technical Leadership Award", 
        "Outstanding Performance Award",
        "Mentor of the Year Recognition"
      ],
      links: [
        { name: "Developer of the Year 2024", url: "https://example.com/awards/developer-year-2024", verified: true },
        { name: "Innovation Excellence Award", url: "https://example.com/awards/innovation-excellence", verified: true },
        { name: "Best Open Source Contributor", url: "https://github.com/yourusername", verified: true },
        { name: "Rising Star in Tech", url: "https://example.com/awards/rising-star", verified: true },
        { name: "Community Champion", url: "https://example.com/awards/community-champion", verified: true }
      ]
    },
    {
      id: 5,
      icon: "📚",
      title: "Courses Completed",
      count: 35,
      gradient: "from-indigo-400 via-purple-500 to-pink-500",
      description: "Online courses and tutorials completed",
      borderColor: "#6366f1",
      glowColor: "#6366f1",
      details: [
        "Advanced React Patterns",
        "TypeScript Masterclass",
        "System Design Fundamentals",
        "Machine Learning Basics",
        "DevOps with Docker & Kubernetes",
        "GraphQL API Development",
        "Web Performance Optimization",
        "Security Best Practices",
        "Testing Strategies",
        "Agile Methodologies"
      ],
      links: [
        { name: "Coursera Profile", url: "https://coursera.org/user/yourusername", verified: true },
        { name: "Udemy Certificates", url: "https://udemy.com/user/yourusername", verified: true },
        { name: "Pluralsight Progress", url: "https://pluralsight.com/profile/yourusername", verified: true },
        { name: "FreeCodeCamp", url: "https://freecodecamp.org/yourusername", verified: true },
        { name: "Codecademy", url: "https://codecademy.com/profiles/yourusername", verified: true }
      ]
    },
    {
      id: 6,
      icon: "🌟",
      title: "Skills Mastered",
      count: 25,
      gradient: "from-rose-400 via-pink-500 to-purple-600",
      description: "Technical skills and technologies",
      borderColor: "#f43f5e",
      glowColor: "#f43f5e",
      details: [
        "JavaScript & TypeScript",
        "React & Next.js",
        "Node.js & Express",
        "Python & Django",
        "AWS & Cloud Services",
        "Docker & Kubernetes",
        "MongoDB & PostgreSQL",
        "GraphQL & REST APIs",
        "Machine Learning",
        "Blockchain Development"
      ],
      links: [
        { name: "GitHub Profile", url: "https://github.com/yourusername", verified: true },
        { name: "LinkedIn Skills", url: "https://linkedin.com/in/yourusername", verified: true },
        { name: "Stack Overflow", url: "https://stackoverflow.com/users/yourusername", verified: true },
        { name: "LeetCode Profile", url: "https://leetcode.com/yourusername", verified: true },
        { name: "HackerRank", url: "https://hackerrank.com/yourusername", verified: true }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const handleCardClick = (achievement: any) => {
    setSelectedAchievement(achievement);
  };

  const handleCloseModal = () => {
    setSelectedAchievement(null);
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {achievementStats.map((stat, index) => (
          <motion.div key={stat.id} variants={itemVariants}>
            <AchievementCard
              icon={stat.icon}
              title={stat.title}
              count={stat.count}
              gradient={stat.gradient}
              description={stat.description}
              details={stat.details}
              links={stat.links}
              borderColor={stat.borderColor}
              glowColor={stat.glowColor}
              delay={index * 0.15}
              inView={inView}
              onClick={() => handleCardClick(stat)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={!!selectedAchievement}
        onClose={handleCloseModal}
        achievement={selectedAchievement}
      />
    </>
  );
}