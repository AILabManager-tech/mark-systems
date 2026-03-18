"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonBaseProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string;
  onClick?: never;
  type?: never;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantStyles: Record<Variant, string> = {
  primary:
    "border border-accent bg-accent text-background font-semibold shadow-[0_0_0_1px_rgba(0,161,155,0.2)] hover:-translate-y-0.5 hover:bg-[#34f5dc] hover:text-black",
  secondary:
    "border border-surface-border bg-surface/70 text-text-primary hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-light",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-light",
};

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-elevated active:scale-[0.98] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-tertiary disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100";

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const classes = cn(baseStyles, variantStyles[variant], className);

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
