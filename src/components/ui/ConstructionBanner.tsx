"use client";

import { useTranslations } from "next-intl";

export function ConstructionBanner() {
  const t = useTranslations("constructionBanner");

  return (
    <div className="relative z-40 bg-accent/10 border-b border-accent/20 px-4 py-2 text-center">
      <p className="text-xs font-medium text-accent">
        {t("message")}
      </p>
    </div>
  );
}
