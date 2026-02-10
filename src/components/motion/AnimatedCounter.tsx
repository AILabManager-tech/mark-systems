"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

function parseNumericPart(value: string): { prefix: string; number: number; suffix: string } | null {
  const match = value.match(/^([^\d]*?)([\d,.]+)(.*)$/);
  if (!match) return null;
  const num = parseFloat(match[2].replace(/,/g, ""));
  if (isNaN(num)) return null;
  return { prefix: match[1], number: num, suffix: match[3] };
}

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(value);
  const parsed = useMemo(() => parseNumericPart(value), [value]);

  useEffect(() => {
    if (!isInView || !parsed) return;

    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    const { prefix, number, suffix } = parsed;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * number);
      const formatted = number >= 1000 ? current.toLocaleString() : String(current);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (step >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [isInView, parsed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
