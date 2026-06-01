import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  BUDGET_RANGES,
  FEATURE_OPTIONS,
  PROJECT_TYPES,
  TIMELINES,
} from "../constants";
import type { FieldErrors, ProjectData } from "../types";

interface StepProjectProps {
  data: ProjectData;
  onChange: (field: keyof ProjectData, value: string | string[]) => void;
  onToggleFeature: (feature: string) => void;
  errors: FieldErrors;
}

/* Étape 2 — type de projet, budget, délai, description, fonctionnalités. */
export function StepProject({
  data,
  onChange,
  onToggleFeature,
  errors,
}: StepProjectProps) {
  const t = useTranslations("briefPage");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t("steps.projectType")}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t("projectStep.description")}
        </p>
      </div>

      {/* Type de projet */}
      <div>
        <label className="mb-2 block text-sm font-medium text-text-primary">
          {t("fields.projectType")} <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onChange("projectType", type)}
              className={cn(
                "rounded-sm border px-4 py-3 text-sm transition-all",
                data.projectType === type
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-surface-border bg-surface text-text-secondary hover:border-text-tertiary",
              )}
            >
              {t(`projectTypes.${type}`)}
            </button>
          ))}
        </div>
        {errors.projectType && (
          <p className="mt-1 text-xs text-red-400">{errors.projectType}</p>
        )}
      </div>

      {/* Budget + Délai */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="brief-budget"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            {t("fields.budget")}
          </label>
          <select
            id="brief-budget"
            value={data.budget}
            onChange={(e) => onChange("budget", e.target.value)}
            className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
          >
            <option value="">{t("placeholders.selectBudget")}</option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {t(`budgetRanges.${range}`)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="brief-timeline"
            className="mb-2 block text-sm font-medium text-text-primary"
          >
            {t("fields.timeline")}
          </label>
          <select
            id="brief-timeline"
            value={data.timeline}
            onChange={(e) => onChange("timeline", e.target.value)}
            className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
          >
            <option value="">{t("placeholders.selectTimeline")}</option>
            {TIMELINES.map((tl) => (
              <option key={tl} value={tl}>
                {t(`timelines.${tl}`)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="brief-description"
          className="mb-2 block text-sm font-medium text-text-primary"
        >
          {t("fields.description")} <span className="text-accent">*</span>
        </label>
        <textarea
          id="brief-description"
          rows={4}
          value={data.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder={t("placeholders.description")}
          className={cn(
            "w-full resize-none rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary",
            errors.description ? "border-red-500/60" : "border-surface-border",
          )}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-400">{errors.description}</p>
        )}
      </div>

      {/* Fonctionnalités */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-primary">
          {t("fields.features")}
        </label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {FEATURE_OPTIONS.map((feature) => (
            <label
              key={feature}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-all",
                data.features.includes(feature)
                  ? "border-accent/40 bg-accent/5 text-text-primary"
                  : "border-surface-border text-text-secondary hover:border-text-tertiary",
              )}
            >
              <input
                type="checkbox"
                checked={data.features.includes(feature)}
                onChange={() => onToggleFeature(feature)}
                className="sr-only"
              />
              <div
                className={cn(
                  "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border transition-colors",
                  data.features.includes(feature)
                    ? "border-accent bg-accent"
                    : "border-surface-border",
                )}
              >
                {data.features.includes(feature) && (
                  <svg
                    className="h-3 w-3 text-background"
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
              {t(`features.${feature}`)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
