"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_KEYS, NAV_HREFS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

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

  const visibleKeys = NAV_KEYS.filter((k) => k !== "home");

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-cyber-cyan/20 bg-background shadow-[0_2px_20px_rgba(0,255,213,0.08)]"
            : "border-white/[0.06] bg-background/95 backdrop-blur-sm"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          {/* Logo + Name */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src="/logo.png"
              alt="Mark Systems"
              width={42}
              height={42}
              className="h-[42px] w-[42px]"
            />
            <span className="hidden font-mono text-sm font-bold uppercase tracking-[0.2em] text-txt-primary sm:inline">
              Mark Systems
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-0.5 md:flex">
            {visibleKeys.map((key) => {
              const href = NAV_HREFS[key];
              const isActive = pathname === href;
              return (
                <Link
                  key={key}
                  href={href}
                  className={cn(
                    "relative px-5 py-2.5 font-mono text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-200",
                    isActive
                      ? "text-cyber-cyan"
                      : "text-txt-tertiary hover:text-white"
                  )}
                >
                  {t(key)}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-cyber-cyan shadow-[0_0_10px_rgba(0,255,213,0.6),0_0_20px_rgba(0,255,213,0.3)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute inset-x-4 bottom-0 h-px bg-white/0 transition-all duration-200 group-hover:bg-white/10" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side: CTA + Lang + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/brief"
              className="hidden rounded-lg bg-gradient-to-b from-[#1a5c4a] via-[#0f3d2e] to-[#0a2a1f] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-cyber-neon shadow-[0_4px_0_0_#061a13,0_6px_14px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(0,255,136,0.15)] border border-[#1a5c4a]/60 transition-all duration-150 hover:translate-y-[1px] hover:shadow-[0_3px_0_0_#061a13,0_4px_10px_rgba(0,0,0,0.5),0_0_20px_rgba(0,255,136,0.2)] hover:border-cyber-neon/40 active:translate-y-[3px] active:shadow-[0_1px_0_0_#061a13,inset_0_2px_4px_rgba(0,0,0,0.4)] md:inline-block"
            >
              {t("brief")}
            </Link>
            <LanguageToggle />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="rounded-sm border border-surface-border/80 bg-surface/60 p-2 text-txt-secondary hover:border-cyber-cyan/40 hover:text-txt-primary md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
