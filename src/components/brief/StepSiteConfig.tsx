"use client";

import { useTranslations } from "next-intl";
import type { BriefState, BriefAction, SiteType } from "@/lib/brief-types";
import { SITE_TYPES, PAGE_PRESETS, ALL_PAGES, FEATURES_LIST, LANGUAGES_OPTIONS, HOSTING_OPTIONS } from "@/lib/brief-constants";
import { SelectField, CheckboxGroup, TextField } from "./FormFields";

interface Props {
  state: BriefState;
  dispatch: React.Dispatch<BriefAction>;
  errors: Record<string, string>;
}

export function StepSiteConfig({ state, dispatch, errors }: Props) {
  const t = useTranslations("brief.site");
  const s = state.site;

  function updateType(type: string) {
    const preset = PAGE_PRESETS[type as SiteType] || [];
    dispatch({ type: "UPDATE_SITE", payload: { type: type as SiteType, pages: [...preset] } });
    // Reset adaptive when type changes
    dispatch({ type: "UPDATE_ADAPTIVE", payload: {} });
  }

  return (
    <div>
      <h2 className="mb-6 text-h3 font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-6">
        <SelectField
          id="site-type"
          label={t("type")}
          required
          value={s.type}
          onChange={updateType}
          options={SITE_TYPES}
          placeholder={t("typePlaceholder")}
          error={errors.type}
        />

        <CheckboxGroup
          label={t("pages")}
          options={ALL_PAGES}
          selected={s.pages}
          onChange={(pages) => dispatch({ type: "UPDATE_SITE", payload: { pages } })}
          help={t("pagesHelp")}
          error={errors.pages}
        />

        <CheckboxGroup
          label={t("features")}
          options={FEATURES_LIST}
          selected={s.features}
          onChange={(features) => dispatch({ type: "UPDATE_SITE", payload: { features } })}
        />

        <CheckboxGroup
          label={t("languages")}
          options={LANGUAGES_OPTIONS.map((l) => l.value)}
          selected={s.languages}
          onChange={(languages) => dispatch({ type: "UPDATE_SITE", payload: { languages } })}
          error={errors.languages}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            id="site-hosting"
            label={t("hosting")}
            value={s.hosting}
            onChange={(v) => dispatch({ type: "UPDATE_SITE", payload: { hosting: v } })}
            options={HOSTING_OPTIONS}
          />
          <TextField
            id="site-domain"
            label={t("domain")}
            value={s.domain}
            onChange={(v) => dispatch({ type: "UPDATE_SITE", payload: { domain: v } })}
            placeholder={t("domainPlaceholder")}
          />
        </div>
      </div>
    </div>
  );
}
