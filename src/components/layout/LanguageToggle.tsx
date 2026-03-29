"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export function LanguageToggle() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale: Locale = locale === "fr" ? "en" : "fr";
  const label = locale === "fr" ? "EN" : "FR";

  function handleSwitch() {
    router.replace(pathname, { locale: otherLocale });
  }

  return (
    <button
      onClick={handleSwitch}
      aria-label={`Switch to ${otherLocale === "fr" ? "Français" : "English"}`}
      className="rounded-full border border-cyber-cyan/40 bg-transparent px-3 py-1 font-mono text-xs font-semibold tracking-[0.14em] text-cyber-cyan transition-all hover:bg-cyber-cyan/10 hover:shadow-glow-cyan"
    >
      {label}
    </button>
  );
}
