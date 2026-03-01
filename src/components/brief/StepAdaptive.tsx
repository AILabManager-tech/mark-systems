"use client";

import { useTranslations } from "next-intl";
import type { BriefState, BriefAction } from "@/lib/brief-types";
import { PAYMENT_PROVIDERS, NEWSLETTER_PROVIDERS, ANALYTICS_PROVIDERS, DISPLAY_MODES, PUBLISH_FREQUENCIES, AUTH_METHODS } from "@/lib/brief-constants";
import { SelectField, TextField, ToggleField, CheckboxGroup } from "./FormFields";

interface Props {
  state: BriefState;
  dispatch: React.Dispatch<BriefAction>;
}

export function StepAdaptive({ state, dispatch }: Props) {
  const t = useTranslations("brief.adaptive");
  const tl = useTranslations("brief.labels");
  const { type } = state.site;
  const { features } = state.site;
  const a = state.adaptive;

  function set(key: string, value: unknown) {
    dispatch({ type: "UPDATE_ADAPTIVE", payload: { ...a, [key]: value } });
  }

  const hasAdaptive = type === "ecommerce" || type === "portfolio" || type === "blog" || type === "application"
    || features.includes("infolettre") || features.includes("analytics");

  return (
    <div>
      <h2 className="mb-6 text-h3 font-semibold text-text-primary">{t("title")}</h2>

      {!hasAdaptive && (
        <p className="text-text-secondary">{t("noQuestions")}</p>
      )}

      <div className="space-y-5">
        {type === "ecommerce" && (
          <>
            <SelectField id="adaptive-payment" label={t("paymentProvider")} value={(a.paymentProvider as string) || ""} onChange={(v) => set("paymentProvider", v)} options={PAYMENT_PROVIDERS} />
            <TextField id="adaptive-products" label={t("productCount")} value={(a.productCount as string) || ""} onChange={(v) => set("productCount", v)} placeholder={t("productCountPlaceholder")} />
            <ToggleField label={t("shipping")} value={!!a.shipping} onChange={(v) => set("shipping", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
            {a.shipping && (
              <TextField id="adaptive-zones" label={t("shippingZones")} value={(a.shippingZones as string) || ""} onChange={(v) => set("shippingZones", v)} placeholder={t("shippingZonesPlaceholder")} />
            )}
            <ToggleField label={t("inventory")} value={!!a.inventory} onChange={(v) => set("inventory", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
          </>
        )}

        {type === "portfolio" && (
          <>
            <SelectField id="adaptive-display" label={t("displayMode")} value={(a.displayMode as string) || ""} onChange={(v) => set("displayMode", v)} options={DISPLAY_MODES} />
            <ToggleField label={t("caseStudies")} value={!!a.caseStudies} onChange={(v) => set("caseStudies", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
          </>
        )}

        {type === "blog" && (
          <>
            <SelectField id="adaptive-frequency" label={t("publishFrequency")} value={(a.publishFrequency as string) || ""} onChange={(v) => set("publishFrequency", v)} options={PUBLISH_FREQUENCIES} />
            <ToggleField label={t("comments")} value={!!a.comments} onChange={(v) => set("comments", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
            <ToggleField label={t("categoriesTags")} value={!!a.categoriesTags} onChange={(v) => set("categoriesTags", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
          </>
        )}

        {type === "application" && (
          <>
            <ToggleField label={t("authRequired")} value={!!a.authRequired} onChange={(v) => set("authRequired", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
            {a.authRequired && (
              <>
                <CheckboxGroup label={t("authMethods")} options={AUTH_METHODS} selected={(a.authMethods as string[]) || []} onChange={(v) => set("authMethods", v)} />
                <TextField id="adaptive-usertypes" label={t("userTypes")} value={(a.userTypes as string) || ""} onChange={(v) => set("userTypes", v)} placeholder={t("userTypesPlaceholder")} />
              </>
            )}
            <ToggleField label={t("realtime")} value={!!a.realtime} onChange={(v) => set("realtime", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
          </>
        )}

        {features.includes("infolettre") && (
          <SelectField id="adaptive-newsletter" label={t("newsletterProvider")} value={(a.newsletterProvider as string) || ""} onChange={(v) => set("newsletterProvider", v)} options={NEWSLETTER_PROVIDERS} />
        )}

        {features.includes("analytics") && (
          <SelectField id="adaptive-analytics" label={t("analyticsProvider")} value={(a.analyticsProvider as string) || ""} onChange={(v) => set("analyticsProvider", v)} options={ANALYTICS_PROVIDERS} />
        )}
      </div>
    </div>
  );
}
