'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ExternalLink } from 'lucide-react';

type FilterCategory = 'all' | 'web' | 'automation' | 'ai';

interface Project {
  id: string;
  image: string;
  category: FilterCategory;
  techStack: string[];
}

const projects: Project[] = [
  {
    id: 'pipeline',
    image: '/images/projects/pipeline.jpg',
    category: 'ai',
    techStack: ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
  },
  {
    id: 'dashboard',
    image: '/images/projects/dashboard.jpg',
    category: 'web',
    techStack: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma'],
  },
  {
    id: 'dockerStack',
    image: '/images/projects/docker-stack.jpg',
    category: 'automation',
    techStack: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    id: 'smartCity',
    image: '/images/projects/smart-city.jpg',
    category: 'ai',
    techStack: ['IoT', 'Python', 'TensorFlow', 'MQTT'],
  },
  {
    id: 'webAutomation',
    image: '/images/projects/web-automation.jpg',
    category: 'automation',
    techStack: ['n8n', 'Puppeteer', 'Node.js', 'REST API'],
  },
  {
    id: 'n8nWorkflow',
    image: '/images/projects/n8n-workflow.jpg',
    category: 'automation',
    techStack: ['n8n', 'Webhooks', 'PostgreSQL', 'Make'],
  },
];

const filterTabs: { key: FilterCategory; labelKey: string }[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'web', labelKey: 'filterWeb' },
  { key: 'automation', labelKey: 'filterAutomation' },
  { key: 'ai', labelKey: 'filterAI' },
];

export default function ProjectsPage() {
  const t = useTranslations('projectsPage');
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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

      {/* Filter Tabs + Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 flex flex-wrap justify-center gap-2"
          >
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`rounded-sm px-5 py-2.5 font-mono text-sm transition-all ${
                  activeFilter === tab.key
                    ? 'bg-accent text-white shadow-glow-accent'
                    : 'border border-surface-border bg-surface text-text-secondary hover:border-accent/40 hover:text-text-primary'
                }`}
              >
                {t(tab.labelKey)}
              </button>
            ))}
          </motion.div>

          {/* Project Grid */}
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-sm border border-surface-border bg-surface transition-all duration-500 hover:border-accent/30 hover:shadow-glow-accent"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.image}
                      alt={t(`${project.id}Title`)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                        <ExternalLink className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    {/* Category badge */}
                    <span className="absolute left-3 top-3 rounded-sm bg-surface/80 px-2.5 py-1 font-mono text-xs text-accent backdrop-blur-sm">
                      {t(`${project.id}Category`)}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent">
                      {t(`${project.id}Title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary line-clamp-3">
                      {t(`${project.id}Description`)}
                    </p>

                    {/* Tech stack tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-sm border border-surface-border bg-surface-light px-2 py-1 font-mono text-xs text-text-tertiary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center text-text-secondary"
            >
              {t('noProjects')}
            </motion.p>
          )}
        </div>
      </section>
    </main>
  );
}
