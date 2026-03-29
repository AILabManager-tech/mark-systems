"use client";

import { cn } from "@/lib/utils";

type Variant = "cyan" | "violet" | "neon" | "danger";

interface NeonBadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

const variantStyles: Record<Variant, string> = {
  cyan: "border-cyber-cyan/50 text-cyber-cyan shadow-[0_0_10px_rgba(0,255,213,0.15)]",
  violet: "border-cyber-violet/50 text-cyber-violet shadow-[0_0_10px_rgba(139,92,246,0.15)]",
  neon: "border-cyber-neon/50 text-cyber-neon shadow-[0_0_10px_rgba(0,255,136,0.15)]",
  danger: "border-cyber-danger/50 text-cyber-danger shadow-[0_0_10px_rgba(239,68,68,0.15)]",
};

export function NeonBadge({
  children,
  variant = "cyan",
  className,
}: NeonBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-transparent px-3 py-0.5 font-mono text-xs",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
