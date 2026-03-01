"use client";

import { useTranslations } from "next-intl";
import type { BriefState, BriefAction } from "@/lib/brief-types";
import { VISUAL_STYLES } from "@/lib/brief-constants";
import { TextField, SelectField, ToggleField } from "./FormFields";

interface Props {
  state: BriefState;
  dispatch: React.Dispatch<BriefAction>;
}

export function StepDesign({ state, dispatch }: Props) {
  const t = useTranslations("brief.design");
  const tl = useTranslations("brief.labels");
  const d = state.design;

  function update(payload: Partial<typeof d>) {
    dispatch({ type: "UPDATE_DESIGN", payload });
  }

  return (
    <div>
      <h2 className="mb-6 text-h3 font-semibold text-text-primary">{t("title")}</h2>
      <div className="space-y-5">
        <TextField id="design-palette" label={t("palette")} value={d.palette} onChange={(v) => update({ palette: v })} placeholder={t("palettePlaceholder")} />
        <TextField id="design-typo" label={t("typography")} value={d.typography} onChange={(v) => update({ typography: v })} placeholder={t("typographyPlaceholder")} />
        <SelectField id="design-style" label={t("style")} value={d.style} onChange={(v) => update({ style: v })} options={VISUAL_STYLES} />
        <ToggleField label={t("logoProvided")} value={d.logoProvided} onChange={(v) => update({ logoProvided: v })} yesLabel={tl("yes")} noLabel={tl("no")} />
        <TextField id="design-refs" label={t("references")} value={d.references} onChange={(v) => update({ references: v })} placeholder={t("referencesPlaceholder")} />
      </div>
    </div>
  );
}
