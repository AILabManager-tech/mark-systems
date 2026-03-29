"use client";

import { useTranslations } from "next-intl";

const FAQ_KEYS = [0, 1, 2, 3, 4, 5, 6, 7] as const;

export function FAQSection() {
  const t = useTranslations("home.faq");

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
          {t("label")}
        </span>
        <h2 className="text-h2 font-bold text-txt-primary">{t("title")}</h2>

        <div className="mt-10 divide-y divide-white/[0.06]">
          {FAQ_KEYS.map((i) => (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-mono text-sm font-semibold text-txt-primary group-hover:text-cyber-cyan transition-colors">
                  {t(`items.${i}.question`)}
                </span>
                <svg
                  className="h-5 w-5 shrink-0 text-cyber-cyan transition-transform duration-300 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-txt-secondary">
                {t(`items.${i}.answer`)}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
