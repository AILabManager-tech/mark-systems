'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useEstimator } from './useEstimator';
import { EstimateurProgress } from './EstimateurProgress';
import { StepSector } from './steps/StepSector';
import { StepSiteType } from './steps/StepSiteType';
import { StepFeatures } from './steps/StepFeatures';
import { StepExtras } from './steps/StepExtras';
import { StepResults } from './steps/StepResults';

export default function EstimateurPage() {
  const t = useTranslations('estimateur');
  const est = useEstimator();
  const { step } = est;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-mono font-medium tracking-widest uppercase text-accent bg-accent/10 border border-accent/20 rounded-full">
            {t('tag')}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('title')}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        <EstimateurProgress step={step} />

        {/* Étapes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="min-h-[320px]"
          >
            {step === 0 && (
              <StepSector sector={est.sector} onSelect={est.selectSector} />
            )}
            {step === 1 && (
              <StepSiteType
                availableSiteTypes={est.availableSiteTypes}
                siteType={est.siteType}
                onSelect={est.setSiteType}
              />
            )}
            {step === 2 && (
              <StepFeatures
                features={est.features}
                onToggleFeature={est.toggleFeature}
                availableModules={est.availableModules}
                sectorModules={est.sectorModules}
                onToggleModule={est.toggleModule}
              />
            )}
            {step === 3 && (
              <StepExtras
                isBilingual={est.isBilingual}
                isMultilingual={est.isMultilingual}
                isUrgent={est.isUrgent}
                setIsBilingual={est.setIsBilingual}
                setIsMultilingual={est.setIsMultilingual}
                setIsUrgent={est.setIsUrgent}
              />
            )}
            {step === 4 && est.results && <StepResults results={est.results} />}
          </motion.div>
        </AnimatePresence>

        {/* Boutons de navigation */}
        {step < 4 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={est.prev}
              disabled={step === 0}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-gray-400 transition-all hover:border-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('prev')}
            </button>
            <button
              onClick={est.next}
              disabled={!est.canNext}
              className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-all hover:bg-accent/90 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
            >
              {step === 3 ? t('calculate') : t('next')}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
