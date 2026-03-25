"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const OTHER_LOCALE: Record<Locale, Locale> = {
  en: "fr",
  fr: "en",
};

const SWITCH_LABEL: Record<Locale, string> = {
  en: "FR",
  fr: "EN",
};

const ARIA_LABEL: Record<Locale, string> = {
  en: "Passer en français",
  fr: "Switch to English",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const target = OTHER_LOCALE[locale];

  return (
    <Link
      href={pathname}
      locale={target}
      aria-label={ARIA_LABEL[locale]}
      className="rounded-sm px-2 py-1.5 font-mono text-xs font-bold tracking-wider text-text-secondary transition-colors hover:bg-surface-light hover:text-text-primary"
    >
      {SWITCH_LABEL[locale]}
    </Link>
  );
}
