import { useTranslations } from "next-intl";
import { InputField } from "../InputField";
import type { CompanyData, FieldErrors } from "../types";

interface StepCompanyProps {
  data: CompanyData;
  onChange: (field: keyof CompanyData, value: string) => void;
  errors: FieldErrors;
}

/* Étape 1 — informations sur l'entreprise. */
export function StepCompany({ data, onChange, errors }: StepCompanyProps) {
  const t = useTranslations("briefPage");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-text-primary">
          {t("steps.companyInfo")}
        </h2>
        <p className="mt-1 text-sm text-text-secondary">
          {t("companyStep.description")}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          id="brief-company"
          label={t("fields.companyName")}
          required
          value={data.companyName}
          onChange={(v) => onChange("companyName", v)}
          placeholder={t("placeholders.companyName")}
          error={errors.companyName}
        />
        <InputField
          id="brief-contact"
          label={t("fields.contactName")}
          required
          value={data.contactName}
          onChange={(v) => onChange("contactName", v)}
          placeholder={t("placeholders.contactName")}
          error={errors.contactName}
        />
      </div>
      <InputField
        id="brief-email"
        label={t("fields.email")}
        required
        type="email"
        value={data.email}
        onChange={(v) => onChange("email", v)}
        placeholder={t("placeholders.email")}
        error={errors.email}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <InputField
          id="brief-phone"
          label={t("fields.phone")}
          type="tel"
          value={data.phone}
          onChange={(v) => onChange("phone", v)}
          placeholder={t("placeholders.phone")}
        />
        <InputField
          id="brief-website"
          label={t("fields.website")}
          value={data.website}
          onChange={(v) => onChange("website", v)}
          placeholder={t("placeholders.website")}
        />
      </div>
    </div>
  );
}
