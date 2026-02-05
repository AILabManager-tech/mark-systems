"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp, VIEWPORT_CONFIG } from "@/lib/animations";

interface FadeInProps {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
}

export function FadeIn({
  children,
  variants = fadeInUp,
  className,
  delay = 0,
}: FadeInProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
