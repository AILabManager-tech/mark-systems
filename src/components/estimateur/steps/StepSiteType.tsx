import { useTranslations } from "next-intl";
import type { SiteTypeId } from "@/lib/estimator-engine";
import { cn } from "@/lib/utils";

interface StepSiteTypeProps {
  availableSiteTypes: SiteTypeId[];
  siteType: SiteTypeId | null;
  onSelect: (siteType: SiteTypeId) => void;
}

/* Étape 1 — type de site (dépend du secteur). */
export function StepSiteType({
  availableSiteTypes,
  siteType,
  onSelect,
}: StepSiteTypeProps) {
  const t = useTranslations("estimateur");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {availableSiteTypes.map((st) => (
        <button
          key={st}
          onClick={() => onSelect(st)}
          className={cn(
            "rounded-xl border p-5 text-left transition-all",
            siteType === st
              ? "border-accent bg-accent/10 text-white"
              : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10",
          )}
        >
          <div className="font-semibold">{t(`siteTypes.${st}.name`)}</div>
          <div className="text-sm text-gray-500 mt-1">
            {t(`siteTypes.${st}.desc`)}
          </div>
        </button>
      ))}
    </div>
  );
}
