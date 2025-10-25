"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    });

    // Request Animation Frame loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Expose lenis instance globally for navigation components
    if (typeof window !== "undefined") {
      (window as any).lenis = lenisRef.current;
    }

    // Cleanup on unmount
    return () => {
      lenisRef.current?.destroy();
      if (typeof window !== "undefined") {
        delete (window as any).lenis;
      }
    };
  }, []);

  return null;
}
