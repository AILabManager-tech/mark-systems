"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  className?: string;
}

const offsets = {
  up: { y: 30 },
  down: { y: -30 },
  left: { x: 30 },
  right: { x: -30 },
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  className,
}: FadeInProps) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const offset = offsets[direction];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before hydration, render visible content (no animation)
  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
