"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const SHORT_LABELS: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};

const LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-sm px-2 py-1.5 text-text-secondary transition-colors hover:bg-surface-light hover:text-text-primary"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Change language"
      >
        <span className="font-mono text-xs font-bold tracking-wider">{SHORT_LABELS[locale]}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            aria-label="Select language"
            className="absolute right-0 top-full z-50 mt-2 w-36 rounded-sm border border-surface-border bg-surface p-1 shadow-elevated"
          >
            {locales.map((loc) => {
              const isActive = loc === locale;
              return (
                <Link
                  key={loc}
                  href={pathname}
                  locale={loc}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-sm px-2.5 py-2 text-sm transition-colors",
                    isActive
                      ? "bg-surface-light text-text-primary"
                      : "text-text-secondary hover:bg-surface-light hover:text-text-primary"
                  )}
                >
                  <span className="font-mono text-xs font-bold tracking-wider w-6">{SHORT_LABELS[loc]}</span>
                  <span>{LABELS[loc]}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
