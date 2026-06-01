'use client';

import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  FileDown,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TOTAL_STEPS, slideVariants } from '@/components/brief/constants';
import { useBriefForm } from '@/components/brief/useBriefForm';
import { BriefProgress } from '@/components/brief/BriefProgress';
import { BriefConsent } from '@/components/brief/BriefConsent';
import { StepCompany } from '@/components/brief/steps/StepCompany';
import { StepProject } from '@/components/brief/steps/StepProject';
import { StepDesignPrefs } from '@/components/brief/steps/StepDesignPrefs';
import { StepReview } from '@/components/brief/steps/StepReview';

export default function BriefPage() {
  const t = useTranslations('briefPage');
  const form = useBriefForm();
  const {
    currentStep,
    direction,
    formState,
    submitState,
    errors,
    consent,
  } = form;

  const isLastStep = currentStep === TOTAL_STEPS - 1;

  return (
    <main className="relative min-h-screen">
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-4">
              {t('label')}
            </p>
            <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-text-secondary">
              {t('subtitle')}
            </p>
          </motion.div>

          <BriefProgress currentStep={currentStep} />

          {submitState === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-base py-16 text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <CheckCircle className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-text-primary">
                {t('successTitle')}
              </h3>
              <p className="text-text-secondary">{t('successMessage')}</p>
            </motion.div>
          ) : (
            <form onSubmit={form.handleSubmit}>
              {submitState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 rounded-sm border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                  role="alert"
                >
                  {t('errorMessage')}
                </motion.div>
              )}

              <div className="card-base overflow-hidden p-6 sm:p-8">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                  >
                    {currentStep === 0 && (
                      <StepCompany
                        data={formState.company}
                        onChange={form.updateCompany}
                        errors={errors}
                      />
                    )}
                    {currentStep === 1 && (
                      <StepProject
                        data={formState.project}
                        onChange={form.updateProject}
                        onToggleFeature={form.toggleFeature}
                        errors={errors}
                      />
                    )}
                    {currentStep === 2 && (
                      <StepDesignPrefs
                        data={formState.design}
                        onChange={form.updateDesign}
                      />
                    )}
                    {currentStep === 3 && (
                      <StepReview
                        formState={formState}
                        onEditStep={form.goToStep}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Consentement Loi 25 — étape récapitulatif */}
              {isLastStep && (
                <BriefConsent
                  consent={consent}
                  onChange={form.setConsent}
                  error={errors.consent}
                />
              )}

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={form.handlePrev}
                  disabled={currentStep === 0}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-sm border border-surface-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-light',
                    currentStep === 0 && 'cursor-not-allowed opacity-30'
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t('nav.prev')}
                </button>

                {!isLastStep ? (
                  <button
                    type="button"
                    onClick={form.handleNext}
                    className="inline-flex items-center gap-2 rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                  >
                    {t('nav.next')}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitState === 'submitting'}
                    className={cn(
                      'inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90',
                      submitState === 'submitting' && 'cursor-not-allowed opacity-60'
                    )}
                  >
                    {submitState === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('nav.submitting')}
                      </>
                    ) : (
                      <>
                        <FileDown className="h-4 w-4" />
                        {t('nav.submit')}
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
