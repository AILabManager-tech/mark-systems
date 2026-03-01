"use client";

import { useTranslations } from "next-intl";
import type { BriefState, BriefAction } from "@/lib/brief-types";
import { slugify } from "@/lib/brief-utils";
import { TextField } from "./FormFields";

interface Props {
  state: BriefState;
  dispatch: React.Dispatch<BriefAction>;
  errors: Record<string, string>;
}

export function StepCompanyInfo({ state, dispatch, errors }: Props) {
  const t = useTranslations("brief.company");
  const c = state.company;

  function update(field: string, value: string) {
    const payload: Record<string, string> = { [field]: value };
    if (field === "name") {
      payload.slug = slugify(value);
    }
    dispatch({ type: "UPDATE_COMPANY", payload });
  }

  return (
    <div>
      <h2 className="mb-6 text-h3 font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="company-name" label={t("name")} required value={c.name} onChange={(v) => update("name", v)} placeholder={t("namePlaceholder")} error={errors.name} />
          <TextField id="company-slug" label={t("slug")} value={c.slug} onChange={(v) => dispatch({ type: "UPDATE_COMPANY", payload: { slug: v } })} help={t("slugHelp")} error={errors.slug} />
        </div>
        <TextField id="company-neq" label={t("neq")} value={c.neq} onChange={(v) => update("neq", v)} placeholder={t("neqPlaceholder")} error={errors.neq} />
        <TextField id="company-address" label={t("address")} required value={c.address} onChange={(v) => update("address", v)} placeholder={t("addressPlaceholder")} error={errors.address} />
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField id="company-phone" label={t("phone")} required value={c.phone} onChange={(v) => update("phone", v)} placeholder={t("phonePlaceholder")} error={errors.phone} />
          <TextField id="company-email" label={t("email")} required value={c.email} onChange={(v) => update("email", v)} placeholder={t("emailPlaceholder")} error={errors.email} />
        </div>
      </div>
    </div>
  );
}
