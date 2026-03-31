"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div variants={fadeInUp} className="card-base group relative flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-glow-accent">
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-sm bg-gradient-to-b from-accent/15 via-accent/0 to-accent/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm bg-surface-light text-accent transition-colors duration-200 group-hover:bg-accent/10 group-hover:text-accent-muted">
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        <h3 className="mb-2 text-h3 font-semibold text-text-primary">
          {title}
        </h3>
        <p className="flex-1 text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
