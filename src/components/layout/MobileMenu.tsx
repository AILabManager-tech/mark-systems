'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useRouter } from '@/i18n/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { type: 'spring' as const, damping: 30, stiffness: 300 },
  },
  exit: {
    x: '100%',
    transition: { type: 'spring' as const, damping: 30, stiffness: 300 },
  },
};

const navListVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
  exit: {},
};

const navItemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring' as const, damping: 20, stiffness: 200 },
  },
  exit: { opacity: 0, x: 30, transition: { duration: 0.15 } },
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('nav');

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  const handleLanguageSwitch = () => {
    const targetLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: targetLocale });
    onClose();
  };

  const isFrench = locale === 'fr';
  const briefLabel = isFrench ? 'Démarrer un brief' : 'Start a brief';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="mobile-menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <motion.nav
            key="mobile-menu-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col border-l border-surface-border bg-surface shadow-2xl md:hidden"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between border-b border-surface-border/50 px-6 py-5">
              <span className="text-sm font-semibold uppercase tracking-widest text-text-tertiary">
                Menu
              </span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-sm p-2 text-text-secondary transition-colors hover:bg-surface-light hover:text-text-primary"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Nav links with stagger animation */}
            <motion.ul
              variants={navListVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex-1 overflow-y-auto px-4 py-6"
            >
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

                return (
                  <motion.li key={link.key} variants={navItemVariants}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        'group relative flex items-center gap-3 rounded-sm px-4 py-3.5 text-lg font-medium transition-all duration-200',
                        isActive
                          ? 'bg-surface-light text-text-primary'
                          : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                      )}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active-indicator"
                          className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-accent"
                          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        />
                      )}
                      {t(link.key)}
                    </Link>
                  </motion.li>
                );
              })}
            </motion.ul>

            {/* Bottom section: Language switcher + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="border-t border-surface-border/50 px-6 py-6"
            >
              {/* Language switcher */}
              <button
                onClick={handleLanguageSwitch}
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-sm border border-surface-border px-4 py-2.5 text-sm font-medium text-text-secondary transition-all duration-200 hover:border-accent/50 hover:text-text-primary"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                {locale === 'fr' ? 'English' : 'Français'}
              </button>

              {/* CTA button */}
              <Link
                href="/brief"
                onClick={onClose}
                className="block w-full rounded-sm bg-text-primary px-5 py-3 text-center text-sm font-bold text-background transition-all duration-300 hover:bg-accent hover:text-text-primary hover:shadow-glow-accent-lg"
              >
                {briefLabel}
              </Link>
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
