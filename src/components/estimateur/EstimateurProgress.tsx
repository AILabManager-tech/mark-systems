import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOTAL_STEPS } from "./constants";

interface EstimateurProgressProps {
  step: number;
}

/* Barre de progression du wizard d'estimation (5 étapes). */
export function EstimateurProgress({ step }: EstimateurProgressProps) {
  const t = useTranslations("estimateur");

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className="flex items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all",
                i < step
                  ? "bg-accent text-background"
                  : i === step
                    ? "bg-accent/20 text-accent border border-accent/40"
                    : "bg-white/5 text-gray-500 border border-white/10",
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            {i < TOTAL_STEPS - 1 && (
              <div
                className={cn(
                  "hidden sm:block h-0.5 w-12 md:w-20 lg:w-28 mx-1 rounded transition-colors",
                  i < step ? "bg-accent" : "bg-white/10",
                )}
              />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-gray-500">
        {t(`steps.${step}.label`)}
      </p>
    </div>
  );
}
