"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
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

  // Strip locale prefix for matching
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Za-z]+)?/, "") || "/";

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={cn(
          "fixed left-0 right-0 top-0 z-30 transition-all duration-200",
          scrolled
            ? "border-b border-surface-border bg-background/90 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="section-container flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="text-lg font-bold text-text-primary tracking-tight">
            {tCommon("siteName")}
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_KEYS.map((key) => {
              const href = NAV_HREFS[key];
              const isActive = pathWithoutLocale === href;
              return (
                <li key={key}>
                  <Link
                    href={href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {tNav(key)}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-2 right-2 h-px bg-text-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
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
