"use client";

import { cn } from "@/utils/cn";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "cyan" | "violet" | "neon";
}

const glowMap = {
  cyan: {
    border: "hover:border-cyber-cyan/40",
    shadow: "hover:shadow-glow-cyan",
  },
  violet: {
    border: "hover:border-cyber-violet/40",
    shadow: "hover:shadow-glow-violet",
  },
  neon: {
    border: "hover:border-cyber-neon/40",
    shadow: "hover:shadow-glow-neon",
  },
};

export function GlowCard({
  children,
  className,
  glowColor = "cyan",
}: GlowCardProps) {
  const glow = glowMap[glowColor];

  return (
    <div
      className={cn(
        "rounded-lg border border-white/[0.06] bg-surface/60 p-6 backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        glow.border,
        glow.shadow,
        className,
      )}
    >
      {children}
    </div>
  );
}
