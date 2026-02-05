"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function FlagSvg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 14"
      className="h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] border border-white/10"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const FLAGS: Record<Locale, React.ReactNode> = {
  // Canada
  en: (
    <FlagSvg>
      <rect width="5" height="14" fill="#FF0000" />
      <rect x="5" width="10" height="14" fill="#FFF" />
      <rect x="15" width="5" height="14" fill="#FF0000" />
      <path
        d="M10 3l.6 2h2l-1.5 1.2.5 1.8-1.6-1.2-1.6 1.2.5-1.8L7.4 5h2z"
        fill="#FF0000"
      />
    </FlagSvg>
  ),
  // Québec (fleurdelisé)
  fr: (
    <FlagSvg>
      <rect width="20" height="14" fill="#003DA5" />
      <rect x="9" width="2" height="14" fill="#FFF" />
      <rect width="20" height="2" y="6" fill="#FFF" />
      <circle cx="4.5" cy="3" r="1" fill="#FFF" />
      <circle cx="15.5" cy="3" r="1" fill="#FFF" />
      <circle cx="4.5" cy="11" r="1" fill="#FFF" />
      <circle cx="15.5" cy="11" r="1" fill="#FFF" />
    </FlagSvg>
  ),
  // Spain
  es: (
    <FlagSvg>
      <rect width="20" height="14" fill="#C60B1E" />
      <rect width="20" height="7" y="3.5" fill="#FFC400" />
    </FlagSvg>
  ),
  // Brazil
  "pt-BR": (
    <FlagSvg>
      <rect width="20" height="14" fill="#009B3A" />
      <path d="M10 1.5L18.5 7 10 12.5 1.5 7z" fill="#FEDF00" />
      <circle cx="10" cy="7" r="2.8" fill="#002776" />
    </FlagSvg>
  ),
  // Germany
  de: (
    <FlagSvg>
      <rect width="20" height="4.67" fill="#000" />
      <rect width="20" height="4.67" y="4.67" fill="#DD0000" />
      <rect width="20" height="4.67" y="9.33" fill="#FFCE00" />
    </FlagSvg>
  ),
  // Japan
  ja: (
    <FlagSvg>
      <rect width="20" height="14" fill="#FFF" />
      <circle cx="10" cy="7" r="3.2" fill="#BC002D" />
    </FlagSvg>
  ),
  // China
  "zh-CN": (
    <FlagSvg>
      <rect width="20" height="14" fill="#DE2910" />
      <path
        d="M4 2l.6 1.8h1.9L5.2 5l.6 1.8L4 5.6 2.2 6.8l.6-1.8L1.5 3.8h1.9z"
        fill="#FFDE00"
      />
      <circle cx="8" cy="2.2" r=".5" fill="#FFDE00" />
      <circle cx="9" cy="3.5" r=".5" fill="#FFDE00" />
      <circle cx="9" cy="5.2" r=".5" fill="#FFDE00" />
      <circle cx="8" cy="6.5" r=".5" fill="#FFDE00" />
    </FlagSvg>
  ),
  // South Korea
  ko: (
    <FlagSvg>
      <rect width="20" height="14" fill="#FFF" />
      <path d="M7 7a3 3 0 0 1 6 0z" fill="#C60C30" />
      <path d="M13 7a3 3 0 0 1-6 0z" fill="#003478" />
    </FlagSvg>
  ),
  // India
  hi: (
    <FlagSvg>
      <rect width="20" height="4.67" fill="#FF9933" />
      <rect width="20" height="4.67" y="4.67" fill="#FFF" />
      <rect width="20" height="4.67" y="9.33" fill="#138808" />
      <circle cx="10" cy="7" r="1.5" fill="none" stroke="#000080" strokeWidth=".6" />
    </FlagSvg>
  ),
  // Saudi Arabia
  ar: (
    <FlagSvg>
      <rect width="20" height="14" fill="#006C35" />
      <rect x="5" y="8.5" width="10" height=".8" rx=".4" fill="#FFF" />
      <rect x="9.5" y="4" width=".8" height="5" rx=".4" fill="#FFF" />
    </FlagSvg>
  ),
};

const LABELS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  "pt-BR": "Português",
  de: "Deutsch",
  ja: "日本語",
  "zh-CN": "中文",
  ko: "한국어",
  hi: "हिन्दी",
  ar: "العربية",
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
        {FLAGS[locale]}
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
            className="absolute right-0 top-full z-50 mt-2 w-44 rounded-sm border border-surface-border bg-surface p-1 shadow-elevated"
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
                  {FLAGS[loc]}
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
