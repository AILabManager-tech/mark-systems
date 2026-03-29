"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TerminalTypingProps {
  lines: string[];
  speed?: number;
  className?: string;
}

export function TerminalTyping({
  lines,
  speed = 40,
  className,
}: TerminalTypingProps) {
  const [reduced, setReduced] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduced) {
      setDisplayedLines(lines);
      setCurrentLine(lines.length);
      return;
    }

    if (currentLine >= lines.length) return;

    const line = lines[currentLine] ?? "";

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(timer);
    }

    // Line finished, move to next
    const timer = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, line]);
      setCurrentLine((l) => l + 1);
      setCurrentChar(0);
    }, speed * 5);
    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines, speed, reduced]);

  const isTyping = currentLine < lines.length;
  const partialLine =
    !reduced && isTyping ? lines[currentLine]?.slice(0, currentChar) : "";

  return (
    <div className={cn("font-mono text-sm leading-relaxed", className)}>
      {displayedLines.map((line, i) => (
        <div key={i} className="text-txt-secondary">
          <span className="text-cyber-cyan">&gt;</span> {line}
        </div>
      ))}
      {isTyping && !reduced && (
        <div className="text-txt-secondary">
          <span className="text-cyber-cyan">&gt;</span> {partialLine}
          <span className="ml-0.5 inline-block w-2 animate-pulse bg-cyber-cyan text-transparent">
            |
          </span>
        </div>
      )}
    </div>
  );
}
