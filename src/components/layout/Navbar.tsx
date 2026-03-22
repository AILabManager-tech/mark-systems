"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Menu } from "lucide-react";
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

  return (
    <>
      <motion.header
        role="banner"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed left-0 right-0 top-0 z-30 transition-all duration-300",
          scrolled
            ? "border-b border-surface-border/50 bg-background/60 backdrop-blur-xl shadow-[0_1px_20px_rgba(0,161,155,0.07)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold uppercase tracking-tighter text-text-primary"
          >
            <Image src="/logo.png" alt="Mark Systems logo" width={32} height={32} className="h-8 w-8" />
            {tCommon("siteName")}
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {NAV_KEYS.filter((k) => k !== "home").map((key) => {
              const href = NAV_HREFS[key];
              const isActive = pathWithoutLocale === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "relative text-sm font-medium transition-colors",
                    isActive
                      ? "text-text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {tNav(key)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
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
              className="hidden rounded-sm bg-text-primary px-5 py-2 text-sm font-bold text-background transition-all duration-300 hover:bg-accent hover:text-text-primary hover:shadow-glow-accent-lg md:inline-block"
            >
              {tNav("contact")}
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="p-2 text-text-secondary hover:text-text-primary md:hidden"
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
