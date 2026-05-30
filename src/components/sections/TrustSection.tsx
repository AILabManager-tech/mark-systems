'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import {
  CheckCircle,
  Clock,
  Server,
  Users,
  Quote,
  Shield,
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

/* ------------------------------------------------------------------ */
/*  Animated counter hook — counts from 0 to `end` on viewport entry  */
/* ------------------------------------------------------------------ */

function useCounter(end: number, decimals = 0, duration = 1400) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(parseFloat((eased * end).toFixed(decimals)));
      if (step >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [inView, end, decimals, duration]);

  return { ref, value };
}

/* ------------------------------------------------------------------ */
/*  Metric card                                                       */
/* ------------------------------------------------------------------ */

interface MetricProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

function MetricCard({ icon: Icon, value: target, suffix, label, decimals = 0 }: MetricProps) {
  const { ref, value } = useCounter(target, decimals);

  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col items-center gap-3 rounded-2xl border border-border/50 bg-surface/50 backdrop-blur-sm p-6 lg:p-8 text-center"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 border border-accent/20">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      <div className="font-mono">
        <span ref={ref} className="text-3xl lg:text-4xl font-bold text-text-primary">
          {decimals > 0 ? value.toFixed(decimals) : value}
        </span>
        <span className="ml-1 text-sm text-accent/80 uppercase tracking-wider">{suffix}</span>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{label}</p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Tech badges                                                       */
/* ------------------------------------------------------------------ */

const TECH_STACK = [
  'Next.js',
  'React',
  'Node.js',
  'Python',
  'n8n',
  'Docker',
  'Kubernetes',
];

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

export function TrustSection() {
  const t = useTranslations('trust');

  const metrics: MetricProps[] = [
    {
      icon: CheckCircle,
      value: 50,
      suffix: '+',
      label: t('metrics.projects'),
    },
    {
      icon: Users,
      value: 99,
      suffix: '%',
      label: t('metrics.satisfaction'),
    },
    {
      icon: Server,
      value: 99.9,
      suffix: '%',
      label: t('metrics.uptime'),
      decimals: 1,
    },
    {
      icon: Clock,
      value: 2,
      suffix: 'h',
      label: t('metrics.response'),
    },
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Subtle background gradient */}
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
            {t('tag')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight text-balance">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-text-secondary leading-relaxed mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16"
        >
          {metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </motion.div>

        {/* Trust statement / testimonial */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="mx-auto max-w-3xl rounded-2xl border border-accent/20 bg-accent/5 backdrop-blur-sm p-8 lg:p-10 text-center mb-16"
        >
          <Quote className="w-8 h-8 text-accent/40 mx-auto mb-4" />
          <blockquote className="text-lg lg:text-xl text-text-primary leading-relaxed font-medium italic">
            {t('testimonial.quote')}
          </blockquote>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 border border-accent/30">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-text-primary">{t('testimonial.author')}</p>
              <p className="text-xs text-text-secondary">{t('testimonial.role')}</p>
            </div>
          </div>
        </motion.div>

        {/* Technology badges */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.p
            variants={fadeInUp}
            className="mb-6 text-sm font-mono uppercase tracking-widest text-text-tertiary"
          >
            {t('techTitle')}
          </motion.p>

          <motion.div
            variants={staggerContainer}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {TECH_STACK.map((tech) => (
              <motion.span
                key={tech}
                variants={fadeInUp}
                className="inline-flex items-center px-4 py-2 text-sm font-mono font-medium text-text-secondary bg-surface/60 border border-border/50 rounded-lg backdrop-blur-sm hover:border-accent/30 hover:text-accent transition-colors duration-200"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
