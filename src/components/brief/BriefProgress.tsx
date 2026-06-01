import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEP_ICONS, STEP_KEYS, TOTAL_STEPS } from "./constants";

interface BriefProgressProps {
  currentStep: number;
}

/* Barre de progression du wizard (4 étapes) + indicateur mobile. */
export function BriefProgress({ currentStep }: BriefProgressProps) {
  const t = useTranslations("briefPage");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between">
        {STEP_KEYS.map((key, i) => {
          const Icon = STEP_ICONS[i];
          const isActive = i === currentStep;
          const isCompleted = i < currentStep;
          return (
            <div key={key} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                    isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : isCompleted
                        ? "border-accent bg-accent text-background"
                        : "border-surface-border bg-surface text-text-tertiary",
                  )}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium transition-colors hidden sm:block",
                    isActive
                      ? "text-accent"
                      : isCompleted
                        ? "text-text-primary"
                        : "text-text-tertiary",
                  )}
                >
                  {t(`steps.${key}`)}
                </span>
              </div>
              {i < TOTAL_STEPS - 1 && (
                <div className="mx-2 h-0.5 flex-1">
                  <div
                    className={cn(
                      "h-full rounded-full transition-colors duration-300",
                      i < currentStep ? "bg-accent" : "bg-surface-border",
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Indicateur d'étape mobile */}
      <p className="mt-3 text-center text-xs text-text-tertiary sm:hidden">
        {t("stepOf", { current: currentStep + 1, total: TOTAL_STEPS })}
        {" — "}
        {t(`steps.${STEP_KEYS[currentStep]}`)}
      </p>
    </motion.div>
  );
}
