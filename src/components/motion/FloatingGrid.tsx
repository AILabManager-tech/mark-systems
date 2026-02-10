"use client";

import { motion } from "framer-motion";

export function FloatingGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(248,250,252,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(248,250,252,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Animated gradient sweep */}
      <motion.div
        className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[120px]"
        animate={{
          y: [0, 40, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
