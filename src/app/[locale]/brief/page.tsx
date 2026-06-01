'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  FolderKanban,
  Palette,
  ClipboardCheck,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  FileDown,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CompanyData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
}

interface ProjectData {
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features: string[];
}

interface DesignData {
  style: string;
  colors: string;
  references: string;
  logoProvided: boolean;
  additionalNotes: string;
}

interface BriefFormState {
  company: CompanyData;
  project: ProjectData;
  design: DesignData;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const INITIAL_STATE: BriefFormState = {
  company: {
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
  },
  project: {
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    features: [],
  },
  design: {
    style: '',
    colors: '',
    references: '',
    logoProvided: false,
    additionalNotes: '',
  },
};

const STEP_ICONS = [Building2, FolderKanban, Palette, ClipboardCheck];

const FEATURE_OPTIONS = [
  'responsiveDesign',
  'seo',
  'analytics',
  'cms',
  'ecommerce',
  'multiLanguage',
  'chatbot',
  'newsletter',
  'contactForm',
  'authentication',
] as const;

/* ------------------------------------------------------------------ */
/*  Animations                                                         */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function BriefPage() {
  const t = useTranslations('briefPage');

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formState, setFormState] = useState<BriefFormState>(INITIAL_STATE);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);

  const totalSteps = 4;
  const stepKeys = ['companyInfo', 'projectType', 'designPrefs', 'review'] as const;

  /* ---- helpers ---- */

  function updateCompany(field: keyof CompanyData, value: string) {
    setFormState((prev) => ({
      ...prev,
      company: { ...prev.company, [field]: value },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function updateProject(field: keyof ProjectData, value: string | string[]) {
    setFormState((prev) => ({
      ...prev,
      project: { ...prev.project, [field]: value },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function updateDesign(field: keyof DesignData, value: string | boolean) {
    setFormState((prev) => ({
      ...prev,
      design: { ...prev.design, [field]: value },
    }));
  }

  function toggleFeature(feature: string) {
    setFormState((prev) => {
      const features = prev.project.features.includes(feature)
        ? prev.project.features.filter((f) => f !== feature)
        : [...prev.project.features, feature];
      return { ...prev, project: { ...prev.project, features } };
    });
  }

  /* ---- validation ---- */

  function validateStep(): Record<string, string> {
    const e: Record<string, string> = {};
    if (currentStep === 0) {
      if (!formState.company.companyName.trim()) e.companyName = t('errors.required');
      if (!formState.company.contactName.trim()) e.contactName = t('errors.required');
      if (!formState.company.email.trim()) e.email = t('errors.required');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.company.email))
        e.email = t('errors.emailInvalid');
    }
    if (currentStep === 1) {
      if (!formState.project.projectType) e.projectType = t('errors.required');
      if (!formState.project.description.trim()) e.description = t('errors.required');
    }
    return e;
  }

  function handleNext() {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handlePrev() {
    setErrors({});
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---- PDF simulation ---- */

  function generatePdfSimulation() {
    const content = [
      `=== ${t('pdfTitle')} ===`,
      '',
      `--- ${t('steps.companyInfo')} ---`,
      `${t('fields.companyName')}: ${formState.company.companyName}`,
      `${t('fields.contactName')}: ${formState.company.contactName}`,
      `${t('fields.email')}: ${formState.company.email}`,
      `${t('fields.phone')}: ${formState.company.phone || '—'}`,
      `${t('fields.website')}: ${formState.company.website || '—'}`,
      '',
      `--- ${t('steps.projectType')} ---`,
      `${t('fields.projectType')}: ${formState.project.projectType}`,
      `${t('fields.budget')}: ${formState.project.budget || '—'}`,
      `${t('fields.timeline')}: ${formState.project.timeline || '—'}`,
      `${t('fields.description')}: ${formState.project.description}`,
      `${t('fields.features')}: ${formState.project.features.map((f) => t(`features.${f}`)).join(', ') || '—'}`,
      '',
      `--- ${t('steps.designPrefs')} ---`,
      `${t('fields.style')}: ${formState.design.style || '—'}`,
      `${t('fields.colors')}: ${formState.design.colors || '—'}`,
      `${t('fields.references')}: ${formState.design.references || '—'}`,
      `${t('fields.logoProvided')}: ${formState.design.logoProvided ? t('yes') : t('no')}`,
      `${t('fields.additionalNotes')}: ${formState.design.additionalNotes || '—'}`,
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `brief-${formState.company.companyName.toLowerCase().replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---- submit ---- */

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!consent) {
      setErrors({ consent: t('errors.consentRequired') });
      return;
    }
    setSubmitState('submitting');

    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Generate the PDF/text file
      generatePdfSimulation();

      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  }

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <main className="relative min-h-screen">
      <section className="section-padding">
        <div className="section-container max-w-3xl">
          {/* Header */}
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

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              {stepKeys.map((key, i) => {
                const Icon = STEP_ICONS[i];
                const isActive = i === currentStep;
                const isCompleted = i < currentStep;
                return (
                  <div key={key} className="flex flex-1 items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                          isActive
                            ? 'border-accent bg-accent/10 text-accent'
                            : isCompleted
                              ? 'border-accent bg-accent text-background'
                              : 'border-surface-border bg-surface text-text-tertiary'
                        )}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" strokeWidth={1.5} />
                        ) : (
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        )}
                      </div>
                      <span
                        className={cn(
                          'mt-2 text-xs font-medium transition-colors hidden sm:block',
                          isActive
                            ? 'text-accent'
                            : isCompleted
                              ? 'text-text-primary'
                              : 'text-text-tertiary'
                        )}
                      >
                        {t(`steps.${key}`)}
                      </span>
                    </div>
                    {i < totalSteps - 1 && (
                      <div className="mx-2 h-0.5 flex-1">
                        <div
                          className={cn(
                            'h-full rounded-full transition-colors duration-300',
                            i < currentStep ? 'bg-accent' : 'bg-surface-border'
                          )}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Mobile step indicator */}
            <p className="mt-3 text-center text-xs text-text-tertiary sm:hidden">
              {t('stepOf', { current: currentStep + 1, total: totalSteps })}
              {' — '}
              {t(`steps.${stepKeys[currentStep]}`)}
            </p>
          </motion.div>

          {/* Success state */}
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
            <form onSubmit={handleSubmit}>
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
                        onChange={updateCompany}
                        errors={errors}
                        t={t}
                      />
                    )}
                    {currentStep === 1 && (
                      <StepProject
                        data={formState.project}
                        onChange={updateProject}
                        onToggleFeature={toggleFeature}
                        errors={errors}
                        t={t}
                      />
                    )}
                    {currentStep === 2 && (
                      <StepDesignPrefs
                        data={formState.design}
                        onChange={updateDesign}
                        t={t}
                      />
                    )}
                    {currentStep === 3 && (
                      <StepReview
                        formState={formState}
                        onEditStep={(step) => {
                          setDirection(-1);
                          setCurrentStep(step);
                        }}
                        t={t}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Consentement Loi 25 — étape récapitulatif */}
              {currentStep === totalSteps - 1 && (
                <div className="mt-6">
                  <label
                    htmlFor="brief-consent"
                    className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary"
                  >
                    <input
                      id="brief-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        if (e.target.checked && errors.consent) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.consent;
                            return next;
                          });
                        }
                      }}
                      aria-describedby={errors.consent ? 'brief-consent-error' : undefined}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm border-surface-border bg-surface accent-accent"
                    />
                    <span>
                      {t('consent.text')}{' '}
                      <Link
                        href="/privacy"
                        className="text-accent underline underline-offset-2 transition-opacity hover:opacity-80"
                      >
                        {t('consent.link')}
                      </Link>
                      . <span className="text-accent">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p id="brief-consent-error" className="mt-1 text-xs text-red-400">
                      {errors.consent}
                    </p>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-sm border border-surface-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-light',
                    currentStep === 0 && 'cursor-not-allowed opacity-30'
                  )}
                >
                  <ChevronLeft className="h-4 w-4" />
                  {t('nav.prev')}
                </button>

                {currentStep < totalSteps - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
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

/* ================================================================== */
/*  Step Components                                                    */
/* ================================================================== */

function InputField({
  id,
  label,
  required,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary',
          error ? 'border-red-500/60' : 'border-surface-border'
        )}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

/* ---- Step 1: Company Info ---- */

function StepCompany({
  data,
  onChange,
  errors,
  t,
}: {
  data: CompanyData;
  onChange: (field: keyof CompanyData, value: string) => void;
  errors: Record<string, string>;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t('steps.companyInfo')}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t('companyStep.description')}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          id="brief-company"
          label={t('fields.companyName')}
          required
          value={data.companyName}
          onChange={(v) => onChange('companyName', v)}
          placeholder={t('placeholders.companyName')}
          error={errors.companyName}
        />
        <InputField
          id="brief-contact"
          label={t('fields.contactName')}
          required
          value={data.contactName}
          onChange={(v) => onChange('contactName', v)}
          placeholder={t('placeholders.contactName')}
          error={errors.contactName}
        />
      </div>
      <InputField
        id="brief-email"
        label={t('fields.email')}
        required
        type="email"
        value={data.email}
        onChange={(v) => onChange('email', v)}
        placeholder={t('placeholders.email')}
        error={errors.email}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          id="brief-phone"
          label={t('fields.phone')}
          type="tel"
          value={data.phone}
          onChange={(v) => onChange('phone', v)}
          placeholder={t('placeholders.phone')}
        />
        <InputField
          id="brief-website"
          label={t('fields.website')}
          value={data.website}
          onChange={(v) => onChange('website', v)}
          placeholder={t('placeholders.website')}
        />
      </div>
    </div>
  );
}

/* ---- Step 2: Project Type ---- */

function StepProject({
  data,
  onChange,
  onToggleFeature,
  errors,
  t,
}: {
  data: ProjectData;
  onChange: (field: keyof ProjectData, value: string | string[]) => void;
  onToggleFeature: (feature: string) => void;
  errors: Record<string, string>;
  t: ReturnType<typeof useTranslations>;
}) {
  const projectTypes = ['website', 'webapp', 'ecommerce', 'automation', 'aiSystem', 'other'] as const;
  const budgetRanges = ['under5k', '5k15k', '15k30k', '30k50k', 'over50k'] as const;
  const timelines = ['1month', '1to3months', '3to6months', 'over6months', 'flexible'] as const;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t('steps.projectType')}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t('projectStep.description')}
        </p>
      </div>

      {/* Project type */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {t('fields.projectType')} <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {projectTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange('projectType', type)}
              className={cn(
                'rounded-sm border px-4 py-3 text-sm transition-all',
                data.projectType === type
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-surface-border bg-surface text-text-secondary hover:border-text-tertiary'
              )}
            >
              {t(`projectTypes.${type}`)}
            </button>
          ))}
        </div>
        {errors.projectType && (
          <p className="mt-1 text-xs text-red-400">{errors.projectType}</p>
        )}
      </div>

      {/* Budget + Timeline */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="brief-budget" className="mb-2 block text-sm font-medium text-text-primary">
            {t('fields.budget')}
          </label>
          <select
            id="brief-budget"
            value={data.budget}
            onChange={(e) => onChange('budget', e.target.value)}
            className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
          >
            <option value="">{t('placeholders.selectBudget')}</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {t(`budgetRanges.${range}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brief-timeline" className="mb-2 block text-sm font-medium text-text-primary">
            {t('fields.timeline')}
          </label>
          <select
            id="brief-timeline"
            value={data.timeline}
            onChange={(e) => onChange('timeline', e.target.value)}
            className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
          >
            <option value="">{t('placeholders.selectTimeline')}</option>
            {timelines.map((tl) => (
              <option key={tl} value={tl}>
                {t(`timelines.${tl}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="brief-description" className="mb-2 block text-sm font-medium text-text-primary">
          {t('fields.description')} <span className="text-accent">*</span>
        </label>
        <textarea
          id="brief-description"
          rows={4}
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder={t('placeholders.description')}
          className={cn(
            'w-full resize-none rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary',
            errors.description ? 'border-red-500/60' : 'border-surface-border'
          )}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      {/* Features */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-primary">
          {t('fields.features')}
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {FEATURE_OPTIONS.map((feature) => (
            <label
              key={feature}
              className={cn(
                'flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-all',
                data.features.includes(feature)
                  ? 'border-accent/40 bg-accent/5 text-text-primary'
                  : 'border-surface-border text-text-secondary hover:border-text-tertiary'
              )}
            >
              <input
                type="checkbox"
                checked={data.features.includes(feature)}
                onChange={() => onToggleFeature(feature)}
                className="sr-only"
              />
              <div
                className={cn(
                  'flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors',
                  data.features.includes(feature)
                    ? 'border-accent bg-accent'
                    : 'border-surface-border'
                )}
              >
                {data.features.includes(feature) && (
                  <svg className="h-3 w-3 text-background" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {t(`features.${feature}`)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Step 3: Design Preferences ---- */

function StepDesignPrefs({
  data,
  onChange,
  t,
}: {
  data: DesignData;
  onChange: (field: keyof DesignData, value: string | boolean) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const styles = ['minimalist', 'colorful', 'corporate', 'creative', 'modern', 'classic'] as const;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t('steps.designPrefs')}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t('designStep.description')}
        </p>
      </div>

      {/* Visual style */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {t('fields.style')}
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {styles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => onChange('style', style)}
              className={cn(
                'rounded-sm border px-4 py-3 text-sm transition-all',
                data.style === style
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-surface-border bg-surface text-text-secondary hover:border-text-tertiary'
              )}
            >
              {t(`styles.${style}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <label htmlFor="brief-colors" className="mb-2 block text-sm font-medium text-text-primary">
          {t('fields.colors')}
        </label>
        <input
          id="brief-colors"
          type="text"
          value={data.colors}
          onChange={(e) => onChange('colors', e.target.value)}
          placeholder={t('placeholders.colors')}
          className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
        />
      </div>

      {/* References */}
      <div>
        <label htmlFor="brief-references" className="mb-2 block text-sm font-medium text-text-primary">
          {t('fields.references')}
        </label>
        <textarea
          id="brief-references"
          rows={3}
          value={data.references}
          onChange={(e) => onChange('references', e.target.value)}
          placeholder={t('placeholders.references')}
          className="w-full resize-none rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
        />
      </div>

      {/* Logo */}
      <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-surface-border bg-surface px-4 py-3 transition-colors hover:border-text-tertiary">
        <input
          type="checkbox"
          checked={data.logoProvided}
          onChange={(e) => onChange('logoProvided', e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors',
            data.logoProvided ? 'border-accent bg-accent' : 'border-surface-border'
          )}
        >
          {data.logoProvided && (
            <svg className="h-3.5 w-3.5 text-background" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span className="text-sm text-text-primary">{t('fields.logoProvided')}</span>
      </label>

      {/* Additional notes */}
      <div>
        <label htmlFor="brief-notes" className="mb-2 block text-sm font-medium text-text-primary">
          {t('fields.additionalNotes')}
        </label>
        <textarea
          id="brief-notes"
          rows={3}
          value={data.additionalNotes}
          onChange={(e) => onChange('additionalNotes', e.target.value)}
          placeholder={t('placeholders.additionalNotes')}
          className="w-full resize-none rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
        />
      </div>
    </div>
  );
}

/* ---- Step 4: Review & Submit ---- */

function StepReview({
  formState,
  onEditStep,
  t,
}: {
  formState: BriefFormState;
  onEditStep: (step: number) => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const sections = [
    {
      step: 0,
      title: t('steps.companyInfo'),
      items: [
        { label: t('fields.companyName'), value: formState.company.companyName },
        { label: t('fields.contactName'), value: formState.company.contactName },
        { label: t('fields.email'), value: formState.company.email },
        { label: t('fields.phone'), value: formState.company.phone || '—' },
        { label: t('fields.website'), value: formState.company.website || '—' },
      ],
    },
    {
      step: 1,
      title: t('steps.projectType'),
      items: [
        {
          label: t('fields.projectType'),
          value: formState.project.projectType
            ? t(`projectTypes.${formState.project.projectType}`)
            : '—',
        },
        {
          label: t('fields.budget'),
          value: formState.project.budget
            ? t(`budgetRanges.${formState.project.budget}`)
            : '—',
        },
        {
          label: t('fields.timeline'),
          value: formState.project.timeline
            ? t(`timelines.${formState.project.timeline}`)
            : '—',
        },
        { label: t('fields.description'), value: formState.project.description },
        {
          label: t('fields.features'),
          value:
            formState.project.features.length > 0
              ? formState.project.features.map((f) => t(`features.${f}`)).join(', ')
              : '—',
        },
      ],
    },
    {
      step: 2,
      title: t('steps.designPrefs'),
      items: [
        {
          label: t('fields.style'),
          value: formState.design.style ? t(`styles.${formState.design.style}`) : '—',
        },
        { label: t('fields.colors'), value: formState.design.colors || '—' },
        { label: t('fields.references'), value: formState.design.references || '—' },
        {
          label: t('fields.logoProvided'),
          value: formState.design.logoProvided ? t('yes') : t('no'),
        },
        {
          label: t('fields.additionalNotes'),
          value: formState.design.additionalNotes || '—',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t('steps.review')}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t('reviewStep.description')}
        </p>
      </div>

      {sections.map((section) => (
        <div
          key={section.step}
          className="rounded-sm border border-surface-border bg-background/30 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">{section.title}</h3>
            <button
              type="button"
              onClick={() => onEditStep(section.step)}
              className="text-xs font-medium text-accent transition-opacity hover:opacity-80"
            >
              {t('reviewStep.edit')}
            </button>
          </div>
          <dl className="space-y-2">
            {section.items.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-2 text-sm">
                <dt className="text-text-tertiary">{item.label}</dt>
                <dd className="col-span-2 text-text-secondary break-words">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
