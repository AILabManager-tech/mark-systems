"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BowlerMascot } from "./BowlerMascot";
import { X } from "lucide-react";

const ROUTE_MESSAGE_KEYS: Record<string, string> = {
  "/": "home",
  "/services": "services",
  "/produits": "products",
  "/projets": "projects",
  "/brief": "brief",
  "/contact": "contact",
  "/a-propos": "about",
  "/outils-gratuits": "freeTools",
};

function getMessageKey(pathname: string): string {
  // Strip locale prefix: /fr/services → /services
  const stripped = pathname.replace(/^\/(fr|en)/, "") || "/";
  return ROUTE_MESSAGE_KEYS[stripped] ?? "default";
}

export function BowlerGuide() {
  const t = useTranslations("bowler");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoShown, setHasAutoShown] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const messageKey = getMessageKey(pathname);

  // Auto-show on first visit after 3s, only once
  useEffect(() => {
    if (hasAutoShown || dismissed) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      setHasAutoShown(true);
      // Auto-hide after 6s
      setTimeout(() => setIsOpen(false), 6000);
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasAutoShown, dismissed]);

  // Reset bubble on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setDismissed(false);
  }, []);

  const handleDismiss = useCallback(() => {
    setIsOpen(false);
    setDismissed(true);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Chat bubble */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative max-w-[260px] rounded-xl border border-cyber-cyan/20 bg-background/90 p-4 shadow-lg backdrop-blur-md"
          >
            <button
              onClick={handleDismiss}
              className="absolute right-2 top-2 text-txt-tertiary transition-colors hover:text-txt-secondary"
              aria-label="Fermer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="pr-4 font-mono text-xs leading-relaxed text-txt-secondary">
              {t(`messages.${messageKey}`)}
            </p>
            {/* Arrow pointing to Bowler */}
            <div className="absolute -bottom-1.5 right-8 h-3 w-3 rotate-45 border-b border-r border-cyber-cyan/20 bg-background/90" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bowler avatar button */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <BowlerMascot
          mood={isOpen ? "happy" : "idle"}
          size="sm"
          showBubbleOnHover={false}
          onClick={handleToggle}
        />
      </motion.div>
    </div>
  );
}
