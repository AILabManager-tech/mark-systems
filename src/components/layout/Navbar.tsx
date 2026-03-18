"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Cpu, Menu, ShieldCheck, Workflow } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { NAV_KEYS, NAV_HREFS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const tCommon = useTranslations("common");
  const tNav = useTranslations("nav");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Za-z]+)?/, "") || "/";
  const statusItems = [
    { icon: Cpu, label: locale === "fr" ? "Systems online" : "Systems online" },
    { icon: Workflow, label: locale === "fr" ? "Automation active" : "Automation active" },
    { icon: ShieldCheck, label: locale === "fr" ? "QA gates armed" : "QA gates armed" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed left-0 right-0 top-0 z-30 transition-all duration-300",
          scrolled
            ? "border-b border-accent/10 bg-background/92 backdrop-blur-xl shadow-[0_1px_18px_rgba(0,161,155,0.06)]"
            : "bg-background/86 backdrop-blur-md"
        )}
      >
        <div className="hidden border-b border-accent/10 md:block">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
              Operator mode // Mark Systems
            </div>
            <div className="flex items-center gap-3">
              {statusItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-2 rounded-sm border border-surface-border bg-surface/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-tertiary"
                >
                  <Icon className="h-3.5 w-3.5 text-accent" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[74px]">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl font-bold uppercase tracking-tight text-text-primary"
          >
            <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" />
            <div className="leading-none">
              <div>{tCommon("siteName")}</div>
              <div className="mt-1 font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-text-tertiary">
                Web / Automation / Systems
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_KEYS.filter((k) => k !== "home").map((key, index) => {
              const href = NAV_HREFS[key];
              const isActive = pathWithoutLocale === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "relative flex items-center gap-2 border-l border-surface-border pl-4 font-mono text-[12px] uppercase tracking-[0.22em] transition-colors",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  <span className="text-[10px] text-accent/80">{String(index + 1).padStart(2, "0")}</span>
                  <span>{tNav(key)}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-4 left-4 right-0 h-px bg-accent"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="hidden rounded-sm border border-accent/30 bg-accent/10 px-5 py-2 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-text-primary transition-colors hover:border-accent hover:bg-accent hover:text-background md:inline-block"
            >
              {tNav("contact")}
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-sm border border-surface-border p-2 text-text-secondary hover:border-accent/40 hover:text-text-primary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
