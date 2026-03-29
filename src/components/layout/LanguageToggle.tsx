"use client";

import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();

  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const label = locale === "fr" ? "EN" : "FR";

  // Static export: middleware doesn't run in production,
  // so we use a hard navigation instead of router.replace
  const href = `/${otherLocale}${pathname === "/" ? "/" : pathname + "/"}`;

  return (
    <a
      href={href}
      aria-label={`Switch to ${otherLocale === "fr" ? "Français" : "English"}`}
      className="rounded-full border border-cyber-cyan/40 bg-transparent px-3 py-1 font-mono text-xs font-semibold tracking-[0.14em] text-cyber-cyan transition-all hover:bg-cyber-cyan/10 hover:shadow-glow-cyan"
    >
      {label}
    </a>
  );
}
