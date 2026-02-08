"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_KEYS, NAV_HREFS } from "@/lib/constants";

export function Footer() {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-surface-border">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <Link href="/" className="text-lg font-bold text-text-primary tracking-tight">
              {tCommon("siteName")}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              {tCommon("tagline")}. {tFooter("description")}
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-tertiary">
              {tFooter("navLabel")}
            </h4>
            <ul className="space-y-2">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={NAV_HREFS[key]}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-border pt-8 text-center">
          <p className="text-xs text-text-tertiary">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
