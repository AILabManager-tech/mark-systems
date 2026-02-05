"use client";

import { motion } from "framer-motion";
import { staggerContainer, VIEWPORT_CONFIG } from "@/lib/animations";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerContainer({
  children,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={className}
    >
      {children}
    </motion.div>
  );
}
