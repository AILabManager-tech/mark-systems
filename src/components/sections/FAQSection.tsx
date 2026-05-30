'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

const FAQ_COUNT = 6;

export function FAQSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  /* Structured data for SEO */
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => ({
      '@type': 'Question',
      name: t(`items.${i}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`items.${i}.answer`),
      },
    })),
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="container-wide relative z-10">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono font-medium tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full">
            {t('label')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight text-balance">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* FAQ items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl space-y-3"
        >
          {Array.from({ length: FAQ_COUNT }, (_, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="rounded-xl border border-border/50 bg-surface/50 backdrop-blur-sm transition-colors duration-200 hover:border-accent/20 overflow-hidden"
              >
                {/* Question button */}
                <button
                  id={`faq-q-${i}`}
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  className="flex w-full items-center gap-4 px-6 py-5 text-left group"
                >
                  <div className="flex items-center justify-center w-8 h-8 shrink-0 rounded-lg bg-accent/10 border border-accent/20 transition-colors group-hover:bg-accent/20">
                    <HelpCircle className="w-4 h-4 text-accent" />
                  </div>

                  <span className="flex-1 text-sm lg:text-base font-medium text-text-primary leading-snug pr-2">
                    {t(`items.${i}.question`)}
                  </span>

                  <motion.div
                    initial={false}
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-center w-7 h-7 shrink-0 rounded-md bg-surface border border-border/50"
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-accent" />
                    ) : (
                      <Plus className="w-4 h-4 text-text-tertiary" />
                    )}
                  </motion.div>
                </button>

                {/* Answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                          opacity: { duration: 0.25, delay: 0.05 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 pl-[4.5rem]">
                        <div className="h-px bg-border/30 mb-4" />
                        <p className="text-sm lg:text-base leading-relaxed text-text-secondary">
                          {t(`items.${i}.answer`)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
