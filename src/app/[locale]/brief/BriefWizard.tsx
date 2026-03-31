"use client";

import { useReducer, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import type { BriefState, BriefAction } from "@/lib/brief-types";
import { LANGUAGES_OPTIONS } from "@/lib/brief-constants";
import { assembleBrief } from "@/lib/brief-utils";
import { validateCompany, validateSite, validateLegal } from "@/lib/brief-validation";
import { generateBriefPdf } from "@/lib/brief-pdf";
import { SITE } from "@/lib/constants";
import { WizardProgress } from "@/components/brief/WizardProgress";
import { WizardNavigation } from "@/components/brief/WizardNavigation";
import { StepCompanyInfo } from "@/components/brief/StepCompanyInfo";
import { StepSiteConfig } from "@/components/brief/StepSiteConfig";
import { StepAdaptive } from "@/components/brief/StepAdaptive";
import { StepLegal } from "@/components/brief/StepLegal";
import { StepDesign } from "@/components/brief/StepDesign";
import { StepSeoContext } from "@/components/brief/StepSeoContext";
import { StepReview } from "@/components/brief/StepReview";

const INITIAL_STATE: BriefState = {
  currentStep: 0,
  company: { name: "", slug: "", neq: "", address: "", phone: "", email: "" },
  site: {
    type: "",
    pages: [],
    features: [],
    languages: LANGUAGES_OPTIONS.filter((l) => l.defaultChecked).map((l) => l.value),
    hosting: "Vercel",
    domain: "",
  },
  adaptive: {},
  legal: {
    rpp: { name: "", email: "", title: "" },
    dataCollected: [],
    purposes: [],
    retention: "",
    transferOutsideQc: false,
    transferCountries: [],
    thirdPartyServices: [],
    consentMode: "opt-in",
    incident: { processInPlace: false, notificationEmail: "" },
  },
  design: { palette: "", typography: "", style: "minimaliste", logoProvided: false, references: "" },
  context: { competitors: "", keywordsSeo: "", freeText: "" },
  submitState: "idle",
};

function reducer(state: BriefState, action: BriefAction): BriefState {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.step };
    case "UPDATE_COMPANY":
      return { ...state, company: { ...state.company, ...action.payload } };
    case "UPDATE_SITE":
      return { ...state, site: { ...state.site, ...action.payload } };
    case "UPDATE_ADAPTIVE":
      return { ...state, adaptive: action.payload };
    case "UPDATE_LEGAL":
      return { ...state, legal: { ...state.legal, ...action.payload } };
    case "UPDATE_DESIGN":
      return { ...state, design: { ...state.design, ...action.payload } };
    case "UPDATE_CONTEXT":
      return { ...state, context: { ...state.context, ...action.payload } };
    case "SET_SUBMIT_STATE":
      return { ...state, submitState: action.state };
    case "PREFILL":
      return {
        ...state,
        company: { ...state.company, name: action.name, email: action.email },
      };
    default:
      return state;
  }
}

export function BriefWizard() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const searchParams = useSearchParams();
  const locale = useLocale();
  const t = useTranslations("brief");
  const tV = useTranslations("brief.validation");

  // Magic link prefill
  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    if (name || email) {
      dispatch({ type: "PREFILL", name: name || "", email: email || "" });
    }
  }, [searchParams]);

  // Validation per step
  const getErrors = useCallback((): Record<string, string> => {
    switch (state.currentStep) {
      case 0: return validateCompany(state.company, tV);
      case 1: return validateSite(state.site, tV);
      case 3: return validateLegal(state.legal, tV);
      default: return {};
    }
  }, [state.currentStep, state.company, state.site, state.legal, tV]);

  const [errors, setErrors] = useReducer(
    (_: Record<string, string>, next: Record<string, string>) => next,
    {}
  );

  function handleNext() {
    const validationErrors = getErrors();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    dispatch({ type: "SET_STEP", step: state.currentStep + 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePrev() {
    setErrors({});
    dispatch({ type: "SET_STEP", step: state.currentStep - 1 });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit() {
    dispatch({ type: "SET_SUBMIT_STATE", state: "submitting" });
    const briefJson = assembleBrief(state);

    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `[Mark Systems Brief] ${state.company.name}`,
          name: state.company.name,
          email: state.company.email,
          type: "brief-wizard",
          brief_json: JSON.stringify(briefJson, null, 2),
        }),
      });

      if (!res.ok) throw new Error("Formspree error");

      await generateBriefPdf(briefJson, locale);
      dispatch({ type: "SET_SUBMIT_STATE", state: "success" });
    } catch {
      dispatch({ type: "SET_SUBMIT_STATE", state: "error" });
    }
  }

  // Success screen
  if (state.submitState === "success") {
    return (
      <div className="card-base py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-accent/10 text-accent">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-h3 font-semibold text-text-primary">{t("review.successTitle")}</h3>
        <p className="text-text-secondary">{t("review.successMessage")}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-h2 font-bold text-text-primary">{t("title")}</h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>

      <WizardProgress currentStep={state.currentStep} />

      {state.submitState === "error" && (
        <div className="mb-6 rounded-sm border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {t("review.errorMessage")}
        </div>
      )}

      <div className="card-base p-6 sm:p-8">
        {state.currentStep === 0 && <StepCompanyInfo state={state} dispatch={dispatch} errors={errors} />}
        {state.currentStep === 1 && <StepSiteConfig state={state} dispatch={dispatch} errors={errors} />}
        {state.currentStep === 2 && <StepAdaptive state={state} dispatch={dispatch} />}
        {state.currentStep === 3 && <StepLegal state={state} dispatch={dispatch} errors={errors} />}
        {state.currentStep === 4 && <StepDesign state={state} dispatch={dispatch} />}
        {state.currentStep === 5 && <StepSeoContext state={state} dispatch={dispatch} />}
        {state.currentStep === 6 && <StepReview state={state} onEditStep={(step) => dispatch({ type: "SET_STEP", step })} />}

        <p className="mt-4 text-xs text-text-tertiary text-center">
          {t("nav.privacyNotice")}{" "}
          <a href="/fr/privacy" className="underline hover:text-text-secondary">
            {t("nav.privacyLink")}
          </a>
        </p>
        <WizardNavigation
          currentStep={state.currentStep}
          onPrev={handlePrev}
          onNext={handleNext}
          onSubmit={handleSubmit}
          submitting={state.submitState === "submitting"}
        />
      </div>
    </div>
  );
}
