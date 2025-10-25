"use client";

import { useEffect, useState, useRef } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useInView(options: UseInViewOptions = {}) {
  const [inView, setInView] = useState(false);
  const [ref, setRef] = useState<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.triggerOnce) {
            observer.unobserve(ref);
          }
        } else if (!options.triggerOnce) {
          setInView(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || "0px",
      }
    );

    observerRef.current = observer;
    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, options.threshold, options.rootMargin, options.triggerOnce]);

  return [setRef, inView] as const;
}
