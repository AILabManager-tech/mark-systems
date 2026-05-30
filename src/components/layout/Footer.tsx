'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { SITE } from '@/lib/constants';
import { Mail, Phone, MapPin, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const serviceLinks = [
  { key: 'web' as const, href: '/services' },
  { key: 'automation' as const, href: '/services' },
  { key: 'ai' as const, href: '/services' },
  { key: 'cloud' as const, href: '/services' },
];

const companyLinks = [
  { key: 'about' as const, href: '/about' },
  { key: 'projects' as const, href: '/projects' },
  { key: 'estimateur' as const, href: '/estimateur' },
  { key: 'contact' as const, href: '/contact' },
];

const legalLinks = [
  { key: 'privacy' as const, href: '/privacy' },
  { key: 'terms' as const, href: '/privacy' },
  { key: 'cookies' as const, href: '/privacy' },
];

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-950 text-gray-400 overflow-hidden">
      {/* Subtle grid pattern background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient accent line at top */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={0}
            className="col-span-1 sm:col-span-2 lg:col-span-1"
          >
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm transition-transform group-hover:scale-105">
                MS
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {SITE.name}
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-500 max-w-xs">
              {t('tagline')}
            </p>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 text-gray-500 transition-all hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/10"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={SITE.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 text-gray-500 transition-all hover:border-gray-600 hover:text-white hover:bg-gray-800"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* Column 2: Navigation / Company */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={1}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('columns.company.title')}
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    {t(`columns.company.${link.key}`)}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-[-2px] transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={2}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('columns.services.title')}
            </h3>
            <ul className="mt-4 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-white"
                  >
                    {t(`columns.services.${link.key}`)}
                    <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-[-2px] transition-all group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={3}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-start gap-3 text-sm text-gray-500 transition-colors hover:text-white"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <span>{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="group flex items-start gap-3 text-sm text-gray-500 transition-colors hover:text-white"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                  <span>{SITE.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
                <span>{t('madeWith')}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
          className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <p className="text-xs text-gray-600">
            {t('copyright', { year: currentYear })}
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-xs text-gray-600 transition-colors hover:text-gray-400"
              >
                {t(`columns.legal.${link.key}`)}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
