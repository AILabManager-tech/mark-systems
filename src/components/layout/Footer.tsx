"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { NAV_KEYS, NAV_HREFS } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");

  return (
    <footer className="border-t border-surface-border">
      <div className="section-container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-text-primary tracking-tight">
              <Image src="/logo.png" alt="Mark Systems logo" width={28} height={28} className="h-7 w-7" />
              {tCommon("siteName")}
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary">
              {tCommon("tagline")}. {tFooter("description")}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://github.com/AILabManager-tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-tertiary hover:text-text-primary transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/mark-systems-ca"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-tertiary hover:text-text-primary transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@marksystems.ca"
                aria-label="Email"
                className="text-text-tertiary hover:text-text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-tertiary">
              {tFooter("navLabel")}
            </h4>
            <ul className="space-y-2">
              {NAV_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={NAV_HREFS[key]}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-tertiary">
              {tFooter("legalLabel")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {tFooter("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                >
                  {tFooter("terms")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-text-tertiary">
              {tFooter("connectLabel")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@marksystems.ca" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
                  contact@marksystems.ca
                </a>
              </li>
              <li className="text-sm text-text-secondary">
                Québec, Canada
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-surface-border pt-8 flex flex-col items-center gap-2">
          <p className="text-xs text-text-tertiary">
            {tFooter("copyright", { year: new Date().getFullYear() })}
          </p>
          <p className="text-xs text-accent-primary/60">
            {tFooter("loi25")}
          </p>
        </div>
      </div>
    </footer>
  );
}
