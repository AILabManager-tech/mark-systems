"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";

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
      initial="visible"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}
