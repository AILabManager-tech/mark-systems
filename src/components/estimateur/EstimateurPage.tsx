'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/navigation';
import {
  ChevronRight,
  ChevronLeft,
  Building2,
  Stethoscope,
  Briefcase,
  Store,
  Check,
  ArrowRight,
  DollarSign,
  Calendar,
  Shield,
  Sparkles,
} from 'lucide-react';
import {
  computeEstimation,
  getSiteTypesForSector,
  getSectorModules,
  ALL_FEATURE_IDS,
  ALL_SECTORS,
  type Sector,
  type SiteTypeId,
  type MultiplierId,
  type ScenarioResult,
} from '@/lib/estimator-engine';
import { cn } from '@/lib/utils';

const SECTOR_ICONS: Record<Sector, typeof Building2> = {
  JUR: Building2,
  MED: Stethoscope,
  PRO: Briefcase,
  PME: Store,
};

function formatCAD(amount: number): string {
  return new Intl.NumberFormat('fr-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function EstimateurPage() {
  const t = useTranslations('estimateur');

  // Wizard state
  const [step, setStep] = useState(0);
  const [sector, setSector] = useState<Sector | null>(null);
  const [siteType, setSiteType] = useState<SiteTypeId | null>(null);
  const [features, setFeatures] = useState<MultiplierId[]>([]);
  const [sectorModules, setSectorModules] = useState<string[]>([]);
  const [isBilingual, setIsBilingual] = useState(false);
  const [isMultilingual, setIsMultilingual] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const totalSteps = 5;

  const results = useMemo<ScenarioResult[] | null>(() => {
    if (step < 4 || !sector || !siteType) return null;
    return computeEstimation({
      sector,
      siteType,
      features,
      sectorModules,
      isBilingual,
      isMultilingual,
      isUrgent,
    });
  }, [step, sector, siteType, features, sectorModules, isBilingual, isMultilingual, isUrgent]);

  const canNext = useMemo(() => {
    if (step === 0) return sector !== null;
    if (step === 1) return siteType !== null;
    return true;
  }, [step, sector, siteType]);

  const next = useCallback(() => {
    if (canNext && step < totalSteps - 1) setStep((s) => s + 1);
  }, [canNext, step]);

  const prev = useCallback(() => {
    if (step > 0) setStep((s) => s - 1);
  }, [step]);

  const toggleFeature = useCallback((id: MultiplierId) => {
    setFeatures((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const toggleModule = useCallback((id: string) => {
    setSectorModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }, []);

  const availableSiteTypes = sector ? getSiteTypesForSector(sector) : [];
  const availableModules = sector ? getSectorModules(sector) : [];

  const scenarioColors: Record<string, string> = {
    eco: 'border-emerald-500/30 bg-emerald-500/5',
    rec: 'border-accent/40 bg-accent/5 ring-1 ring-accent/20',
    premium: 'border-purple-500/30 bg-purple-500/5',
  };

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
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

        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className="flex items-center">
                <div
                  className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all',
                    i < step
                      ? 'bg-accent text-white'
                      : i === step
                        ? 'bg-accent/20 text-accent border border-accent/40'
                        : 'bg-white/5 text-gray-500 border border-white/10'
                  )}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={cn(
                      'hidden sm:block h-0.5 w-12 md:w-20 lg:w-28 mx-1 rounded transition-colors',
                      i < step ? 'bg-accent' : 'bg-white/10'
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-500">
            {t(`steps.${step}.label`)}
          </p>
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="min-h-[320px]"
          >
            {/* STEP 0: Sector */}
            {step === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ALL_SECTORS.map((s) => {
                  const Icon = SECTOR_ICONS[s];
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        setSector(s);
                        setSiteType(null);
                        setSectorModules([]);
                      }}
                      className={cn(
                        'flex items-center gap-4 rounded-xl border p-5 text-left transition-all',
                        sector === s
                          ? 'border-accent bg-accent/10 text-white'
                          : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10'
                      )}
                    >
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-lg',
                          sector === s ? 'bg-accent/20' : 'bg-white/5'
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {t(`sectors.${s}.name`)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {t(`sectors.${s}.desc`)}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* STEP 1: Site type */}
            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableSiteTypes.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSiteType(st)}
                    className={cn(
                      'rounded-xl border p-5 text-left transition-all',
                      siteType === st
                        ? 'border-accent bg-accent/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10'
                    )}
                  >
                    <div className="font-semibold">{t(`siteTypes.${st}.name`)}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {t(`siteTypes.${st}.desc`)}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 2: Features + sector modules */}
            {step === 2 && (
              <div className="space-y-8">
                {/* General features */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t('featuresTitle')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ALL_FEATURE_IDS.map((fId) => (
                      <button
                        key={fId}
                        onClick={() => toggleFeature(fId)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all',
                          features.includes(fId)
                            ? 'border-accent bg-accent/10 text-white'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                        )}
                      >
                        <div
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded border',
                            features.includes(fId)
                              ? 'border-accent bg-accent text-white'
                              : 'border-white/20'
                          )}
                        >
                          {features.includes(fId) && <Check className="h-3 w-3" />}
                        </div>
                        {t(`features.${fId}`)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sector modules */}
                {availableModules.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t('sectorModulesTitle')}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {availableModules.map((mod) => (
                        <button
                          key={mod.id}
                          onClick={() => toggleModule(mod.id)}
                          className={cn(
                            'flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all',
                            sectorModules.includes(mod.id)
                              ? 'border-accent bg-accent/10 text-white'
                              : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'
                          )}
                        >
                          <div
                            className={cn(
                              'flex h-5 w-5 items-center justify-center rounded border',
                              sectorModules.includes(mod.id)
                                ? 'border-accent bg-accent text-white'
                                : 'border-white/20'
                            )}
                          >
                            {sectorModules.includes(mod.id) && <Check className="h-3 w-3" />}
                          </div>
                          {t(`modules.${mod.id}`)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: Extras (bilingual, multilingual, urgency) */}
            {step === 3 && (
              <div className="space-y-4 max-w-md mx-auto">
                {[
                  { label: t('extras.bilingual'), value: isBilingual, set: setIsBilingual },
                  { label: t('extras.multilingual'), value: isMultilingual, set: setIsMultilingual },
                  { label: t('extras.urgent'), value: isUrgent, set: setIsUrgent },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    onClick={() => opt.set(!opt.value)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl border p-5 transition-all',
                      opt.value
                        ? 'border-accent bg-accent/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'
                    )}
                  >
                    <span className="font-medium">{opt.label}</span>
                    <div
                      className={cn(
                        'flex h-6 w-11 items-center rounded-full p-0.5 transition-colors',
                        opt.value ? 'bg-accent' : 'bg-white/20'
                      )}
                    >
                      <div
                        className={cn(
                          'h-5 w-5 rounded-full bg-white shadow transition-transform',
                          opt.value ? 'translate-x-5' : 'translate-x-0'
                        )}
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* STEP 4: Results */}
            {step === 4 && results && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {results.map((sc) => (
                    <motion.div
                      key={sc.tier}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'relative rounded-2xl border p-6 flex flex-col',
                        scenarioColors[sc.tier]
                      )}
                    >
                      {sc.tier === 'rec' && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                          <Sparkles className="h-3 w-3" />
                          {t('recommended')}
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-white mb-1">
                        {t(`scenarios.${sc.tier}.name`)}
                      </h3>
                      <p className="text-xs text-gray-500 mb-5">
                        {t(`scenarios.${sc.tier}.desc`)}
                      </p>

                      <div className="text-3xl font-bold text-white mb-1">
                        {formatCAD(sc.initialTotal)}
                      </div>
                      <div className="text-sm text-gray-400 mb-5">
                        {t('initialCost')}
                      </div>

                      <div className="space-y-2 text-sm border-t border-white/10 pt-4">
                        <div className="flex justify-between text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5" />
                            {t('breakdown.base')}
                          </span>
                          <span className="text-white">{formatCAD(sc.baseCost)}</span>
                        </div>
                        {sc.multipliersCost > 0 && (
                          <div className="flex justify-between text-gray-400">
                            <span>{t('breakdown.addons')}</span>
                            <span className="text-white">{formatCAD(sc.multipliersCost)}</span>
                          </div>
                        )}
                        {sc.sectorModulesCost > 0 && (
                          <div className="flex justify-between text-gray-400">
                            <span>{t('breakdown.sector')}</span>
                            <span className="text-white">{formatCAD(sc.sectorModulesCost)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Shield className="h-3.5 w-3.5" />
                            {t('breakdown.contingency')}
                          </span>
                          <span className="text-white">{formatCAD(sc.contingency)}</span>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-white/10 pt-4 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-400">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {t('breakdown.monthly')}
                          </span>
                          <span className="text-white">{formatCAD(sc.monthlyTotal)}{t('perMonth')}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-white pt-2 border-t border-white/5">
                          <span>{t('breakdown.year1')}</span>
                          <span className="text-accent">{formatCAD(sc.year1Total)}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Transparency */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h4 className="text-sm font-semibold text-white mb-3">{t('transparency.title')}</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    {[1, 2, 3, 4].map((i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                        {t(`transparency.note${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all active:scale-95"
                  >
                    {t('ctaLaunch')}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={step === 0}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-gray-400 transition-all hover:border-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4" />
              {t('prev')}
            </button>
            <button
              onClick={next}
              disabled={!canNext}
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
