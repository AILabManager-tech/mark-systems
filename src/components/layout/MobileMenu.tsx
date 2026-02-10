"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_KEYS, NAV_HREFS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Za-z]+)?/, "") || "/";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          />
          <motion.nav
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-surface-border bg-surface p-8 md:hidden"
          >
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="mb-8 self-end text-text-secondary hover:text-text-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="space-y-1">
              {NAV_KEYS.map((key) => {
                const href = NAV_HREFS[key];
                const isActive = pathWithoutLocale === href;
                return (
                  <li key={key}>
                    <Link
                      href={href}
                      onClick={onClose}
                      className={cn(
                        "block rounded-sm px-4 py-3 text-lg font-medium transition-colors",
                        isActive
                          ? "bg-surface-light text-text-primary"
                          : "text-text-secondary hover:bg-surface-light hover:text-text-primary"
                      )}
                    >
                      {tNav(key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
