"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_KEYS, NAV_HREFS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm md:hidden"
          />

          {/* Slide-in panel */}
          <motion.nav
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-80 flex-col border-l border-cyber-cyan/10 bg-surface/95 backdrop-blur-xl p-8 md:hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Fermer le menu"
              className="mb-8 self-end rounded-sm border border-surface-border/80 p-2 text-txt-secondary transition-colors hover:border-cyber-cyan/40 hover:text-txt-primary"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Nav links */}
            <ul className="flex-1 space-y-1">
              {NAV_KEYS.map((key) => {
                const href = NAV_HREFS[key];
                const isActive = pathname === href;
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-sm px-4 py-3 font-mono text-sm uppercase tracking-[0.14em] transition-colors",
                        isActive
                          ? "border-l-2 border-cyber-cyan bg-cyber-cyan/10 text-cyber-cyan"
                          : "text-txt-secondary hover:bg-surface-hover hover:text-txt-primary"
                      )}
                    >
                      {t(key)}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA button */}
            <Link
              href="/brief"
              onClick={onClose}
              className="mt-4 block rounded-sm border border-cyber-cyan/40 bg-cyber-cyan/10 px-5 py-3 text-center font-mono text-sm font-semibold uppercase tracking-[0.18em] text-cyber-cyan transition-all hover:bg-cyber-cyan/20"
            >
              {t("brief")}
            </Link>

            {/* Language toggle */}
            <div className="mt-6 flex justify-center">
              <LanguageToggle />
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
