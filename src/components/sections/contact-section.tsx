"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "@/hooks/use-form";
import { useInView } from "@/hooks/use-in-view";
import "../../app/hologram.css";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

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
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden"
    >
      {/* Holographic Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 grid-background" />
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
          >
            Holographic{" "}
            <span className="text-neon-cyan glow-text">Contact</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Initialize quantum communication protocol. Ready to establish secure
            connection.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Holographic Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="relative group">
              {/* Glassmorphism Hologram Panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl backdrop-blur-xl border border-cyan-400/20 shadow-2xl">
                {/* Glowing Edge Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Scan Line Animation */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  animate={{
                    y: [0, 400, 0],
                    opacity: [0, 1, 0.5, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>

              <div className="relative z-10 p-8 rounded-3xl">
                {/* Hologram Terminal Header */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-cyan-400/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-cyan-400 font-mono text-sm">
                      HOLOGRAM_TERMINAL_ACTIVE
                    </span>
                  </div>
                  <div className="text-cyan-400/60 font-mono text-xs">
                    QUANTUM_ENCRYPTED
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="block text-sm font-mono text-cyan-400 mb-2 uppercase tracking-wider"
                    >
                      &gt; Name
                    </label>
                    <motion.input
                      whileFocus={{
                        scale: 1.02,
                        boxShadow:
                          "0 0 30px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)",
                      }}
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Identity verification required",
                      })}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 font-mono transition-all duration-300 hover:border-cyan-400/50"
                      placeholder="Initialize identity protocol..."
                    />
                    {/* Neon Glow Effect on Focus */}
                    <motion.div
                      className="absolute inset-0 border border-cyan-400/0 rounded-lg pointer-events-none"
                      whileFocus={{
                        borderColor: "rgba(6, 182, 212, 0.6)",
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                      }}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400 font-mono">
                        &gt; ERROR: {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="block text-sm font-mono text-cyan-400 mb-2 uppercase tracking-wider"
                    >
                      &gt; Email Address
                    </label>
                    <motion.input
                      whileFocus={{
                        scale: 1.02,
                        boxShadow:
                          "0 0 30px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)",
                      }}
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Quantum address required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid quantum signature",
                        },
                      })}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 font-mono transition-all duration-300 hover:border-cyan-400/50"
                      placeholder="neural.link@cybernet.holo"
                    />
                    <motion.div
                      className="absolute inset-0 border border-cyan-400/0 rounded-lg pointer-events-none"
                      whileFocus={{
                        borderColor: "rgba(6, 182, 212, 0.6)",
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                      }}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400 font-mono">
                        &gt; ERROR: {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="message"
                      className="block text-sm font-mono text-cyan-400 mb-2 uppercase tracking-wider"
                    >
                      &gt; Message
                    </label>
                    <motion.textarea
                      whileFocus={{
                        scale: 1.02,
                        boxShadow:
                          "0 0 30px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.1)",
                      }}
                      id="message"
                      rows={5}
                      {...register("message", {
                        required: "Neural transmission required",
                      })}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 font-mono transition-all duration-300 hover:border-cyan-400/50 resize-none"
                      placeholder="Upload consciousness data stream..."
                    />
                    <motion.div
                      className="absolute inset-0 border border-cyan-400/0 rounded-lg pointer-events-none"
                      whileFocus={{
                        borderColor: "rgba(6, 182, 212, 0.6)",
                        boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
                      }}
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400 font-mono">
                        &gt; ERROR: {errors.message}
                      </p>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.05,
                      boxShadow:
                        "0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(6, 182, 212, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-full py-4 px-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/50 hover:border-cyan-400 disabled:opacity-50 text-cyan-400 font-mono uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden group"
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Scan Line Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                      animate={{
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                    <div className="relative z-10 flex items-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          <span>◦ TRANSMITTING_DATA ◦</span>
                        </>
                      ) : (
                        <span>◦ INITIATE_NEURAL_LINK ◦</span>
                      )}
                    </div>
                  </motion.button>

                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="relative p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 backdrop-blur-sm border border-green-400/30 rounded-lg text-center overflow-hidden"
                    >
                      {/* Success Scan Lines */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: 2,
                          ease: "easeInOut",
                        }}
                      />

                      <div className="relative z-10">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <span className="text-green-400 font-mono text-sm">
                            CONNECTION_ESTABLISHED
                          </span>
                        </div>
                        <p className="text-cyan-400 font-mono">
                          ◦ Neural transmission successful ◦
                        </p>
                        <div className="text-xs text-green-400/70 font-mono mt-2">
                          Signal strength: ████████████ 100%
                        </div>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </motion.div>

          {/* Holographic Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div
              variants={itemVariants}
              className="relative p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-cyan-500/10 backdrop-blur-xl border border-purple-400/20 rounded-3xl"
            >
              {/* Holographic Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-mono">
                  ◦ QUANTUM_CHANNELS ◦
                </h3>
              </div>

              <p className="text-gray-300 mb-8 leading-relaxed font-mono text-sm">
                &gt; Multiple communication protocols available for neural
                interface. Select preferred quantum entanglement method for data
                transmission.
              </p>

              {/* Scan Line for Contact Info */}
              <motion.div
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                animate={{
                  y: [0, 200, 0],
                  opacity: [0, 1, 0.5, 1, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
                }}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-4">
              {[
                {
                  icon: "📧",
                  label: "Neural_Mail",
                  value: "hello@portfolio.dev",
                  href: "mailto:hello@portfolio.dev",
                  color: "cyan",
                },
                {
                  icon: "💼",
                  label: "Professional_Network",
                  value: "linkedin.com/in/portfolio",
                  href: "https://linkedin.com/in/portfolio",
                  color: "blue",
                },
                {
                  icon: "⚛️",
                  label: "Code_Repository",
                  value: "github.com/portfolio",
                  href: "https://github.com/portfolio",
                  color: "purple",
                },
                {
                  icon: "🐦",
                  label: "Broadcast_Channel",
                  value: "@portfolio_dev",
                  href: "https://twitter.com/portfolio_dev",
                  color: "pink",
                },
              ].map((contact, index) => (
                <motion.a
                  key={contact.label}
                  href={contact.href}
                  className="relative flex items-center space-x-4 p-4 bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden"
                  whileHover={{
                    x: 10,
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Holographic Glow Effect */}
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Scan Line */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative z-10 flex items-center space-x-4">
                    <div className="text-2xl">{contact.icon}</div>
                    <div>
                      <div className="text-sm text-cyan-400/70 font-mono uppercase tracking-wider">
                        {contact.label}
                      </div>
                      <div className="text-white font-mono group-hover:text-cyan-400 transition-colors">
                        {contact.value}
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Holographic Visualization */}
            <motion.div variants={itemVariants} className="mt-12 text-center">
              <motion.div
                className="relative w-32 h-32 mx-auto"
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Holographic Orb */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-400/10 to-purple-400/20 rounded-full backdrop-blur-xl border border-cyan-400/30 flex items-center justify-center">
                  <motion.span
                    className="text-4xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    🌐
                  </motion.span>
                </div>

                {/* Orbital Rings */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0 border border-cyan-400/20 rounded-full"
                    style={{
                      transform: `scale(${1 + i * 0.3})`,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 5 + i * 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </motion.div>

              <p className="mt-6 text-cyan-400/70 font-mono text-sm">
                &gt; QUANTUM_COMMUNICATION_HUB &lt;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
