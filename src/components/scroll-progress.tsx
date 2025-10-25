"use client";

import { motion } from "framer-motion";
import { useLenisScroll } from "@/hooks/use-lenis";

export default function ScrollProgress() {
  const { scrollProgress } = useLenisScroll();

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 z-[100] origin-left"
        style={{
          scaleX: scrollProgress,
        }}
        initial={{ scaleX: 0 }}
      />

      {/* Scroll Indicator */}
      <motion.div
        className="fixed bottom-8 right-8 flex flex-col items-center gap-2 z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: scrollProgress < 0.95 ? 1 : 0,
          y: scrollProgress < 0.95 ? 0 : 20,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-cyan-400 text-sm font-mono">
          {Math.round(scrollProgress * 100)}%
        </div>
        <motion.div
          className="w-1 h-16 bg-gray-700 rounded-full overflow-hidden"
          style={{ position: "relative" }}
        >
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-400 to-blue-400"
            style={{
              height: `${scrollProgress * 100}%`,
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}
