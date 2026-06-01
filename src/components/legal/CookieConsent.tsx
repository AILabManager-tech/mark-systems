'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Link } from '@/i18n/navigation';

/**
 * Bannière de consentement aux cookies — conforme Loi 25 (Québec).
 *
 * Modèle opt-in strict : aucune mesure d'audience (Vercel Analytics /
 * Speed Insights) n'est chargée tant que l'utilisateur n'a pas explicitement
 * accepté. Le refus est le comportement par défaut (aucun choix = aucun script).
 *
 * Le choix est persisté dans localStorage. Le footer peut rouvrir la bannière
 * via l'évènement `ms:open-cookie-settings`.
 */

const STORAGE_KEY = 'ms-cookie-consent';
type Consent = 'accepted' | 'refused';

export function CookieConsent() {
  const t = useTranslations('cookieConsent');
  // null = pas encore monté (évite tout flash / mismatch d'hydratation)
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);

  useEffect(() => {
    const stored = (() => {
      try {
        return localStorage.getItem(STORAGE_KEY) as Consent | null;
      } catch {
        return null;
      }
    })();
    setConsent(stored);

    // Réouverture depuis le footer (« Gérer mes cookies »)
    const reopen = () => setConsent(null);
    window.addEventListener('ms:open-cookie-settings', reopen);
    return () => window.removeEventListener('ms:open-cookie-settings', reopen);
  }, []);

  const decide = useCallback((choice: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      /* localStorage indisponible : on garde le choix en mémoire pour la session */
    }
    setConsent(choice);
  }, []);

  // Pas encore monté : on ne rend rien (et surtout pas l'analytics)
  if (consent === undefined) return null;

  const bannerVisible = consent === null;

  return (
    <>
      {/* Mesure d'audience chargée UNIQUEMENT après consentement explicite */}
      {consent === 'accepted' && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}

      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-label={t('title')}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
          >
            <div className="mx-auto max-w-3xl rounded-md border border-surface-border bg-surface/95 p-5 shadow-2xl backdrop-blur-md sm:p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-accent/10 text-accent">
                  <Cookie className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-text-primary">
                    {t('title')}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {t('description')}{' '}
                    <Link
                      href="/privacy"
                      className="text-accent underline underline-offset-2 transition-opacity hover:opacity-80"
                    >
                      {t('privacyLink')}
                    </Link>
                    .
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => decide('refused')}
                  className="rounded-sm border border-surface-border px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-surface-light"
                >
                  {t('refuse')}
                </button>
                <button
                  type="button"
                  onClick={() => decide('accepted')}
                  className="rounded-sm bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                >
                  {t('accept')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
