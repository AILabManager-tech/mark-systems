import { useCallback, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { INITIAL_STATE, TOTAL_STEPS } from "./constants";
import type {
  BriefFormState,
  CompanyData,
  DesignData,
  FieldErrors,
  ProjectData,
  SubmitState,
} from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Logique du formulaire de brief : état multi-étapes, validation, navigation,
 * consentement (Loi 25) et génération du fichier récapitulatif. Découplée du
 * rendu pour garder la page mince.
 */
export function useBriefForm() {
  const t = useTranslations("briefPage");

  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formState, setFormState] = useState<BriefFormState>(INITIAL_STATE);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [consent, setConsentState] = useState(false);

  const clearError = useCallback((field: string) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const updateCompany = useCallback(
    (field: keyof CompanyData, value: string) => {
      setFormState((prev) => ({
        ...prev,
        company: { ...prev.company, [field]: value },
      }));
      clearError(field);
    },
    [clearError],
  );

  const updateProject = useCallback(
    (field: keyof ProjectData, value: string | string[]) => {
      setFormState((prev) => ({
        ...prev,
        project: { ...prev.project, [field]: value },
      }));
      clearError(field);
    },
    [clearError],
  );

  const updateDesign = useCallback(
    (field: keyof DesignData, value: string | boolean) => {
      setFormState((prev) => ({
        ...prev,
        design: { ...prev.design, [field]: value },
      }));
    },
    [],
  );

  const toggleFeature = useCallback((feature: string) => {
    setFormState((prev) => {
      const features = prev.project.features.includes(feature)
        ? prev.project.features.filter((f) => f !== feature)
        : [...prev.project.features, feature];
      return { ...prev, project: { ...prev.project, features } };
    });
  }, []);

  const setConsent = useCallback(
    (checked: boolean) => {
      setConsentState(checked);
      if (checked) clearError("consent");
    },
    [clearError],
  );

  const validateStep = useCallback((): FieldErrors => {
    const e: FieldErrors = {};
    if (currentStep === 0) {
      if (!formState.company.companyName.trim())
        e.companyName = t("errors.required");
      if (!formState.company.contactName.trim())
        e.contactName = t("errors.required");
      if (!formState.company.email.trim()) e.email = t("errors.required");
      else if (!EMAIL_RE.test(formState.company.email))
        e.email = t("errors.emailInvalid");
    }
    if (currentStep === 1) {
      if (!formState.project.projectType) e.projectType = t("errors.required");
      if (!formState.project.description.trim())
        e.description = t("errors.required");
    }
    return e;
  }, [currentStep, formState, t]);

  const handleNext = useCallback(() => {
    const validationErrors = validateStep();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [validateStep]);

  const handlePrev = useCallback(() => {
    setErrors({});
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goToStep = useCallback((step: number) => {
    setDirection(-1);
    setCurrentStep(step);
  }, []);

  /* Génère un fichier texte récapitulatif et déclenche son téléchargement. */
  const generateBriefFile = useCallback(() => {
    const content = [
      `=== ${t("pdfTitle")} ===`,
      "",
      `--- ${t("steps.companyInfo")} ---`,
      `${t("fields.companyName")}: ${formState.company.companyName}`,
      `${t("fields.contactName")}: ${formState.company.contactName}`,
      `${t("fields.email")}: ${formState.company.email}`,
      `${t("fields.phone")}: ${formState.company.phone || "—"}`,
      `${t("fields.website")}: ${formState.company.website || "—"}`,
      "",
      `--- ${t("steps.projectType")} ---`,
      `${t("fields.projectType")}: ${formState.project.projectType}`,
      `${t("fields.budget")}: ${formState.project.budget || "—"}`,
      `${t("fields.timeline")}: ${formState.project.timeline || "—"}`,
      `${t("fields.description")}: ${formState.project.description}`,
      `${t("fields.features")}: ${
        formState.project.features.map((f) => t(`features.${f}`)).join(", ") ||
        "—"
      }`,
      "",
      `--- ${t("steps.designPrefs")} ---`,
      `${t("fields.style")}: ${formState.design.style || "—"}`,
      `${t("fields.colors")}: ${formState.design.colors || "—"}`,
      `${t("fields.references")}: ${formState.design.references || "—"}`,
      `${t("fields.logoProvided")}: ${
        formState.design.logoProvided ? t("yes") : t("no")
      }`,
      `${t("fields.additionalNotes")}: ${
        formState.design.additionalNotes || "—"
      }`,
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brief-${formState.company.companyName
      .toLowerCase()
      .replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [formState, t]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!consent) {
        setErrors({ consent: t("errors.consentRequired") });
        return;
      }
      setSubmitState("submitting");
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        generateBriefFile();
        setSubmitState("success");
      } catch {
        setSubmitState("error");
      }
    },
    [consent, generateBriefFile, t],
  );

  return {
    currentStep,
    direction,
    formState,
    submitState,
    errors,
    consent,
    updateCompany,
    updateProject,
    updateDesign,
    toggleFeature,
    setConsent,
    handleNext,
    handlePrev,
    goToStep,
    handleSubmit,
  };
}
