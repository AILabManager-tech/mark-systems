"use client";

import { useEffect, useState } from "react";

interface Orb {
  color: string;
  size: string;
  position: string;
  delay: string;
  duration: string;
}

const orbs: Orb[] = [
  {
    color: "bg-cyber-cyan/[0.06]",
    size: "w-[500px] h-[500px]",
    position: "-top-40 -left-20",
    delay: "0s",
    duration: "8s",
  },
  {
    color: "bg-cyber-violet/[0.05]",
    size: "w-[400px] h-[400px]",
    position: "top-1/2 -right-32",
    delay: "2s",
    duration: "10s",
  },
  {
    color: "bg-cyber-cyan/[0.04]",
    size: "w-[350px] h-[350px]",
    position: "-bottom-20 left-1/3",
    delay: "4s",
    duration: "12s",
  },
];

export function GlowOrb() {
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
      {orbs.map((orb, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[120px] ${orb.color} ${orb.size} ${orb.position}`}
          style={
            reduced
              ? { opacity: 0.5 }
              : {
                  animation: `float ${orb.duration} ease-in-out ${orb.delay} infinite`,
                }
          }
        />
      ))}
    </div>
  );
}
