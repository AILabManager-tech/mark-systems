"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-8xl md:text-9xl font-bold gradient-text mb-4">404</div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
          {t("notFoundTitle")}
        </h1>
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          {t("notFoundDescription")}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors"
          >
            <Home className="w-4 h-4" />
            {t("backHome")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent/50 text-text-primary font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("contactUs")}
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
