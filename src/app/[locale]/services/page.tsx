'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import {
  Globe,
  Zap,
  Brain,
  Cloud,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const services = [
  {
    id: 'web',
    icon: Globe,
    image: '/images/projects/dashboard.jpg',
    color: 'from-teal-500/20 to-cyan-500/10',
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    features: [
      'Responsive design & mobile-first approach',
      'SEO-optimized architecture',
      'Performance-tuned builds (Core Web Vitals)',
      'CMS integration & headless setups',
      'E-commerce & payment integrations',
      'Analytics & conversion tracking',
    ],
  },
  {
    id: 'automation',
    icon: Zap,
    image: '/images/projects/n8n-workflow.jpg',
    color: 'from-emerald-500/20 to-green-500/10',
    techStack: ['n8n', 'Zapier', 'Make', 'Python', 'REST APIs', 'Webhooks'],
    features: [
      'End-to-end workflow automation',
      'CRM & ERP system integration',
      'Email & notification pipelines',
      'Data synchronization across platforms',
      'Custom API connectors',
      'Error handling & monitoring',
    ],
  },
  {
    id: 'ai',
    icon: Brain,
    image: '/images/projects/pipeline.jpg',
    color: 'from-violet-500/20 to-purple-500/10',
    techStack: ['OpenAI', 'LangChain', 'Python', 'TensorFlow', 'RAG', 'Vector DBs'],
    features: [
      'Custom AI agent development',
      'LLM integration & fine-tuning',
      'RAG pipelines & knowledge bases',
      'Intelligent document processing',
      'Predictive analytics & forecasting',
      'AI-powered chatbots & assistants',
    ],
  },
  {
    id: 'cloud',
    icon: Cloud,
    image: '/images/projects/docker-stack.jpg',
    color: 'from-sky-500/20 to-blue-500/10',
    techStack: ['Docker', 'AWS', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    features: [
      'Cloud architecture & migration',
      'Containerized deployments',
      'Infrastructure as Code (IaC)',
      'CI/CD pipeline setup',
      'Server monitoring & alerting',
      'Security hardening & compliance',
    ],
  },
];

export default function ServicesPage() {
  const t = useTranslations('servicesPage');

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-surface-border">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="container-wide relative py-24 md:py-32 lg:py-40">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-3xl text-center"
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
              {t('heroDescription')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Service Blocks */}
      <section className="section-padding">
        <div className="container-wide space-y-24 lg:space-y-32">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={service.id}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <motion.div
                  variants={fadeInUp}
                  className={`relative aspect-[4/3] overflow-hidden rounded-sm border border-surface-border ${
                    isReversed ? 'lg:[direction:ltr]' : ''
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} z-10 mix-blend-overlay`}
                  />
                  <Image
                    src={service.image}
                    alt={t(`${service.id}Title`)}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-sm bg-surface/80 backdrop-blur-sm">
                    <Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  variants={fadeInUp}
                  className={isReversed ? 'lg:[direction:ltr]' : ''}
                >
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-mono text-xs tracking-widest text-accent uppercase">
                      {t(`${service.id}Label`)}
                    </span>
                  </div>
                  <h2 className="text-h2 font-bold text-text-primary">
                    {t(`${service.id}Title`)}
                  </h2>
                  <p className="mt-4 text-body-lg leading-relaxed text-text-secondary">
                    {t(`${service.id}Description`)}
                  </p>

                  {/* Feature list */}
                  <ul className="mt-8 space-y-3">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        variants={fadeInUp}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-5 w-5 shrink-0 text-accent"
                          strokeWidth={1.5}
                        />
                        <span className="text-sm text-text-secondary">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tech stack badges */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm border border-surface-border bg-surface-light px-3 py-1.5 font-mono text-xs text-text-tertiary transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding border-t border-surface-border">
        <div className="container-wide">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative mx-auto max-w-3xl overflow-hidden rounded-sm border border-surface-border bg-surface p-12 text-center md:p-16"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
            <div className="relative">
              <motion.h2
                variants={fadeInUp}
                className="text-h2 font-bold text-text-primary"
              >
                {t('ctaTitle')}
              </motion.h2>
              <motion.p
                variants={fadeInUp}
                className="mt-4 text-body-lg text-text-secondary"
              >
                {t('ctaDescription')}
              </motion.p>
              <motion.div variants={fadeInUp} className="mt-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-sm bg-accent px-8 py-3.5 font-semibold text-white transition-all hover:bg-accent-muted hover:shadow-glow-accent"
                >
                  {t('ctaButton')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
