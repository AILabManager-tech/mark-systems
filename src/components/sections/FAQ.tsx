"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

const FAQ_COUNT = 6;

export function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => ({
      "@type": "Question",
      name: t(`items.${i}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`items.${i}.answer`),
      },
    })),
  };

  return (
    <section className="section-padding border-t border-surface-border">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="section-container">
        <span className="mb-4 block font-mono text-sm uppercase tracking-widest text-accent">
          {"// "}{t("label")}
        </span>
        <h2 className="mb-12 text-h2 font-bold text-text-primary">
          {t("title")}
        </h2>

        <div className="mx-auto max-w-3xl space-y-2">
          {Array.from({ length: FAQ_COUNT }, (_, i) => (
            <div
              key={i}
              className="rounded-sm border border-surface-border bg-surface-light/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <span className="pr-4 text-sm font-medium text-text-primary">
                  {t(`items.${i}.question`)}
                </span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-text-tertiary transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm leading-relaxed text-text-secondary">
                      {t(`items.${i}.answer`)}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
