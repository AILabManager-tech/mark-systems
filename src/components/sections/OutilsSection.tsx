'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp, cardHover } from '@/lib/animations';
import { ExternalLink, Star } from 'lucide-react';
import { OUTILS } from '@/lib/constants';

export function OutilsSection() {
  const t = useTranslations('outils');

  return (
    <section id="outils" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[80px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          tag={t('tag')}
          title={t('title')}
          description={t('description')}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {OUTILS.map((tool) => (
            <motion.a
              key={tool.key}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              className={`group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-sm transition-colors ${
                tool.featured
                  ? 'border-accent/40 bg-accent/5 sm:col-span-2 lg:col-span-1 ring-1 ring-accent/10'
                  : 'border-white/10 bg-surface/50 hover:border-accent/30'
              }`}
            >
              {/* Featured badge */}
              {tool.featured && (
                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-accent/90 px-2.5 py-1 text-xs font-semibold text-white">
                  <Star className="h-3 w-3 fill-current" />
                  {t('featured')}
                </div>
              )}

              {/* Image */}
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={tool.image}
                  alt={t(`items.${tool.key}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                  {t(`items.${tool.key}.name`)}
                </h3>
                <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                  {t(`items.${tool.key}.description`)}
                </p>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent opacity-80 group-hover:opacity-100 transition-opacity">
                  {t('tryTool')}
                  <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>

              {/* Hover glow */}
              <motion.div
                variants={cardHover}
                className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-accent/0 group-hover:ring-accent/20 transition-all pointer-events-none"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
