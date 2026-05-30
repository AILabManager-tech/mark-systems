'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { staggerContainer, fadeInUp, cardHover } from '@/lib/animations';
import { ExternalLink } from 'lucide-react';
import { REALISATIONS } from '@/lib/constants';

export function RealisationsSection() {
  const t = useTranslations('realisations');

  return (
    <section id="realisations" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
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
          {REALISATIONS.map((project) => (
            <motion.a
              key={project.key}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              initial="rest"
              whileHover="hover"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-sm transition-colors hover:border-accent/30"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={t(`items.${project.key}.name`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-accent transition-colors">
                  {t(`items.${project.key}.name`)}
                </h3>
                <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                  {t(`items.${project.key}.description`)}
                </p>

                {/* CTA */}
                <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-accent opacity-80 group-hover:opacity-100 transition-opacity">
                  {t('viewSite')}
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
