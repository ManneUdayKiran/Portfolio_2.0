"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { useTheme } from "@/components/theme-provider";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoTextRef = useRef<SVGTextElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileNavItemsRef = useRef<HTMLDivElement>(null);

  // Animate navigation with slide and blur morph
  useEffect(() => {
    if (navRef.current) {
      animate(navRef.current, {
        translateY: [-100, 10, 0],
        opacity: [0, 1],
        scale: [0.9, 1.02, 1],
        filter: ["blur(10px)", "blur(0px)"],
        duration: 1200,
        easing: "easeOutElastic(1, .6)",
      });
    }
  }, []);

  // SVG Logo drawing animation with createDrawable-like effect
  useEffect(() => {
    if (logoTextRef.current) {
      const textElement = logoTextRef.current;

      try {
        // Calculate text length for stroke animation (drawable effect)
        const bbox = textElement.getBBox();
        const pathLength = (bbox.width + bbox.height) * 2;

        // Set initial state - completely hidden
        textElement.setAttribute("fill", "transparent");
        textElement.style.strokeDasharray = pathLength.toString();
        textElement.style.strokeDashoffset = pathLength.toString();
        textElement.style.strokeOpacity = "1";

        // Create drawable effect: animate from 0% to 100% drawn
        animate(textElement, {
          strokeDashoffset: [pathLength, 0], // Draw from 0 to 1 (0% to 100%)
          duration: 2000,
          easing: "inOutQuad",
          delay: 400,
          loop: false,
          complete: () => {
            // After drawing completes, reveal gradient fill and fade stroke
            textElement.setAttribute("fill", "url(#logoGradient)");
            animate(textElement, {
              strokeOpacity: [1, 0],
              duration: 800,
              easing: "easeInOutQuad",
            });
          },
        });
      } catch (error) {
        // Fallback: show gradient immediately
        console.log("Logo animation failed, showing fallback");
        textElement.setAttribute("fill", "url(#logoGradient)");
        textElement.style.strokeOpacity = "0";
      }
    }
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    if (mobileMenuRef.current && mobileNavItemsRef.current) {
      if (isMobileMenuOpen) {
        // Show menu
        mobileMenuRef.current.style.display = "block";

        animate(mobileMenuRef.current, {
          opacity: [0, 1],
          maxHeight: [0, 400],
          duration: 300,
          easing: "easeOutQuad",
        });

        // Wave cascade entrance for nav items
        const navItems = Array.from(mobileNavItemsRef.current.children);
        navItems.forEach((item, i) => {
          animate(item, {
            opacity: [0, 1],
            translateX: [-80, 5, 0],
            translateY: [i * 15, 0],
            rotate: [-15, 0],
            scale: [0.5, 1.1, 1],
            duration: 900,
            delay: 100 + i * 80,
            easing: "easeOutElastic(1, .6)",
          });
        });
      } else {
        animate(mobileMenuRef.current, {
          opacity: [1, 0],
          maxHeight: [400, 0],
          duration: 300,
          easing: "easeInQuad",
          complete: () => {
            if (mobileMenuRef.current) {
              mobileMenuRef.current.style.display = "none";
            }
          },
        });
      }
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    // Use Lenis for smooth scrolling if available
    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(href, {
        offset: -64, // Offset for fixed navbar height
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      // Fallback to native smooth scroll
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    setIsMobileMenuOpen(false);
  };

  const handleLogoHover = (isHovering: boolean) => {
    if (logoRef.current) {
      animate(logoRef.current, {
        scale: isHovering ? 1.05 : 1,
        duration: 200,
        easing: "easeOutQuad",
      });
    }
  };

  const handleNavItemHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    isHovering: boolean
  ) => {
    animate(e.currentTarget, {
      scale: isHovering ? 1.05 : 1,
      duration: 200,
      easing: "easeOutQuad",
    });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 dark:bg-black/10 backdrop-blur-lg border-b border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with SVG Drawing Animation */}
          <div
            ref={logoRef}
            className="cursor-pointer"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
          >
            <svg
              width="140"
              height="40"
              viewBox="0 0 140 40"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              <defs>
                <linearGradient
                  id="logoGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
                  />
                  <stop
                    offset="50%"
                    style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: "#ec4899", stopOpacity: 1 }}
                  />
                </linearGradient>

                <filter id="logoGlow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <text
                ref={logoTextRef}
                x="5"
                y="28"
                fontSize="24"
                fontWeight="bold"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="url(#logoGradient)"
                stroke="rgba(6, 182, 212, 1)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#logoGlow)"
                style={{ paintOrder: "stroke" }}
              >
                Portfolio
              </text>
            </svg>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                onMouseEnter={(e) => handleNavItemHover(e, true)}
                onMouseLeave={(e) => handleNavItemHover(e, false)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {item.name}
              </button>
            ))}

            {/* Theme Toggle */}
            {/* <motion.button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </motion.button> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`bg-current h-0.5 w-6 rounded-sm transition-all ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              />
              <span
                className={`bg-current h-0.5 w-6 rounded-sm my-1 transition-all ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`bg-current h-0.5 w-6 rounded-sm transition-all ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden bg-white/95 dark:bg-black/95 backdrop-blur-lg border-t border-white/20 overflow-hidden"
        style={{ display: "none", opacity: 0, maxHeight: 0 }}
      >
        <div ref={mobileNavItemsRef} className="px-4 py-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.name}
            </button>
          ))}

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300"
          >
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span>Toggle Theme</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
