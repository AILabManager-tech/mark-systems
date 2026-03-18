"use client";

import { motion, type Variants } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

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
      initial="visible"
      animate="visible"
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
