"use client";

import { useState, useRef, useEffect } from "react";
import { animate, stagger } from "animejs";
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

  // Refs for animated elements
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const scanLineFormRef = useRef<HTMLDivElement>(null);
  const scanLineContactRef = useRef<HTMLDivElement>(null);
  const buttonScanRef = useRef<HTMLDivElement>(null);
  const successScanRef = useRef<HTMLDivElement>(null);
  const contactLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const orbRef = useRef<HTMLDivElement>(null);
  const orbIconRef = useRef<HTMLSpanElement>(null);
  const orbRingsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  // Entrance animations
  useEffect(() => {
    if (inView) {
      // Header animations
      if (titleRef.current) {
        animate(titleRef.current, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: "easeOutQuad",
          delay: 200,
        });
      }

      if (subtitleRef.current) {
        animate(subtitleRef.current, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: "easeOutQuad",
          delay: 400,
        });
      }

      // Form container animation
      if (formContainerRef.current) {
        animate(formContainerRef.current, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: "easeOutQuad",
          delay: 600,
        });
      }

      // Contact info animation
      if (contactInfoRef.current) {
        animate(contactInfoRef.current, {
          opacity: [0, 1],
          translateY: [30, 0],
          duration: 600,
          easing: "easeOutQuad",
          delay: 800,
        });
      }

      // Contact links with wave ripple entrance
      const validLinks = contactLinksRef.current.filter((el) => el !== null);
      if (validLinks.length > 0) {
        validLinks.forEach((link, i) => {
          animate(link, {
            opacity: [0, 1],
            translateX: [-100, 10, 0],
            translateY: [i * 20, 0],
            rotate: [-10, 2, 0],
            scale: [0.5, 1.1, 1],
            duration: 1400,
            easing: "easeOutElastic(1, .6)",
            delay: 1000 + i * 120,
          });
        });

        // Continuous breathing animation
        setTimeout(() => {
          animate(validLinks, {
            scale: [1, 1.03, 1],
            duration: 3000,
            direction: "alternate",
            easing: "easeInOutSine",
            loop: true,
            delay: stagger(400),
          });
        }, 2000);
      }
    }
  }, [inView]);

  // Continuous animations
  useEffect(() => {
    // Floating particles
    particlesRef.current.forEach((particle, i) => {
      if (particle) {
        animate(particle, {
          translateY: [0, -20, 0],
          opacity: [0.2, 1, 0.2],
          scale: [1, 1.5, 1],
          duration: 3000 + Math.random() * 2000,
          easing: "easeInOutQuad",
          loop: true,
          delay: Math.random() * 2000,
        });
      }
    });

    // Scan line animations
    if (scanLineFormRef.current) {
      animate(scanLineFormRef.current, {
        translateY: [0, 400, 0],
        opacity: [0, 1, 0.5, 1, 0],
        duration: 3000,
        easing: "linear",
        loop: true,
      });
    }

    if (scanLineContactRef.current) {
      animate(scanLineContactRef.current, {
        translateY: [0, 200, 0],
        opacity: [0, 1, 0.5, 1, 0],
        duration: 4000,
        easing: "linear",
        loop: true,
        delay: 1000,
      });
    }

    // Button scan line
    if (buttonScanRef.current) {
      animate(buttonScanRef.current, {
        translateX: ["-100%", "100%"],
        duration: 2000,
        easing: "linear",
        loop: true,
      });
    }

    // Orb animations
    if (orbRef.current) {
      animate(orbRef.current, {
        rotateY: [0, 360],
        duration: 10000,
        easing: "linear",
        loop: true,
      });
    }

    if (orbIconRef.current) {
      animate(orbIconRef.current, {
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7],
        duration: 2000,
        easing: "easeInOutQuad",
        loop: true,
      });
    }

    // Orbital rings
    orbRingsRef.current.forEach((ring, i) => {
      if (ring) {
        animate(ring, {
          rotate: [0, 360],
          duration: 5000 + i * 2000,
          easing: "linear",
          loop: true,
        });
      }
    });
  }, []);

  // Success message animation
  useEffect(() => {
    if (isSubmitted && successScanRef.current) {
      animate(successScanRef.current, {
        translateX: ["-100%", "100%"],
        duration: 1500,
        easing: "easeInOut",
        loop: 2,
      });
    }
  }, [isSubmitted]);

  // Button hover handlers
  const handleButtonMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isSubmitting) {
      animate(e.currentTarget, {
        scale: 1.05,
        boxShadow:
          "0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(6, 182, 212, 0.3)",
        duration: 300,
        easing: "easeOutQuad",
      });
    }
  };

  const handleButtonMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    animate(e.currentTarget, {
      scale: [1, 0.95, 1],
      duration: 200,
      easing: "easeOutQuad",
    });
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
        {[
          { left: 15, top: 20 },
          { left: 85, top: 15 },
          { left: 65, top: 75 },
          { left: 25, top: 85 },
          { left: 90, top: 45 },
          { left: 10, top: 60 },
          { left: 75, top: 25 },
          { left: 45, top: 90 },
          { left: 20, top: 10 },
          { left: 80, top: 70 },
          { left: 55, top: 35 },
          { left: 35, top: 80 },
          { left: 70, top: 5 },
          { left: 5, top: 50 },
          { left: 95, top: 30 },
          { left: 40, top: 95 },
          { left: 60, top: 40 },
          { left: 30, top: 65 },
          { left: 85, top: 55 },
          { left: 50, top: 15 },
        ].map((particle, i) => (
          <div
            key={i}
            ref={(el) => {
              particlesRef.current[i] = el;
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={ref} className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 opacity-0"
          >
            Holographic{" "}
            <span className="text-neon-cyan glow-text">Contact</span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl text-gray-300 max-w-3xl mx-auto opacity-0"
          >
            Initialize quantum communication protocol. Ready to establish secure
            connection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Holographic Contact Form */}
          <div ref={formContainerRef} className="opacity-0">
            <div className="relative group">
              {/* Glassmorphism Hologram Panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 rounded-3xl backdrop-blur-xl border border-cyan-400/20 shadow-2xl">
                {/* Glowing Edge Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Scan Line Animation */}
                <div
                  ref={scanLineFormRef}
                  className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
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
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...register("name", {
                        required: "Name is required",
                      })}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 font-mono transition-all duration-300 hover:border-cyan-400/50 focus:scale-[1.02] focus:shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_0_20px_rgba(6,182,212,0.1)]"
                      placeholder="Enter your full name"
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
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 font-mono transition-all duration-300 hover:border-cyan-400/50 focus:scale-[1.02] focus:shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_0_20px_rgba(6,182,212,0.1)]"
                      placeholder="your.email@example.com"
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
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      {...register("message", {
                        required: "Message is required",
                      })}
                      className="w-full px-4 py-3 bg-black/30 backdrop-blur-sm border border-cyan-400/30 rounded-lg focus:border-cyan-400 focus:outline-none text-white placeholder-gray-400 font-mono transition-all duration-300 hover:border-cyan-400/50 resize-none focus:scale-[1.02] focus:shadow-[0_0_30px_rgba(6,182,212,0.4),inset_0_0_20px_rgba(6,182,212,0.1)]"
                      placeholder="Write your message here..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400 font-mono">
                        &gt; ERROR: {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseEnter={handleButtonMouseEnter}
                    onMouseLeave={handleButtonMouseLeave}
                    onClick={handleButtonClick}
                    className="relative w-full py-4 px-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/50 hover:border-cyan-400 disabled:opacity-50 text-cyan-400 font-mono uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 overflow-hidden group"
                  >
                    {/* Button Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Scan Line Effect */}
                    <div
                      ref={buttonScanRef}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
                    />

                    <div className="relative z-10 flex items-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </div>
                  </button>

                  {isSubmitted && (
                    <div
                      style={{
                        opacity: 0,
                        transform: "translateY(10px) scale(0.9)",
                      }}
                      ref={(el) => {
                        if (el) {
                          animate(el, {
                            opacity: [0, 1],
                            translateY: [10, 0],
                            scale: [0.9, 1],
                            duration: 400,
                            easing: "easeOutQuad",
                          });
                        }
                      }}
                      className="relative p-6 bg-gradient-to-r from-green-500/10 to-cyan-500/10 backdrop-blur-sm border border-green-400/30 rounded-lg text-center overflow-hidden"
                    >
                      {/* Success Scan Lines */}
                      <div
                        ref={successScanRef}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/20 to-transparent"
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
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Holographic Contact Information */}
          <div ref={contactInfoRef} className="space-y-8 opacity-0">
            <div className="relative p-6 bg-gradient-to-br from-purple-500/10 via-blue-500/5 to-cyan-500/10 backdrop-blur-xl border border-purple-400/20 rounded-3xl">
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
              <div
                ref={scanLineContactRef}
                className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
              />
            </div>

            <div className="space-y-4">
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
              ].map((contact, index) => {
                return (
                  <ContactLink
                    key={contact.label}
                    contact={contact}
                    index={index}
                    contactLinksRef={contactLinksRef}
                  />
                );
              })}
            </div>

            {/* Holographic Visualization */}
            <div className="mt-12 text-center">
              <div ref={orbRef} className="relative w-32 h-32 mx-auto">
                {/* Holographic Orb */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-blue-400/10 to-purple-400/20 rounded-full backdrop-blur-xl border border-cyan-400/30 flex items-center justify-center">
                  <span ref={orbIconRef} className="text-4xl">
                    🌐
                  </span>
                </div>

                {/* Orbital Rings */}
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      orbRingsRef.current[i] = el;
                    }}
                    className="absolute inset-0 border border-cyan-400/20 rounded-full"
                    style={{
                      transform: `scale(${1 + i * 0.3})`,
                    }}
                  />
                ))}
              </div>

              <p className="mt-6 text-cyan-400/70 font-mono text-sm">
                &gt; QUANTUM_COMMUNICATION_HUB &lt;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Link Component with Anime.js animations
