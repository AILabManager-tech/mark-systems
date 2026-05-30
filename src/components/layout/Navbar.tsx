'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { Menu, X, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleLocale = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr';
    router.replace(pathname, { locale: nextLocale });
  };

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-gray-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center gap-1 text-xl font-semibold tracking-tight"
            >
              <span className="font-bold text-white transition-colors group-hover:text-[#00A19B]">
                NORBEX
              </span>
              <span className="font-light text-gray-400 transition-colors group-hover:text-gray-300">
                SYSTEMS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                    isActive(link.href)
                      ? 'text-[#00A19B]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {t(link.key)}
                  {isActive(link.href) && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-[#00A19B]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side: language switcher + CTA + mobile hamburger */}
            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <button
                onClick={toggleLocale}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                aria-label={t('switchLang')}
              >
                <Globe className="h-4 w-4" />
                <span className="uppercase">{locale === 'fr' ? 'EN' : 'FR'}</span>
              </button>

              {/* CTA Button - Desktop */}
              <Link
                href="/contact"
                className="hidden rounded-lg bg-[#00A19B] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#00A19B]/25 transition-all hover:bg-[#00A19B]/90 hover:shadow-[#00A19B]/40 active:scale-95 lg:inline-flex"
              >
                {t('cta')}
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-lg p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay + Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-80 max-w-[85vw] border-l border-white/10 bg-gray-950/95 backdrop-blur-xl lg:hidden"
            >
              <div className="flex h-full flex-col">
                {/* Drawer Header */}
                <div className="flex h-16 items-center justify-between px-6">
                  <Link
                    href="/"
                    className="flex items-center gap-1 text-lg font-semibold"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-bold text-white">NORBEX</span>
                    <span className="font-light text-gray-400">SYSTEMS</span>
                  </Link>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer Nav Links */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  <div className="space-y-1">
                    {NAV_LINKS.map((link, index) => (
                      <motion.div
                        key={link.key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center rounded-lg px-4 py-3 text-base font-medium transition-colors',
                            isActive(link.href)
                              ? 'bg-[#00A19B]/10 text-[#00A19B]'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white'
                          )}
                        >
                          {isActive(link.href) && (
                            <span className="mr-3 h-5 w-0.5 rounded-full bg-[#00A19B]" />
                          )}
                          {t(link.key)}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Drawer Footer */}
                <div className="border-t border-white/10 px-6 py-6 space-y-4">
                  {/* Language Switcher in Drawer */}
                  <button
                    onClick={toggleLocale}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{locale === 'fr' ? 'English' : 'Français'}</span>
                  </button>

                  {/* CTA Button in Drawer */}
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-lg bg-[#00A19B] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#00A19B]/25 transition-all hover:bg-[#00A19B]/90 active:scale-95"
                  >
                    {t('cta')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
