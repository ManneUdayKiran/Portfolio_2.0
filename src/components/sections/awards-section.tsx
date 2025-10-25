"use client";

import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-in-view";
import { useState } from "react";

// Award Card Component
function AwardCard({
  title,
  organization,
  year,
  category,
  description,
  icon,
  color,
  delay = 0,
  inView
}: {
  title: string;
  organization: string;
  year: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  delay?: number;
  inView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.8, 
        delay: delay,
        ease: "easeOut" 
      }}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div 
        className={`absolute inset-0 rounded-2xl blur-lg transition-all duration-500 ${
          isHovered ? 'opacity-30 blur-xl' : 'opacity-20'
        }`}
      />
      
      {/* Main Card */}
      <div className="relative bg-black/80 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-gray-600 transition-all duration-500 group-hover:scale-105 h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{icon}</div>
          <div className="text-right">
            <div className="text-sm text-gray-400">{year}</div>
            <div className="text-xs text-gray-500">{category}</div>
          </div>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gray-100 transition-colors">
          {title}
        </h3>
        
        {/* Organization */}
        <div className="text-sm text-gray-300 mb-3 font-medium">
          {organization}
        </div>
        
        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">
          {description}
        </p>
        
        {/* Hover Glow Effect */}
        <div 
          className="absolute inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-10"
        />
      </div>
    </motion.div>
  );
}

export default function AwardsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Awards and Recognitions Data
  const awards = [
    {
      id: 1,
      title: "Developer of the Year",
      organization: "Tech Innovation Society",
      year: "2024",
      category: "Excellence",
      description: "Recognized for outstanding contributions to web development and innovative solutions that have impacted thousands of developers worldwide.",
      icon: "🏆",
      color: "#FFD700"
    },
    {
      id: 2,
      title: "Innovation Excellence Award",
      organization: "Global Tech Summit",
      year: "2023",
      category: "Innovation",
      description: "Awarded for pioneering work in 3D web technologies and creating breakthrough user experiences that set new industry standards.",
      icon: "💡",
      color: "#00BFFF"
    },
    {
      id: 3,
      title: "Best Open Source Contributor",
      organization: "GitHub Community",
      year: "2023",
      category: "Community",
      description: "Recognized for significant contributions to open source projects, with over 10,000 stars across repositories and active community engagement.",
      icon: "🌟",
      color: "#32CD32"
    },
    {
      id: 4,
      title: "Rising Star in Tech",
      organization: "TechCrunch",
      year: "2022",
      category: "Recognition",
      description: "Selected as one of the top 50 rising stars in technology for innovative approaches to solving complex development challenges.",
      icon: "⭐",
      color: "#FF69B4"
    },
    {
      id: 5,
      title: "Community Champion",
      organization: "Developer Community",
      year: "2022",
      category: "Leadership",
      description: "Awarded for exceptional mentorship and community building, helping over 500 developers advance their careers through guidance and support.",
      icon: "🤝",
      color: "#9370DB"
    },
    {
      id: 6,
      title: "Technical Leadership Award",
      organization: "Engineering Excellence",
      year: "2021",
      category: "Leadership",
      description: "Recognized for leading high-impact technical projects and mentoring junior developers, resulting in significant team growth and project success.",
      icon: "👑",
      color: "#FF8C00"
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {awards.map((award, index) => (
        <motion.div key={award.id} variants={itemVariants}>
          <AwardCard
            title={award.title}
            organization={award.organization}
            year={award.year}
            category={award.category}
            description={award.description}
            icon={award.icon}
            color={award.color}
            delay={index * 0.15}
            inView={inView}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
