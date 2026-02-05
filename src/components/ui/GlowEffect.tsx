"use client";

import { cn } from "@/lib/utils";

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
}

export function GlowEffect({ children, className }: GlowEffectProps) {
  return (
    <div className={cn("group relative", className)}>
      {children}
    </div>
  );
}
