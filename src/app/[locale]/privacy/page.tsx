'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Eye, Cookie, Users, Clock, UserCheck, Mail } from 'lucide-react';

const sectionIcons = {
  dataCollected: Eye,
  purposes: Users,
  cookies: Cookie,
  thirdParties: Shield,
  retention: Clock,
  rights: UserCheck,
  contact: Mail,
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  const sections = [
    'dataCollected',
    'purposes',
    'cookies',
    'thirdParties',
    'retention',
    'rights',
    'contact',
  ] as const;

  return (
    <main className="relative min-h-screen">
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-sm bg-accent/10 text-accent">
              <Shield className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t('title')}
            </h1>
            <p className="mt-2 text-sm text-text-tertiary">
              {t('lastUpdated')}
            </p>
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12 text-text-secondary leading-relaxed"
          >
            {t('intro')}
          </motion.p>

          {/* Sections */}
          <div className="space-y-10">
            {sections.map((key, i) => {
              const Icon = sectionIcons[key];
              return (
                <motion.section
                  key={key}
                  custom={i + 1}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-surface-light text-accent transition-colors group-hover:bg-accent/15">
                      <Icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-accent-primary mb-3">
                        {t(`${key}.title`)}
                      </h2>
                      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
                        {t(`${key}.content`)}
                      </p>
                    </div>
                  </div>
                  {i < sections.length - 1 && (
                    <div className="ml-[2.25rem] mt-8 border-t border-surface-border/50" />
                  )}
                </motion.section>
              );
            })}
          </div>

          {/* Footer note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 rounded-sm border border-surface-border bg-surface/50 px-6 py-5 text-center"
          >
            <p className="text-xs text-text-tertiary leading-relaxed">
              {t('footerNote')}
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
