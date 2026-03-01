"use client";

import { useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import type { BriefState, BriefAction } from "@/lib/brief-types";
import { DATA_TYPES, PURPOSE_OPTIONS, CONSENT_OPTIONS, TRANSFER_COUNTRIES } from "@/lib/brief-constants";
import { TextField, CheckboxGroup, ToggleField, SelectField } from "./FormFields";

interface Props {
  state: BriefState;
  dispatch: React.Dispatch<BriefAction>;
  errors: Record<string, string>;
}

export function StepLegal({ state, dispatch, errors }: Props) {
  const t = useTranslations("brief.legal");
  const tl = useTranslations("brief.labels");
  const l = state.legal;

  // Pre-select data types based on site type and features
  const defaultData = useMemo(() => {
    const defaults = ["nom", "courriel"];
    if (state.site.type === "ecommerce") defaults.push("telephone", "adresse", "paiement");
    if (state.site.features.includes("formulaire-contact")) defaults.push("telephone");
    if (state.site.features.includes("analytics")) defaults.push("navigation");
    return Array.from(new Set(defaults));
  }, [state.site.type, state.site.features]);

  const defaultPurposes = useMemo(() => {
    const defaults = ["communication"];
    if (state.site.features.includes("infolettre")) defaults.push("marketing");
    if (state.site.type === "ecommerce") defaults.push("commandes");
    if (state.site.features.includes("analytics")) defaults.push("analytics");
    return Array.from(new Set(defaults));
  }, [state.site.type, state.site.features]);

  // Auto-compile third-party services
  const thirdParty = useMemo(() => {
    const services: string[] = [];
    if (state.site.hosting === "Vercel") services.push("Vercel (hebergement)");
    const adaptive = state.adaptive;
    if (adaptive.analyticsProvider && adaptive.analyticsProvider !== "Aucun") {
      services.push(`${adaptive.analyticsProvider} (analytics)`);
    }
    if (adaptive.newsletterProvider) services.push(`${adaptive.newsletterProvider} (infolettre)`);
    if (adaptive.paymentProvider) services.push(`${adaptive.paymentProvider} (paiement)`);
    return services;
  }, [state.site.hosting, state.adaptive]);

  // Initialize defaults on first render
  useEffect(() => {
    if (l.dataCollected.length === 0 && l.purposes.length === 0) {
      dispatch({
        type: "UPDATE_LEGAL",
        payload: {
          dataCollected: defaultData,
          purposes: defaultPurposes,
          thirdPartyServices: thirdParty,
          transferOutsideQc: state.site.hosting === "Vercel",
          retention: state.site.type === "ecommerce" ? "5 ans (obligation fiscale)" : "24 mois",
          consentMode: "opt-in",
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep third-party services in sync
  useEffect(() => {
    dispatch({ type: "UPDATE_LEGAL", payload: { thirdPartyServices: thirdParty } });
  }, [thirdParty, dispatch]);

  function updateRpp(field: string, value: string) {
    dispatch({ type: "UPDATE_LEGAL", payload: { rpp: { ...l.rpp, [field]: value } } });
  }

  function updateIncident(field: string, value: unknown) {
    dispatch({ type: "UPDATE_LEGAL", payload: { incident: { ...l.incident, [field]: value } } });
  }

  return (
    <div>
      <h2 className="mb-2 text-h3 font-semibold text-text-primary">{t("title")}</h2>
      <p className="mb-6 text-xs font-bold text-red-400">{t("mandatory")}</p>

      <div className="space-y-6">
        {/* RPP */}
        <div className="rounded-sm border border-surface-border p-4">
          <p className="mb-4 text-sm font-medium text-accent">{t("rppTitle")}</p>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField id="legal-rpp-name" label={t("rppName")} required value={l.rpp.name} onChange={(v) => updateRpp("name", v)} placeholder={t("rppNamePlaceholder")} error={errors["rpp.name"]} />
              <TextField id="legal-rpp-email" label={t("rppEmail")} required value={l.rpp.email} onChange={(v) => updateRpp("email", v)} placeholder={t("rppEmailPlaceholder")} error={errors["rpp.email"]} />
            </div>
            <TextField id="legal-rpp-title" label={t("rppFunction")} value={l.rpp.title} onChange={(v) => updateRpp("title", v)} placeholder={t("rppFunctionDefault")} />
          </div>
        </div>

        {/* Data collected */}
        <CheckboxGroup
          label={t("dataCollected")}
          options={DATA_TYPES}
          selected={l.dataCollected}
          onChange={(v) => dispatch({ type: "UPDATE_LEGAL", payload: { dataCollected: v } })}
          error={errors.dataCollected}
        />

        {l.dataCollected.includes("sensible") && (
          <div className="rounded-sm border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs text-red-400">
            {t("sensitiveWarning")}
          </div>
        )}

        {/* Purposes */}
        <CheckboxGroup
          label={t("purposes")}
          options={PURPOSE_OPTIONS}
          selected={l.purposes}
          onChange={(v) => dispatch({ type: "UPDATE_LEGAL", payload: { purposes: v } })}
          error={errors.purposes}
        />

        {/* Retention */}
        <TextField id="legal-retention" label={t("retention")} required value={l.retention} onChange={(v) => dispatch({ type: "UPDATE_LEGAL", payload: { retention: v } })} placeholder={t("retentionPlaceholder")} error={errors.retention} />

        {/* Transfer */}
        <ToggleField label={t("transferOutsideQc")} value={l.transferOutsideQc} onChange={(v) => dispatch({ type: "UPDATE_LEGAL", payload: { transferOutsideQc: v } })} yesLabel={tl("yes")} noLabel={tl("no")} />

        {l.transferOutsideQc && (
          <CheckboxGroup
            label={t("transferCountries")}
            options={TRANSFER_COUNTRIES}
            selected={l.transferCountries}
            onChange={(v) => dispatch({ type: "UPDATE_LEGAL", payload: { transferCountries: v } })}
          />
        )}

        {/* Third party (auto) */}
        {thirdParty.length > 0 && (
          <div className="rounded-sm border border-surface-border bg-surface px-4 py-3">
            <p className="text-xs text-text-tertiary">{t("thirdPartyDetected")}</p>
            <p className="mt-1 text-sm text-text-secondary">{thirdParty.join(", ")}</p>
          </div>
        )}

        {/* Consent */}
        <SelectField id="legal-consent" label={t("consentMode")} value={l.consentMode} onChange={(v) => dispatch({ type: "UPDATE_LEGAL", payload: { consentMode: v } })} options={CONSENT_OPTIONS} />

        {/* Incident */}
        <ToggleField label={t("incidentProcess")} value={l.incident.processInPlace} onChange={(v) => updateIncident("processInPlace", v)} yesLabel={tl("yes")} noLabel={tl("no")} />
        <TextField id="legal-incident-email" label={t("incidentEmail")} value={l.incident.notificationEmail} onChange={(v) => updateIncident("notificationEmail", v)} help={t("incidentEmailHelp")} />
      </div>
    </div>
  );
}
