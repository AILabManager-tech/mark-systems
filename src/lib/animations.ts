import type { Variants, Transition } from "framer-motion";

export const transition: { spring: Transition; smooth: Transition; fast: Transition } = {
  spring: { type: "spring", stiffness: 100, damping: 20 },
  smooth: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  fast: { duration: 0.3, ease: "easeOut" },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: transition.smooth },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: transition.smooth },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: transition.smooth },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: transition.smooth },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: transition.smooth },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.02,
    y: -4,
    transition: transition.fast,
  },
};

export const glowPulse: Variants = {
  hidden: { opacity: 0.3 },
  visible: {
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};
