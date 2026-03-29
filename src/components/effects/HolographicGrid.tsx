"use client";

import { useEffect, useState } from "react";

export function HolographicGrid() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* Primary grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 213, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 213, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Secondary finer grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 213, 0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 213, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: "15px 15px",
        }}
      />
      {/* Subtle gradient sweep */}
      {!reduced && (
        <div
          className="absolute -top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 animate-float rounded-full bg-cyber-cyan/[0.02] blur-[120px]"
        />
      )}
    </div>
  );
}
