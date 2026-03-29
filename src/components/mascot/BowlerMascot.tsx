"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export type BowlerMood = "idle" | "happy" | "thinking" | "waving";
export type BowlerSize = "sm" | "md" | "lg";

interface BowlerMascotProps {
  mood?: BowlerMood;
  message?: string;
  size?: BowlerSize;
  className?: string;
  showBubbleOnHover?: boolean;
  onClick?: () => void;
}

const SIZE_MAP: Record<BowlerSize, number> = { sm: 48, md: 80, lg: 140 };

const floatVariants: Variants = {
  idle: {
    y: [0, -4, 0],
    rotate: [0, 0, 0],
    transition: { y: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
  },
  happy: {
    y: [0, -8, 0],
    scale: [1, 1.05, 1],
    transition: {
      y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  },
  thinking: {
    y: [0, -3, 0],
    rotate: [0, -5, 0, 5, 0],
    transition: {
      y: { repeat: Infinity, duration: 5, ease: "easeInOut" },
      rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" },
    },
  },
  waving: {
    y: [0, -6, 0],
    rotate: [0, -5, 5, -3, 0],
    transition: {
      y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
      rotate: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
    },
  },
};

const sparkleVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: (i: number) => ({
    opacity: [0, 1, 0],
    scale: [0, 1.2, 0],
    x: [0, Math.cos(i * 1.2) * 30],
    y: [0, Math.sin(i * 1.2) * 30],
    transition: { duration: 0.6, delay: i * 0.05 },
  }),
};

const bubbleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  exit: { opacity: 0, scale: 0.8, y: 5, transition: { duration: 0.2 } },
};

function TypingText({ text }: { text: string }) {
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.025 } },
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function BowlerMascot({
  mood = "idle",
  message,
  size = "md",
  className,
  showBubbleOnHover = true,
  onClick,
}: BowlerMascotProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [sparkles, setSparkles] = useState<number[]>([]);
  const px = SIZE_MAP[size];

  const handleClick = useCallback(() => {
    setSparkles(Array.from({ length: 6 }, (_, i) => i));
    setTimeout(() => setSparkles([]), 700);
    onClick?.();
  }, [onClick]);

  const showBubble = message && (showBubbleOnHover ? isHovered : true);

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      {/* Speech bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            variants={bubbleVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full"
          >
            <div className="relative rounded-lg border border-cyber-cyan/20 bg-background/80 px-3 py-2 text-xs text-txt-secondary backdrop-blur-md">
              <TypingText text={message} />
              {/* Arrow pointing down */}
              <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-cyber-cyan/20 bg-background/80" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sparkles on click */}
      <AnimatePresence>
        {sparkles.map((i) => (
          <motion.div
            key={`sparkle-${i}`}
            custom={i}
            variants={sparkleVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="pointer-events-none absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-cyber-cyan shadow-glow-cyan"
          />
        ))}
      </AnimatePresence>

      {/* Bowler character */}
      <motion.div
        variants={floatVariants}
        animate={mood}
        whileHover={{ scale: 1.08, y: -8, filter: "drop-shadow(0 0 12px rgba(0,255,213,0.4))" }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleClick}
        className="cursor-pointer select-none"
        style={{ width: px, height: px }}
      >
        <Image
          src="/bowler.jpg"
          alt="Bowler — mascotte Mark Systems"
          width={px}
          height={px}
          className="pointer-events-none rounded-full object-cover"
          priority={size === "lg"}
        />
      </motion.div>

      {/* Glow underneath */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.6 : 0.25,
          scaleX: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="mt-1 h-2 rounded-full bg-cyber-cyan/30 blur-md"
        style={{ width: px * 0.6 }}
      />
    </div>
  );
}
