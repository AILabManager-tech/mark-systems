"use client";

import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: React.ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-gradient-to-b from-[#14b8a6] to-[#0d7d74] text-white font-semibold",
    "border border-[#14b8a6]/30 border-t-[#5eead4]/40 border-b-[#0a5e58]/60",
    "shadow-[0_4px_0_0_#0a5e58,0_6px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12)]",
    "hover:shadow-[0_3px_0_0_#0a5e58,0_4px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.12),0_0_20px_rgba(13,148,136,0.25)]",
    "hover:translate-y-[1px]",
    "active:shadow-[0_1px_0_0_#0a5e58,0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(0,0,0,0.2)]",
    "active:translate-y-[3px]",
  ].join(" "),
  secondary: [
    "bg-gradient-to-b from-[#111118] to-[#0a0a0f] text-[#5eead4] font-semibold",
    "border border-[#0d9488]/40 border-t-[#0d9488]/50 border-b-[#0d9488]/20",
    "shadow-[0_4px_0_0_#050508,0_6px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]",
    "hover:shadow-[0_3px_0_0_#050508,0_4px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04),0_0_15px_rgba(13,148,136,0.15)]",
    "hover:translate-y-[1px] hover:border-[#0d9488]/60",
    "active:shadow-[0_1px_0_0_#050508,0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(0,0,0,0.2)]",
    "active:translate-y-[3px]",
  ].join(" "),
  ghost:
    "text-txt-secondary hover:text-[#5eead4] bg-transparent",
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-3.5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  href,
  external,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-wide transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-cyan/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.97]",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  if (href && external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
