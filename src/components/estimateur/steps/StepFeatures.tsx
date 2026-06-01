import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import {
  ALL_FEATURE_IDS,
  getSectorModules,
  type MultiplierId,
} from "@/lib/estimator-engine";
import { cn } from "@/lib/utils";

interface StepFeaturesProps {
  features: MultiplierId[];
  onToggleFeature: (id: MultiplierId) => void;
  availableModules: ReturnType<typeof getSectorModules>;
  sectorModules: string[];
  onToggleModule: (id: string) => void;
}

/* Étape 2 — fonctionnalités générales + modules sectoriels. */
export function StepFeatures({
  features,
  onToggleFeature,
  availableModules,
  sectorModules,
  onToggleModule,
}: StepFeaturesProps) {
  const t = useTranslations("estimateur");

  return (
    <div className="space-y-8">
      {/* Fonctionnalités générales */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          {t("featuresTitle")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ALL_FEATURE_IDS.map((fId) => (
            <button
              key={fId}
              onClick={() => onToggleFeature(fId)}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
                features.includes(fId)
                  ? "border-accent bg-accent/10 text-white"
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20",
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded border",
                  features.includes(fId)
                    ? "border-accent bg-accent text-white"
                    : "border-white/20",
                )}
              >
                {features.includes(fId) && <Check className="h-3 w-3" />}
              </div>
              {t(`features.${fId}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Modules sectoriels */}
      {availableModules.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            {t("sectorModulesTitle")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableModules.map((mod) => (
              <button
                key={mod.id}
                onClick={() => onToggleModule(mod.id)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-all",
                  sectorModules.includes(mod.id)
                    ? "border-accent bg-accent/10 text-white"
                    : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20",
                )}
              >
                <div
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded border",
                    sectorModules.includes(mod.id)
                      ? "border-accent bg-accent text-white"
                      : "border-white/20",
                  )}
                >
                  {sectorModules.includes(mod.id) && <Check className="h-3 w-3" />}
                </div>
                {t(`modules.${mod.id}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
