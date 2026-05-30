'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, scaleIn } from '@/lib/animations';
import {
  Lightbulb,
  Shield,
  Handshake,
  Eye,
  Code2,
  Bot,
  Cloud,
  Database,
  Server,
  Cpu,
  Workflow,
  Globe,
} from 'lucide-react';

const values = [
  {
    id: 'innovation',
    icon: Lightbulb,
    gradient: 'from-teal-500/15 to-cyan-500/5',
  },
  {
    id: 'quality',
    icon: Shield,
    gradient: 'from-emerald-500/15 to-green-500/5',
  },
  {
    id: 'partnership',
    icon: Handshake,
    gradient: 'from-violet-500/15 to-purple-500/5',
  },
  {
    id: 'transparency',
    icon: Eye,
    gradient: 'from-sky-500/15 to-blue-500/5',
  },
];

const techCategories = [
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: Code2 },
      { name: 'Next.js', icon: Globe },
      { name: 'TypeScript', icon: Code2 },
      { name: 'Tailwind CSS', icon: Code2 },
    ],
  },
  {
    label: 'Backend & Data',
    items: [
      { name: 'Node.js', icon: Server },
      { name: 'Python', icon: Code2 },
      { name: 'PostgreSQL', icon: Database },
      { name: 'Redis', icon: Database },
    ],
  },
  {
    label: 'AI & Automation',
    items: [
      { name: 'OpenAI', icon: Bot },
      { name: 'LangChain', icon: Cpu },
      { name: 'n8n', icon: Workflow },
      { name: 'TensorFlow', icon: Cpu },
    ],
  },
  {
    label: 'Infrastructure',
    items: [
      { name: 'Docker', icon: Cloud },
      { name: 'AWS', icon: Cloud },
      { name: 'Kubernetes', icon: Server },
      { name: 'Terraform', icon: Server },
    ],
  },
];

const milestones = [
  { year: '2024', key: 'milestone1' },
  { year: '2024', key: 'milestone2' },
  { year: '2025', key: 'milestone3' },
  { year: '2025', key: 'milestone4' },
];

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-surface-border">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container-wide relative py-24 md:py-32 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span
                variants={fadeInUp}
                className="mb-4 inline-block font-mono text-sm tracking-wider text-accent"
              >
                {t('heroLabel')}
              </motion.span>
              <motion.h1
                variants={fadeInUp}
                className="text-h1 font-bold tracking-tight text-text-primary md:text-display"
              >
                {t('heroTitle')}
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-body-lg leading-relaxed text-text-secondary"
              >
                {t('heroMission')}
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-sm leading-relaxed text-text-tertiary"
              >
                {t('heroSubtext')}
              </motion.p>
            </motion.div>

            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              className="relative aspect-[4/3] overflow-hidden rounded-sm border border-surface-border"
            >
              <Image
                src="/images/about/team-collab.jpg"
                alt={t('heroImageAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding border-b border-surface-border">
        <div className="container-wide">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="mb-4 inline-block font-mono text-sm tracking-wider text-accent"
            >
              {t('valuesLabel')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-h2 font-bold text-text-primary"
            >
              {t('valuesTitle')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-body-lg text-text-secondary"
            >
              {t('valuesDescription')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.id}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-sm border border-surface-border bg-surface p-8 transition-all duration-500 hover:border-accent/30 hover:shadow-glow-accent"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className="relative">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-surface-light text-accent transition-colors group-hover:bg-accent/10">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {t(`${value.id}Title`)}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {t(`${value.id}Description`)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Company Story / Timeline */}
      <section className="section-padding border-b border-surface-border">
        <div className="container-wide">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="mb-4 inline-block font-mono text-sm tracking-wider text-accent"
            >
              {t('storyLabel')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-h2 font-bold text-text-primary"
            >
              {t('storyTitle')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-body-lg text-text-secondary"
            >
              {t('storyDescription')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative mx-auto max-w-3xl"
          >
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-surface-border md:left-1/2 md:-translate-x-px" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.key}
                variants={fadeInUp}
                className={`relative mb-12 flex items-start gap-6 last:mb-0 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                  <div className="h-3 w-3 rounded-full border-2 border-accent bg-background" />
                </div>

                {/* Content card */}
                <div
                  className={`ml-12 w-full rounded-sm border border-surface-border bg-surface p-6 md:ml-0 md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                  }`}
                >
                  <span className="mb-2 inline-block font-mono text-xs text-accent">
                    {milestone.year}
                  </span>
                  <h3 className="text-base font-bold text-text-primary">
                    {t(`${milestone.key}Title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {t(`${milestone.key}Description`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section className="section-padding">
        <div className="container-wide">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="mb-4 inline-block font-mono text-sm tracking-wider text-accent"
            >
              {t('techLabel')}
            </motion.span>
            <motion.h2
              variants={fadeInUp}
              className="text-h2 font-bold text-text-primary"
            >
              {t('techTitle')}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="mt-4 text-body-lg text-text-secondary"
            >
              {t('techDescription')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {techCategories.map((category) => (
              <motion.div
                key={category.label}
                variants={fadeInUp}
                className="rounded-sm border border-surface-border bg-surface p-6"
              >
                <h3 className="mb-5 font-mono text-xs font-semibold tracking-widest text-accent uppercase">
                  {category.label}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.name}
                        className="flex items-center gap-3 rounded-sm border border-surface-border bg-surface-light px-4 py-3 transition-colors hover:border-accent/30"
                      >
                        <Icon
                          className="h-4 w-4 shrink-0 text-accent"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm text-text-secondary">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
