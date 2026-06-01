import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { STYLE_OPTIONS } from "../constants";
import type { DesignData } from "../types";

interface StepDesignPrefsProps {
  data: DesignData;
  onChange: (field: keyof DesignData, value: string | boolean) => void;
}

/* Étape 3 — préférences de design (style, couleurs, références, logo, notes). */
export function StepDesignPrefs({ data, onChange }: StepDesignPrefsProps) {
  const t = useTranslations("briefPage");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t("steps.designPrefs")}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t("designStep.description")}
        </p>
      </div>

      {/* Style visuel */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {t("fields.style")}
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {STYLE_OPTIONS.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => onChange("style", style)}
              className={cn(
                "rounded-sm border px-4 py-3 text-sm transition-all",
                data.style === style
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-surface-border bg-surface text-text-secondary hover:border-text-tertiary",
              )}
            >
              {t(`styles.${style}`)}
            </button>
          ))}
        </div>
      </div>

      {/* Couleurs */}
      <div>
        <label
          htmlFor="brief-colors"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {t("fields.colors")}
        </label>
        <input
          id="brief-colors"
          type="text"
          value={data.colors}
          onChange={(e) => onChange("colors", e.target.value)}
          placeholder={t("placeholders.colors")}
          className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
        />
      </div>

      {/* Références */}
      <div>
        <label
          htmlFor="brief-references"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {t("fields.references")}
        </label>
        <textarea
          id="brief-references"
          rows={3}
          value={data.references}
          onChange={(e) => onChange("references", e.target.value)}
          placeholder={t("placeholders.references")}
          className="w-full resize-none rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
        />
      </div>

      {/* Logo */}
      <label className="flex cursor-pointer items-center gap-3 rounded-sm border border-surface-border bg-surface px-4 py-3 transition-colors hover:border-text-tertiary">
        <input
          type="checkbox"
          checked={data.logoProvided}
          onChange={(e) => onChange("logoProvided", e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors",
            data.logoProvided
              ? "border-accent bg-accent"
              : "border-surface-border",
          )}
        >
          {data.logoProvided && (
            <svg
              className="h-3.5 w-3.5 text-background"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
        <span className="text-sm text-text-primary">
          {t("fields.logoProvided")}
        </span>
      </label>

      {/* Notes additionnelles */}
      <div>
        <label
          htmlFor="brief-notes"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {t("fields.additionalNotes")}
        </label>
        <textarea
          id="brief-notes"
          rows={3}
          value={data.additionalNotes}
          onChange={(e) => onChange("additionalNotes", e.target.value)}
          placeholder={t("placeholders.additionalNotes")}
          className="w-full resize-none rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
        />
      </div>
    </div>
  );
}
