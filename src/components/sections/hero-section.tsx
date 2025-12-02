"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useInView } from "@/hooks/use-in-view";
import { useTypingEffect } from "@/hooks/use-typing-effect";

export default function HeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [showProfession, setShowProfession] = useState(false);
  const [nameGlow, setNameGlow] = useState(false);
  const [auroraIndex, setAuroraIndex] = useState(0);

  // Simplified aurora backgrounds for performance
  const auroraBackgrounds = [
    "from-slate-900/95 via-purple-900/90 to-indigo-900/95",
    "from-purple-900/95 via-blue-800/90 to-cyan-900/95",
  ];

  // Name types once and stays
  const nameTyping = useTypingEffect({
    text: "Uday Kiran",
    speed: 150,
    delay: 500,
  });

  // Local looping profession typing (starts only after showProfession === true)
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

    const professions = [
      "Full Stack Developer",
      "Creative Coder",
      "UI/UX Enthusiast",
    ];
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
    // only re-run if showProfession toggles
  }, [showProfession]);

  // Refs for anime.js animations
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  // Animate elements when they come into view
  useEffect(() => {
    if (inView && containerRef.current) {
      // Container fade in
      animate(containerRef.current, {
        opacity: [0, 1],
        duration: 1000,
        easing: "easeOutQuad",
      });

      // Left content slide with elastic spring effect
      if (leftContentRef.current) {
        animate(leftContentRef.current, {
          opacity: [0, 1],
          translateX: [-150, 0],
          translateY: [-50, 0],
          rotate: [-5, 0],
          scale: [0.8, 1],
          duration: 1800,
          delay: 200,
          easing: "spring(1, 80, 10, 0)",
        });
      }

      // Tagline animation
      if (taglineRef.current) {
        animate(taglineRef.current, {
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 800,
          delay: 200,
          easing: "easeOutQuad",
        });
      }
    }
  }, [inView]);

  // Animate description with wave morphing effect
  useEffect(() => {
    if (showProfession && descriptionRef.current) {
      animate(descriptionRef.current, {
        opacity: [0, 1],
        translateY: [50, -5, 0],
        scale: [0.9, 1.02, 1],
        filter: ["blur(8px)", "blur(0px)"],
        duration: 1200,
        delay: 600,
        easing: "easeOutElastic(1, .6)",
      });
    }
  }, [showProfession]);

  // Animate buttons with 3D flip entrance
  useEffect(() => {
    if (showProfession && buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("a, button");
      animate(buttons, {
        opacity: [0, 1],
        translateY: [80, 0],
        rotateX: [90, 0],
        scale: [0.7, 1.1, 1],
        duration: 1400,
        delay: stagger(200, { start: 800 }),
        easing: "easeOutElastic(1, .5)",
      });
    }
  }, [showProfession]);

  // Social links with spiral pattern and floating effect
  useEffect(() => {
    if (showProfession && socialsRef.current) {
      const socialLinks = Array.from(socialsRef.current.querySelectorAll("a"));
      animate(socialsRef.current, {
        opacity: [0, 1],
        duration: 800,
        delay: 1200,
        easing: "easeOutQuad",
      });
      socialLinks.forEach((link, i) => {
        animate(link, {
          opacity: [0, 1],
          translateY: [100, 0],
          translateX: [(-1) ** i * 50, 0],
          rotate: [180, 0],
          scale: [0, 1.15, 1],
          duration: 1600,
          delay: 1000 + i * 150,
          easing: "easeOutElastic(1, .8)",
        });
      });
      // Continuous floating
      setTimeout(() => {
        animate(socialLinks, {
          translateY: [-8, 8],
          duration: 2000,
          direction: "alternate",
          easing: "easeInOutSine",
          loop: true,
          delay: stagger(200),
        });
      }, 2600);
    }
  }, [showProfession]);

  // Scroll indicator with magnetic pulse effect
  useEffect(() => {
    if (scrollIndicatorRef.current) {
      // Fade in
      animate(scrollIndicatorRef.current, {
        opacity: [0, 1],
        duration: 1000,
        easing: "easeInOutQuad",
      });

      // Elastic bouncing animation
      animate(scrollIndicatorRef.current, {
        translateY: [0, 20, 0],
        scale: [1, 1.2, 1],
        duration: 2500,
        loop: true,
        easing: "easeInOutElastic(1, .6)",
      });

      // Pulsing glow effect
      animate(scrollIndicatorRef.current, {
        filter: [
          "blur(0px) brightness(1)",
          "blur(2px) brightness(1.5)",
          "blur(0px) brightness(1)",
        ],
        duration: 3000,
        loop: true,
        easing: "easeInOutQuad",
      });

      // Inner dot animation
      const dot = scrollIndicatorRef.current.querySelector(".scroll-dot");
      if (dot) {
        animate(dot, {
          translateY: [0, 12, 0],
          opacity: [1, 0.3, 1],
          duration: 2000,
          loop: true,
          easing: "easeInOutQuad",
        });
      }

      // Text pulse animation
      const text = scrollIndicatorRef.current.querySelector(".scroll-text");
      if (text) {
        animate(text, {
          opacity: [0.6, 1, 0.6],
          duration: 2000,
          loop: true,
          easing: "easeInOutQuad",
        });
      }
    }
  }, []);

  // Arrow animation for button
  useEffect(() => {
    if (arrowRef.current) {
      animate(arrowRef.current, {
        translateX: [0, 4, 0],
        duration: 1500,
        loop: true,
        easing: "easeInOutQuad",
      });
    }
  }, []);

  // Button hover handlers
  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    scale: number,
    y: number
  ) => {
    animate(e.currentTarget, {
      scale: scale,
      translateY: y,
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  // Social link hover with liquid morphing
  const handleSocialHover = (
    e: React.MouseEvent<HTMLAnchorElement>,
    entering: boolean
  ) => {
    if (entering) {
      animate(e.currentTarget, {
        translateY: -8,
        scale: 1.15,
        rotate: [-5, 5],
        borderRadius: ["50%", "40%", "50%"],
        boxShadow: [
          "0 0 10px rgba(6, 182, 212, 0.3)",
          "0 10px 40px rgba(6, 182, 212, 0.7)",
        ],
        duration: 600,
        easing: "easeOutElastic(1, .7)",
      });
    } else {
      animate(e.currentTarget, {
        translateY: 0,
        scale: 1,
        rotate: 0,
        borderRadius: "50%",
        boxShadow: "0 0 10px rgba(6, 182, 212, 0.3)",
        duration: 400,
        easing: "easeOutQuad",
      });
    }
  };

  return (
    <section
      id="home"
      ref={ref}
      className={`min-h-screen relative overflow-hidden bg-gradient-to-br transition-all duration-1000 cursor-ripple ${auroraBackgrounds[auroraIndex]}`}
    >
      {/* Background layers - ensure they stay behind content */}
      <div className="absolute inset-0 z-0">
        {/* Aurora Borealis Background */}
        {/* <AuroraCSS /> */}

        {/* Floating Blob Effect - Main Background */}
        <div className="floating-blob absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="blob-core w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-purple-500/40 via-blue-500/30 to-cyan-500/40 animate-blob-float"></div>
          <div className="blob-glow w-32 h-32 sm:w-36 sm:h-36 lg:w-48 lg:h-48 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/20 via-blue-500/15 to-cyan-500/20 animate-blob-glow"></div>
        </div>

        {/* Fireflies Effect - Main Background */}
        <div className="fireflies-container absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`firefly-${i} absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full animate-firefly cursor-pointer`}
              onClick={(e) => {
                const firefly = e.currentTarget;
                // Explosive morph effect
                animate(firefly, {
                  scale: [1, 2.5, 0.8, 1.5, 1],
                  opacity: [1, 0.8, 0.6, 0.4, 0.3],
                  rotate: [0, 180, 360],
                  duration: 800,
                  easing: "easeOutElastic(1, .6)",
                });

                // Shockwave ripple effect
                const shockwave = document.createElement("div");
                shockwave.style.cssText = `
                  position: absolute;
                  width: 10px;
                  height: 10px;
                  border: 2px solid rgba(6, 182, 212, 0.8);
                  border-radius: 50%;
                  pointer-events: none;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                `;
                firefly.appendChild(shockwave);
                animate(shockwave, {
                  scale: [1, 20],
                  opacity: [1, 0],
                  duration: 1000,
                  easing: "easeOutQuad",
                  complete: () => shockwave.remove(),
                });

                setNameGlow(true);
                setAuroraIndex((prev) => (prev + 1) % auroraBackgrounds.length);
                setTimeout(() => setNameGlow(false), 2000);
              }}
            />
          ))}
        </div>

        {/* Interactive 3D Ripple Effect - Replaced with CSS animation */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="ripple-container w-full h-full overflow-hidden">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={`ripple-circle-${i} absolute rounded-full border border-cyan-400/20 animate-ripple`}
              />
            ))}
          </div>
        </div>
      </div>{" "}
      <div className="relative z-10 min-h-screen flex items-center py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            ref={containerRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            style={{ opacity: 0 }}
          >
            {/* Left Side - Professional Introduction */}
            <div
              ref={leftContentRef}
              className="space-y-6 lg:space-y-8 relative z-20 order-2 lg:order-1"
              style={{ opacity: 0 }}
            >
              <div className="space-y-4 lg:space-y-6">
                <div
                  ref={taglineRef}
                  className="text-xs sm:text-sm text-gray-400 font-mono tracking-widest uppercase border-l-2 border-cyan-500 pl-3 sm:pl-4"
                  style={{ opacity: 0 }}
                >
                  Software Engineer & 3D Developer
                </div>

                <div className="space-y-2">
                  <h1
                    id="hero-name"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
                  >
                    <span className="block text-white">Uday Kiran</span>
                  </h1>

                  {showProfession && (
                    <h2
                      className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-gray-300"
                      style={{ opacity: 0 }}
                      ref={(el) => {
                        if (el && showProfession) {
                          animate(el, {
                            opacity: [0, 1],
                            translateY: [10, 0],
                            duration: 600,
                            delay: 300,
                            easing: "easeOutQuad",
                          });
                        }
                      }}
                    >
                      <span className="font-mono">
                        {professionText}
                        <span className="animate-pulse text-cyan-400">_</span>
                      </span>
                    </h2>
                  )}
                </div>
              </div>

              <p
                ref={descriptionRef}
                className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-2xl font-light"
                style={{ opacity: 0 }}
              >
                Passionate about learning and building digital experiences with
                modern web technologies. Currently exploring{" "}
                <span className="text-purple-300 font-semibold">React</span>,{" "}
                and the latest web development practices. Always eager to learn
                new technologies and create innovative solutions.
              </p>

              <div
                ref={buttonsRef}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
                style={{ opacity: 0 }}
              >
                <button
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-white text-black hover:bg-gray-100 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2"
                  onMouseEnter={(e) => handleButtonHover(e, 1.02, -2)}
                  onMouseLeave={(e) => handleButtonHover(e, 1, 0)}
                  onMouseDown={(e) => handleButtonHover(e, 0.98, 0)}
                  onMouseUp={(e) => handleButtonHover(e, 1.02, -2)}
                  onClick={() =>
                    document
                      .querySelector("#projects")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <span className="flex items-center gap-2">
                    View Projects
                    <span ref={arrowRef} className="inline-block">
                      →
                    </span>
                  </span>
                </button>

                <button
                  className="group px-6 sm:px-8 py-3 sm:py-4 border border-white/20 bg-white/5 text-white hover:bg-white/10 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 backdrop-blur-sm"
                  onMouseEnter={(e) => handleButtonHover(e, 1.02, -2)}
                  onMouseLeave={(e) => handleButtonHover(e, 1, 0)}
                  onMouseDown={(e) => handleButtonHover(e, 0.98, 0)}
                  onMouseUp={(e) => handleButtonHover(e, 1.02, -2)}
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get In Touch
                </button>
              </div>

              <div
                ref={socialsRef}
                className="flex items-center gap-4 sm:gap-6 pt-4"
                style={{ opacity: 0 }}
              >
                <span className="text-xs sm:text-sm text-gray-500 font-mono">
                  Connect:
                </span>
                {[
                  {
                    name: "GitHub",
                    href: "https://github.com/ManneUdayKiran",
                    icon: (
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5"
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
                        className="w-4 h-4 sm:w-5 sm:h-5"
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
                        className="w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    ),
                  },
                ].map((social, index) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                    onMouseEnter={(e) => handleSocialHover(e, true)}
                    onMouseLeave={(e) => handleSocialHover(e, false)}
                    onMouseDown={(e) => {
                      animate(e.currentTarget, {
                        scale: 0.95,
                        duration: 150,
                        easing: "easeOutQuad",
                      });
                    }}
                    onMouseUp={(e) => {
                      animate(e.currentTarget, {
                        scale: 1,
                        duration: 150,
                        easing: "easeOutQuad",
                      });
                    }}
                    title={social.name}
                    style={{ opacity: 0 }}
                  >
                    <span className="block group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Enhanced Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        style={{ opacity: 0 }}
      >
        <div
          className="relative group cursor-pointer"
          onMouseEnter={(e) => {
            animate(e.currentTarget, {
              scale: 1.1,
              duration: 300,
              easing: "easeOutQuad",
            });
          }}
          onMouseLeave={(e) => {
            animate(e.currentTarget, {
              scale: 1,
              duration: 300,
              easing: "easeOutQuad",
            });
          }}
          onClick={() =>
            document
              .querySelector("#projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {/* Outer glow */}
          <div className="absolute inset-0 w-6 h-10 sm:w-8 sm:h-12 border-2 border-cyan-400/60 rounded-full blur-sm"></div>

          {/* Main indicator */}
          <div className="relative w-6 h-10 sm:w-8 sm:h-12 border-2 border-cyan-400 rounded-full flex justify-center backdrop-blur-sm bg-white/5">
            <div className="scroll-dot w-1 h-3 sm:w-1.5 sm:h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mt-1.5 sm:mt-2 shadow-lg" />
          </div>

          {/* Scroll text */}
          <p className="scroll-text absolute top-12 sm:top-16 left-1/2 transform -translate-x-1/2 text-cyan-300/80 text-xs sm:text-sm font-medium tracking-wider whitespace-nowrap">
            Scroll to explore
          </p>
        </div>
      </div>
      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            width: 200px;
            height: 200px;
            opacity: 0;
          }
        }

        @keyframes aurora-1 {
          0% {
            background: linear-gradient(
              45deg,
              rgba(139, 92, 246, 0.3),
              rgba(59, 130, 246, 0.2)
            );
            transform: translateX(-100%) rotate(0deg);
          }
          50% {
            background: linear-gradient(
              45deg,
              rgba(59, 130, 246, 0.4),
              rgba(6, 182, 212, 0.3)
            );
            transform: translateX(0%) rotate(180deg);
          }
          100% {
            background: linear-gradient(
              45deg,
              rgba(139, 92, 246, 0.3),
              rgba(59, 130, 246, 0.2)
            );
            transform: translateX(100%) rotate(360deg);
          }
        }

        @keyframes aurora-2 {
          0% {
            background: linear-gradient(
              -45deg,
              rgba(236, 72, 153, 0.2),
              rgba(139, 92, 246, 0.3)
            );
            transform: translateX(100%) rotate(0deg);
          }
          50% {
            background: linear-gradient(
              -45deg,
              rgba(6, 182, 212, 0.3),
              rgba(236, 72, 153, 0.4)
            );
            transform: translateX(0%) rotate(-180deg);
          }
          100% {
            background: linear-gradient(
              -45deg,
              rgba(236, 72, 153, 0.2),
              rgba(139, 92, 246, 0.3)
            );
            transform: translateX(-100%) rotate(-360deg);
          }
        }

        @keyframes blob-float {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(-50%, -60%) scale(1.1) rotate(120deg);
          }
          66% {
            transform: translate(-40%, -50%) scale(0.9) rotate(240deg);
          }
        }

        @keyframes blob-glow {
          0%,
          100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }

        @keyframes firefly {
          0% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0.3;
          }
        }

        .animate-ripple {
          animation: ripple linear infinite;
        }
        .animate-aurora-1 {
          animation: aurora-1 8s ease-in-out infinite;
        }
        .animate-aurora-2 {
          animation: aurora-2 12s ease-in-out infinite reverse;
        }
        .animate-blob-float {
          animation: blob-float 6s ease-in-out infinite;
        }
        .animate-blob-glow {
          animation: blob-glow 4s ease-in-out infinite;
        }
        .animate-firefly {
          animation: firefly 2s ease-in-out infinite;
        }

        .ripple-circle-0 {
          left: 20%;
          top: 30%;
          animation-delay: 0s;
          animation-duration: 3s;
        }
        .ripple-circle-1 {
          left: 70%;
          top: 20%;
          animation-delay: 0.5s;
          animation-duration: 4s;
        }
        .ripple-circle-2 {
          left: 40%;
          top: 60%;
          animation-delay: 1s;
          animation-duration: 3.5s;
        }
        .ripple-circle-3 {
          left: 80%;
          top: 70%;
          animation-delay: 1.5s;
          animation-duration: 4.5s;
        }
        .ripple-circle-4 {
          left: 15%;
          top: 80%;
          animation-delay: 2s;
          animation-duration: 3.2s;
        }
        .ripple-circle-5 {
          left: 60%;
          top: 40%;
          animation-delay: 2.5s;
          animation-duration: 4.2s;
        }
        .ripple-circle-6 {
          left: 30%;
          top: 15%;
          animation-delay: 3s;
          animation-duration: 3.8s;
        }
        .ripple-circle-7 {
          left: 85%;
          top: 45%;
          animation-delay: 3.5s;
          animation-duration: 4.8s;
        }
        .ripple-circle-8 {
          left: 50%;
          top: 85%;
          animation-delay: 4s;
          animation-duration: 3.3s;
        }
        .ripple-circle-9 {
          left: 25%;
          top: 50%;
          animation-delay: 4.5s;
          animation-duration: 4.3s;
        }
        .ripple-circle-10 {
          left: 75%;
          top: 65%;
          animation-delay: 5s;
          animation-duration: 3.7s;
        }
        .ripple-circle-11 {
          left: 45%;
          top: 25%;
          animation-delay: 5.5s;
          animation-duration: 4.7s;
        }

        .firefly-0 {
          left: 10%;
          top: 20%;
          animation-delay: 0s;
        }
        .firefly-1 {
          left: 30%;
          top: 10%;
          animation-delay: 0.5s;
        }
        .firefly-2 {
          left: 60%;
          top: 30%;
          animation-delay: 1s;
        }
        .firefly-3 {
          left: 80%;
          top: 50%;
          animation-delay: 1.5s;
        }
        .firefly-4 {
          left: 20%;
          top: 70%;
          animation-delay: 2s;
        }
        .firefly-5 {
          left: 70%;
          top: 80%;
          animation-delay: 2.5s;
        }
        .firefly-6 {
          left: 40%;
          top: 60%;
          animation-delay: 3s;
        }
        .firefly-7 {
          left: 90%;
          top: 30%;
          animation-delay: 3.5s;
        }
        .firefly-8 {
          left: 15%;
          top: 45%;
          animation-delay: 4s;
        }
        .firefly-9 {
          left: 50%;
          top: 15%;
          animation-delay: 4.5s;
        }
        .firefly-10 {
          left: 75%;
          top: 65%;
          animation-delay: 5s;
        }
        .firefly-11 {
          left: 35%;
          top: 85%;
          animation-delay: 5.5s;
        }
      `}</style>
    </section>
  );
}
