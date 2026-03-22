"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { SERVICE_IDS } from "@/lib/services-data";
import { SITE } from "@/lib/constants";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitState = "idle" | "submitting" | "success" | "error";

const INITIAL: FormData = { name: "", email: "", company: "", service: "", message: "" };

export function ContactForm() {
  const t = useTranslations("contactForm");
  const tV = useTranslations("validation");
  const tS = useTranslations("services");

  const [formData, setFormData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function validate(data: FormData): FormErrors {
    const e: FormErrors = {};
    if (!data.name.trim()) e.name = tV("nameRequired");
    else if (data.name.trim().length < 2) e.name = tV("nameMinLength");
    if (!data.email.trim()) e.email = tV("emailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = tV("emailInvalid");
    if (!data.message.trim()) e.message = tV("messageRequired");
    else if (data.message.trim().length < 10) e.message = tV("messageMinLength");
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitState("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${SITE.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          service: formData.service || undefined,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSubmitState("success");
        setFormData(INITIAL);
      } else {
        setSubmitState("error");
      }
    } catch {
      setSubmitState("error");
    }
  }

  function handleChange(field: keyof FormData, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormErrors];
        return next;
      });
    }
  }

  if (submitState === "success") {
    return (
      <div className="card-base py-16 text-center" aria-live="polite">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-sm bg-accent/10 text-accent">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mb-2 text-h3 font-semibold text-text-primary">{t("successTitle")}</h3>
        <p className="text-text-secondary">{t("successMessage")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Formulaire de contact">
      {submitState === "error" && (
        <div role="alert" aria-live="assertive" className="rounded-sm border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
          {t("errorMessage")}
        </div>
      )}
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-name" label={t("name")} required error={errors.name} value={formData.name} onChange={(v) => handleChange("name", v)} placeholder={t("namePlaceholder")} />
        <Field id="contact-email" label={t("email")} required type="email" error={errors.email} value={formData.email} onChange={(v) => handleChange("email", v)} placeholder={t("emailPlaceholder")} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="contact-company" label={t("company")} value={formData.company} onChange={(v) => handleChange("company", v)} placeholder={t("companyPlaceholder")} />
        <div>
          <label htmlFor="contact-service" className="mb-2 block text-sm font-medium text-text-primary">{t("serviceInterest")}</label>
          <select
            id="contact-service"
            value={formData.service}
            onChange={(e) => handleChange("service", e.target.value)}
            className="w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary"
          >
            <option value="">{t("selectService")}</option>
            {SERVICE_IDS.map((id) => (
              <option key={id} value={id}>{tS(`${id}.title`)}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-text-primary">
          {t("message")} <span className="text-accent">{t("required")}</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder={t("messagePlaceholder")}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(
            "w-full resize-none rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary",
            errors.message ? "border-red-500/60" : "border-surface-border"
          )}
        />
        {errors.message && <p id="contact-message-error" className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>
      <p className="text-xs text-text-tertiary">
        {t("privacyNotice")}{" "}
        <a href="/fr/privacy" className="underline hover:text-text-secondary">
          {t("privacyLink")}
        </a>
      </p>
      <Button type="submit" className="w-full sm:w-auto" disabled={submitState === "submitting"}>
        {submitState === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {t("sending")}
          </>
        ) : (
          t("submit")
        )}
      </Button>
    </form>
  );
}

function Field({ id, label, required, type = "text", error, value, onChange, placeholder }: {
  id: string; label: string; required?: boolean; type?: string; error?: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const t = useTranslations("contactForm");
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-accent">{t("required")}</span>}
      </label>
      <input
        id={id}
        type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
        aria-describedby={error ? errorId : undefined}
        className={cn("w-full rounded-sm border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors focus:border-text-tertiary", error ? "border-red-500/60" : "border-surface-border")}
      />
      {error && <p id={errorId} className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
