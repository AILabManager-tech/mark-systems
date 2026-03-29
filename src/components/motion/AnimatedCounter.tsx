"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 1.5,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (reduced) {
      setValue(target);
      return;
    }

    const steps = 60;
    const stepTime = (duration * 1000) / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (step >= steps) {
        setValue(target);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isInView, target, duration, reduced]);

  return (
    <span ref={ref} className={className ?? "font-mono"}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
