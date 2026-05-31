'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ExternalLink, Code2 } from 'lucide-react';
import { REALISATIONS, OUTILS, CONCEPTS, LOGICIELS } from '@/lib/constants';

type FilterCategory = 'all' | 'sites' | 'outils' | 'concepts' | 'logiciels';

interface CatalogItem {
  key: string;
  url?: string;
  image: string;
  category: 'sites' | 'outils' | 'concepts' | 'logiciels';
  ns: 'realisations' | 'outils' | 'concepts' | 'logiciels';
  featured?: boolean;
}

// Catalogue unifié — vrais projets en ligne (sites clients + outils testables + concepts de design).
const catalog: CatalogItem[] = [
  ...REALISATIONS.map((r) => ({
    key: r.key,
    url: r.url,
    image: r.image,
    category: 'sites' as const,
    ns: 'realisations' as const,
  })),
  ...OUTILS.map((o) => ({
    key: o.key,
    url: o.url,
    image: o.image,
    category: 'outils' as const,
    ns: 'outils' as const,
    featured: o.featured,
  })),
  ...CONCEPTS.map((c) => ({
    key: c.key,
    url: c.url,
    image: c.image,
    category: 'concepts' as const,
    ns: 'concepts' as const,
  })),
  ...LOGICIELS.map((l) => ({
    key: l.key,
    url: 'url' in l ? l.url : undefined,
    image: l.image,
    category: 'logiciels' as const,
    ns: 'logiciels' as const,
    featured: 'featured' in l ? l.featured : undefined,
  })),
];

const filterTabs: { key: FilterCategory; labelKey: string }[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'sites', labelKey: 'filterSites' },
  { key: 'outils', labelKey: 'filterOutils' },
  { key: 'logiciels', labelKey: 'filterLogiciels' },
  { key: 'concepts', labelKey: 'filterConcepts' },
];

export default function ProjectsPage() {
  const t = useTranslations('projectsPage');
  const tr = useTranslations();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filtered =
    activeFilter === 'all'
      ? catalog
      : catalog.filter((p) => p.category === activeFilter);

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
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => {
                const name = tr(`${project.ns}.items.${project.key}.name`);
                const description = tr(`${project.ns}.items.${project.key}.description`);
                const action =
                  project.category === 'sites'
                    ? tr('realisations.viewSite')
                    : project.category === 'outils'
                      ? tr('outils.tryTool')
                      : project.category === 'logiciels'
                        ? tr('logiciels.viewCode')
                        : tr('concepts.viewDemo');
                const badge =
                  project.category === 'sites'
                    ? t('badgeSite')
                    : project.category === 'outils'
                      ? t('badgeOutil')
                      : project.category === 'logiciels'
                        ? t('badgeLogiciel')
                        : t('badgeConcept');
                // Carte cliquable si une URL existe (site/outil/concept, ou logiciel avec repo public),
                // sinon carte descriptive statique (logiciel propriétaire sans démo).
                const hasLink = Boolean(project.url);
                const Card = hasLink ? motion.a : motion.div;
                const linkProps = hasLink
                  ? { href: project.url, target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <Card
                    key={project.key}
                    {...linkProps}
                    layout
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                    className="group relative flex flex-col overflow-hidden rounded-sm border border-surface-border bg-surface transition-all duration-500 hover:border-accent/30 hover:shadow-glow-accent"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Hover Overlay — seulement si la carte est cliquable */}
                      {hasLink && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                            {project.category === 'logiciels' ? (
                              <Code2 className="h-5 w-5" strokeWidth={1.5} />
                            ) : (
                              <ExternalLink className="h-5 w-5" strokeWidth={1.5} />
                            )}
                          </div>
                        </div>
                      )}
                      {/* Category badge */}
                      <span className="absolute left-3 top-3 rounded-sm bg-surface/80 px-2.5 py-1 font-mono text-xs text-accent backdrop-blur-sm">
                        {badge}
                      </span>
                      {project.featured && (
                        <span className="absolute right-3 top-3 rounded-sm bg-accent px-2.5 py-1 font-mono text-xs text-white">
                          {tr('outils.featured')}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-text-primary transition-colors group-hover:text-accent">
                        {name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary line-clamp-3">
                        {description}
                      </p>
                      {hasLink && (
                        <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-accent">
                          {action}
                          {project.category === 'logiciels' ? (
                            <Code2 className="h-4 w-4" strokeWidth={1.5} />
                          ) : (
                            <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
                          )}
                        </span>
                      )}
                    </div>
                  </Card>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filtered.length === 0 && (
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
