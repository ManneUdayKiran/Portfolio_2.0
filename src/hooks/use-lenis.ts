"use client";

import { useEffect, useRef, useState } from "react";

export function useLenisScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    const lenis = (window as any).lenis;

    if (!lenis) {
      console.warn("Lenis not initialized");
      return;
    }

    // Listen to Lenis scroll events
    const handleScroll = (e: any) => {
      setScrollProgress(e.progress); // 0 to 1
      setScrollY(e.scroll); // Absolute scroll position
      scrollVelocity.current = e.velocity; // Scroll velocity
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, []);

  return {
    scrollProgress,
    scrollY,
    scrollVelocity: scrollVelocity.current,
  };
}

// Hook for scroll-triggered animations
export function useScrollTrigger(threshold: number = 0.5) {
  const [isTriggered, setIsTriggered] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (!lenis) return;

    const handleScroll = () => {
      if (!elementRef.current) return;

      const rect = elementRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * threshold;

      if (rect.top <= triggerPoint && rect.bottom >= 0) {
        setIsTriggered(true);
      } else {
        setIsTriggered(false);
      }
    };

    lenis.on("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [threshold]);

  return { isTriggered, elementRef };
}

// Hook to control Lenis programmatically
export function useLenisControl() {
  const scrollTo = (target: string | number, options?: any) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(target, options);
    }
  };

  const start = () => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.start();
  };

  const stop = () => {
    const lenis = (window as any).lenis;
    if (lenis) lenis.stop();
  };

  return { scrollTo, start, stop };
}