function ContactLink({
  contact,
  index,
  contactLinksRef,
}: {
  contact: {
    icon: string;
    label: string;
    value: string;
    href: string;
    color: string;
  };
  index: number;
  contactLinksRef: React.MutableRefObject<(HTMLAnchorElement | null)[]>;
}) {
  const scanLineRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (scanLineRef.current && linkRef.current) {
      let animation: any = null;

      const handleMouseEnter = () => {
        if (scanLineRef.current) {
          animation = animate(scanLineRef.current, {
            translateX: ["-100%", "100%"],
            duration: 1000,
            easing: "linear",
            loop: true,
          });
        }
      };

      const handleMouseLeave = () => {
        if (animation) {
          animation.pause();
          animation = null;
        }
        if (scanLineRef.current) {
          (scanLineRef.current as HTMLElement).style.transform =
            "translateX(-100%)";
        }
      };

      linkRef.current?.addEventListener("mouseenter", handleMouseEnter);
      linkRef.current?.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        linkRef.current?.removeEventListener("mouseenter", handleMouseEnter);
        linkRef.current?.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <a
      ref={(el) => {
        contactLinksRef.current[index] = el;
        if (linkRef.current !== el) {
          (linkRef as any).current = el;
        }
      }}
      href={contact.href}
      className="relative flex items-center space-x-4 p-4 bg-black/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg hover:border-cyan-400/50 transition-all duration-300 group overflow-hidden opacity-0"
      onMouseEnter={(e) => {
        // Liquid morphing effect
        animate(e.currentTarget, {
          translateX: [0, 15],
          scale: [1, 1.05],
          rotateY: [0, 5],
          borderRadius: ["8px", "20px", "8px"],
          boxShadow: [
            "0 0 10px rgba(6, 182, 212, 0.1)",
            "0 20px 60px rgba(6, 182, 212, 0.5)",
          ],
          duration: 800,
          easing: "easeOutElastic(1, .7)",
        });

        // Icon bounce
        const icon = e.currentTarget.querySelector(".text-2xl");
        if (icon) {
          animate(icon, {
            scale: [1, 1.3, 1],
            rotate: [-10, 10, 0],
            duration: 600,
            easing: "easeOutElastic(1, .6)",
          });
        }
      }}
      onMouseLeave={(e) => {
        animate(e.currentTarget, {
          translateX: 0,
          boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
          duration: 300,
          easing: "easeOutQuad",
        });
      }}
    >
      {/* Holographic Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-blue-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Scan Line */}
      <div
        ref={scanLineRef}
        className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100"
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
    </a>
  );
}
