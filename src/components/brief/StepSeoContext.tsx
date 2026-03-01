"use client";

import { useTranslations } from "next-intl";
import type { BriefState, BriefAction } from "@/lib/brief-types";
import { TextField, TextAreaField } from "./FormFields";

interface Props {
  state: BriefState;
  dispatch: React.Dispatch<BriefAction>;
}

export function StepSeoContext({ state, dispatch }: Props) {
  const t = useTranslations("brief.seo");
  const c = state.context;

  function update(payload: Partial<typeof c>) {
    dispatch({ type: "UPDATE_CONTEXT", payload });
  }

  return (
    <div>
      <h2 className="mb-6 text-h3 font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-5">
        <TextField id="seo-competitors" label={t("competitors")} value={c.competitors} onChange={(v) => update({ competitors: v })} placeholder={t("competitorsPlaceholder")} />
        <TextField id="seo-keywords" label={t("keywords")} value={c.keywordsSeo} onChange={(v) => update({ keywordsSeo: v })} placeholder={t("keywordsPlaceholder")} />
        <TextAreaField id="seo-freetext" label={t("freeText")} value={c.freeText} onChange={(v) => update({ freeText: v })} placeholder={t("freeTextPlaceholder")} />
      </div>
    </div>
  );
}
