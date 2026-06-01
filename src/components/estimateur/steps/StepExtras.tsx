import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface StepExtrasProps {
  isBilingual: boolean;
  isMultilingual: boolean;
  isUrgent: boolean;
  setIsBilingual: (v: boolean) => void;
  setIsMultilingual: (v: boolean) => void;
  setIsUrgent: (v: boolean) => void;
}

/* Étape 3 — options transversales (bilingue, multilingue, urgence). */
export function StepExtras({
  isBilingual,
  isMultilingual,
  isUrgent,
  setIsBilingual,
  setIsMultilingual,
  setIsUrgent,
}: StepExtrasProps) {
  const t = useTranslations("estimateur");

  const options = [
    { label: t("extras.bilingual"), value: isBilingual, set: setIsBilingual },
    {
      label: t("extras.multilingual"),
      value: isMultilingual,
      set: setIsMultilingual,
    },
    { label: t("extras.urgent"), value: isUrgent, set: setIsUrgent },
  ];

  return (
    <div className="space-y-4 max-w-md mx-auto">
      {options.map((opt) => (
        <button
          key={opt.label}
          onClick={() => opt.set(!opt.value)}
          className={cn(
            "flex w-full items-center justify-between rounded-xl border p-5 transition-all",
            opt.value
              ? "border-accent bg-accent/10 text-white"
              : "border-white/10 bg-white/5 text-gray-300 hover:border-white/20",
          )}
        >
          <span className="font-medium">{opt.label}</span>
          <div
            className={cn(
              "flex h-6 w-11 items-center rounded-full p-0.5 transition-colors",
              opt.value ? "bg-accent" : "bg-white/20",
            )}
          >
            <div
              className={cn(
                "h-5 w-5 rounded-full bg-white shadow transition-transform",
                opt.value ? "translate-x-5" : "translate-x-0",
              )}
            />
          </div>
        </button>
      ))}
    </div>
  );
}
