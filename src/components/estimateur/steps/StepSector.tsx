import { useTranslations } from "next-intl";
import { ALL_SECTORS, type Sector } from "@/lib/estimator-engine";
import { cn } from "@/lib/utils";
import { SECTOR_ICONS } from "../constants";

interface StepSectorProps {
  sector: Sector | null;
  onSelect: (sector: Sector) => void;
}

/* Étape 0 — choix du secteur d'activité. */
export function StepSector({ sector, onSelect }: StepSectorProps) {
  const t = useTranslations("estimateur");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ALL_SECTORS.map((s) => {
        const Icon = SECTOR_ICONS[s];
        return (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className={cn(
              "flex items-center gap-4 rounded-xl border p-5 text-left transition-all",
              sector === s
                ? "border-accent bg-accent/10 text-white"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20 hover:bg-white/10",
            )}
          >
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-lg",
                sector === s ? "bg-accent/20" : "bg-white/5",
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold">{t(`sectors.${s}.name`)}</div>
              <div className="text-sm text-gray-500">
                {t(`sectors.${s}.desc`)}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
