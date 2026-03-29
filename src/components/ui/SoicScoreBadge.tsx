"use client";

import { cn } from "@/lib/utils";

interface SoicScoreBadgeProps {
  score: number;
  className?: string;
}

function getScoreStyle(score: number) {
  if (score >= 9.0) {
    return {
      border: "border-cyber-neon/50",
      text: "text-cyber-neon",
      glow: "shadow-[0_0_12px_rgba(0,255,136,0.2)]",
      pulse: "animate-border-glow",
    };
  }
  if (score >= 8.0) {
    return {
      border: "border-cyber-cyan/50",
      text: "text-cyber-cyan",
      glow: "shadow-[0_0_12px_rgba(0,255,213,0.2)]",
      pulse: "animate-border-glow",
    };
  }
  return {
    border: "border-cyber-danger/50",
    text: "text-cyber-danger",
    glow: "shadow-[0_0_12px_rgba(239,68,68,0.2)]",
    pulse: "",
  };
}

export function SoicScoreBadge({ score, className }: SoicScoreBadgeProps) {
  const style = getScoreStyle(score);

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-0.5 font-mono text-xs",
        style.border,
        style.text,
        style.glow,
        style.pulse,
        className,
      )}
    >
      &mu; = {score.toFixed(1)}
    </span>
  );
}
