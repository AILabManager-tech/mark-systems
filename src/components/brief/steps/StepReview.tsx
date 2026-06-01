import { useTranslations } from "next-intl";
import type { BriefFormState } from "../types";

interface StepReviewProps {
  formState: BriefFormState;
  onEditStep: (step: number) => void;
}

/* Étape 4 — récapitulatif des trois étapes précédentes, éditables. */
export function StepReview({ formState, onEditStep }: StepReviewProps) {
  const t = useTranslations("briefPage");

  const sections = [
    {
      step: 0,
      title: t("steps.companyInfo"),
      items: [
        { label: t("fields.companyName"), value: formState.company.companyName },
        { label: t("fields.contactName"), value: formState.company.contactName },
        { label: t("fields.email"), value: formState.company.email },
        { label: t("fields.phone"), value: formState.company.phone || "—" },
        { label: t("fields.website"), value: formState.company.website || "—" },
      ],
    },
    {
      step: 1,
      title: t("steps.projectType"),
      items: [
        {
          label: t("fields.projectType"),
          value: formState.project.projectType
            ? t(`projectTypes.${formState.project.projectType}`)
            : "—",
        },
        {
          label: t("fields.budget"),
          value: formState.project.budget
            ? t(`budgetRanges.${formState.project.budget}`)
            : "—",
        },
        {
          label: t("fields.timeline"),
          value: formState.project.timeline
            ? t(`timelines.${formState.project.timeline}`)
            : "—",
        },
        { label: t("fields.description"), value: formState.project.description },
        {
          label: t("fields.features"),
          value:
            formState.project.features.length > 0
              ? formState.project.features
                  .map((f) => t(`features.${f}`))
                  .join(", ")
              : "—",
        },
      ],
    },
    {
      step: 2,
      title: t("steps.designPrefs"),
      items: [
        {
          label: t("fields.style"),
          value: formState.design.style
            ? t(`styles.${formState.design.style}`)
            : "—",
        },
        { label: t("fields.colors"), value: formState.design.colors || "—" },
        {
          label: t("fields.references"),
          value: formState.design.references || "—",
        },
        {
          label: t("fields.logoProvided"),
          value: formState.design.logoProvided ? t("yes") : t("no"),
        },
        {
          label: t("fields.additionalNotes"),
          value: formState.design.additionalNotes || "—",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t("steps.review")}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t("reviewStep.description")}
        </p>
      </div>

      {sections.map((section) => (
        <div
          key={section.step}
          className="rounded-sm border border-surface-border bg-background/30 p-5"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-text-primary">{section.title}</h3>
            <button
              type="button"
              onClick={() => onEditStep(section.step)}
              className="text-xs font-medium text-accent transition-opacity hover:opacity-80"
            >
              {t("reviewStep.edit")}
            </button>
          </div>
          <dl className="space-y-2">
            {section.items.map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-2 text-sm">
                <dt className="text-text-tertiary">{item.label}</dt>
                <dd className="col-span-2 text-text-secondary break-words">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
