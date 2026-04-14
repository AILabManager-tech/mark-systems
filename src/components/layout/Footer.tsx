"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_KEYS, NAV_HREFS, SITE } from "@/lib/constants";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative border-t border-cyber-cyan/10 bg-background">
      {/* Top glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* 4-column grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Mark Systems" width={32} height={32} className="h-8 w-8" />
              <span className="font-mono text-sm font-bold uppercase tracking-[0.2em] text-txt-primary">
                Mark Systems
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-txt-secondary">
              {tFooter("description")}
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
              {tFooter("navigation")}
            </p>
            <ul className="space-y-2">
              {NAV_KEYS.filter((k) => k !== "home").map((key) => (
                <li key={key}>
                  <Link
                    href={NAV_HREFS[key]}
                    className="text-sm text-txt-secondary transition-colors hover:text-txt-primary"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources + Legal */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
              {tFooter("resources")}
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/financement"
                  className="text-sm text-txt-secondary transition-colors hover:text-txt-primary"
                >
                  {tNav("financing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-confidentialite"
                  className="text-sm text-txt-secondary transition-colors hover:text-txt-primary"
                >
                  {tNav("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-txt-secondary transition-colors hover:text-txt-primary"
                >
                  {tNav("legal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
              {tFooter("contact")}
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-sm text-txt-secondary transition-colors hover:text-cyber-cyan"
                >
                  <Mail className="h-4 w-4" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-txt-secondary transition-colors hover:text-cyber-cyan"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-txt-secondary transition-colors hover:text-cyber-cyan"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:justify-between">
          <p className="font-mono text-xs text-txt-tertiary">
            &copy; {new Date().getFullYear()} Mark Systems. {tFooter("allRights")}
          </p>
          <p className="font-mono text-xs text-cyber-cyan/60 [text-shadow:0_0_12px_rgba(0,255,213,0.3)]">
            {tFooter("madeWith")} {tFooter("nexos")}
          </p>
        </div>
      </div>
    </footer>
  );
}
