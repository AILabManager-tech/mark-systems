'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const t = useTranslations('contactPage');

  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const subjectKeys = ['webDevelopment', 'automation', 'aiSolutions', 'cloudArchitecture', 'consulting', 'other'] as const;

  function validate(data: FormData): FormErrors {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = t('errors.nameRequired');
    if (!data.email.trim()) e.email = t('errors.emailRequired');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = t('errors.emailInvalid');
    if (!data.message.trim()) e.message = t('errors.messageRequired');
    else if (data.message.trim().length < 10) e.message = t('errors.messageMinLength');
    return e;
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitState('submitting');

    try {
      const res = await fetch('https://formspree.io/f/xpwzgjkd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          subject: formData.subject || undefined,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitState('success');
        setFormData(INITIAL_FORM);
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  }

  const contactItems = [
    {
      icon: Mail,
      label: t('info.emailLabel'),
      value: SITE.email,
      href: `mailto:${SITE.email}`,
    },
    {
      icon: Phone,
      label: t('info.phoneLabel'),
      value: SITE.phone,
      href: `tel:${SITE.phone.replace(/\s/g, '')}`,
    },
    {
      icon: MapPin,
      label: t('info.locationLabel'),
      value: t('info.locationValue'),
      href: null,
    },
  ];

  return (
    <main className="relative min-h-screen">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        style={{
          backgroundImage: 'url(/images/bg/cloud-architecture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/95 to-background" />

      <section className="section-padding">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent mb-4">
              {t('label')}
            </p>
            <h1 className="text-3xl font-bold text-text-primary sm:text-4xl lg:text-5xl">
              {t('title')}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* Split layout */}
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-5">
            {/* Left: Contact info */}
            <motion.div
              className="space-y-6 lg:col-span-2"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {contactItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  custom={i}
                  className="card-base group"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-sm bg-surface-light text-accent transition-colors group-hover:bg-accent/20">
                    <item.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="mb-1 font-semibold text-text-primary">
                    {item.label}
                  </h3>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-text-secondary transition-colors hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-text-secondary">{item.value}</p>
                  )}
                </motion.div>
              ))}

              {/* Additional info card */}
              <motion.div
                variants={fadeUp}
                custom={3}
                className="card-base border-accent/20 bg-[linear-gradient(135deg,rgba(0,161,155,0.08),rgba(5,5,5,0.98)_50%)]"
              >
                <h3 className="mb-2 font-semibold text-text-primary">
                  {t('info.availabilityTitle')}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {t('info.availabilityText')}
                </p>
              </motion.div>
            </motion.div>

            {/* Right: Contact form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {submitState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="card-base py-16 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle className="h-7 w-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-text-primary">
                      {t('form.successTitle')}
                    </h3>
                    <p className="text-text-secondary">
                      {t('form.successMessage')}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="card-base space-y-6 p-6 sm:p-8"
                    noValidate
                  >
                    <h2 className="text-xl font-semibold text-text-primary">
                      {t('form.heading')}
                    </h2>

                    {submitState === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="rounded-sm border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400"
                      >
                        {t('form.errorMessage')}
                      </motion.div>
                    )}

                    {/* Name + Email */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="mb-2 block text-sm font-medium text-text-primary"
                        >
                          {t('form.name')}{' '}
                          <span className="text-accent">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          placeholder={t('form.namePlaceholder')}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={cn(
                            'w-full rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary',
                            errors.name ? 'border-red-500/60' : 'border-surface-border'
                          )}
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1 text-xs text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="mb-2 block text-sm font-medium text-text-primary"
                        >
                          {t('form.email')}{' '}
                          <span className="text-accent">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          placeholder={t('form.emailPlaceholder')}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={cn(
                            'w-full rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary',
                            errors.email ? 'border-red-500/60' : 'border-surface-border'
                          )}
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1 text-xs text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Company + Subject */}
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-company"
                          className="mb-2 block text-sm font-medium text-text-primary"
                        >
                          {t('form.company')}
                        </label>
                        <input
                          id="contact-company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange('company', e.target.value)}
                          placeholder={t('form.companyPlaceholder')}
                          className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-subject"
                          className="mb-2 block text-sm font-medium text-text-primary"
                        >
                          {t('form.subject')}
                        </label>
                        <select
                          id="contact-subject"
                          value={formData.subject}
                          onChange={(e) => handleChange('subject', e.target.value)}
                          className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
                        >
                          <option value="">{t('form.selectSubject')}</option>
                          {subjectKeys.map((key) => (
                            <option key={key} value={key}>
                              {t(`form.subjects.${key}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="mb-2 block text-sm font-medium text-text-primary"
                      >
                        {t('form.message')}{' '}
                        <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        placeholder={t('form.messagePlaceholder')}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={cn(
                          'w-full resize-none rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary',
                          errors.message ? 'border-red-500/60' : 'border-surface-border'
                        )}
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1 text-xs text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={submitState === 'submitting'}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-sm bg-accent px-6 py-3 text-sm font-medium text-background transition-opacity',
                        submitState === 'submitting' && 'cursor-not-allowed opacity-60'
                      )}
                    >
                      {submitState === 'submitting' ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="3"
                              className="opacity-25"
                            />
                            <path
                              d="M4 12a8 8 0 018-8"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          {t('form.sending')}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" strokeWidth={1.5} />
                          {t('form.submit')}
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
