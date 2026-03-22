"use client";

import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { TOTAL_STEPS } from "./WizardProgress";

interface Props {
  currentStep: number;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  submitting: boolean;
}

export function WizardNavigation({ currentStep, onPrev, onNext, onSubmit, submitting }: Props) {
  const t = useTranslations("brief.nav");
  const isLast = currentStep === TOTAL_STEPS - 1;

  return (
    <div className="mt-10 flex items-center justify-between border-t border-surface-border pt-6">
      {currentStep > 0 ? (
        <button
          type="button"
          onClick={onPrev}
          className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("previous")}
        </button>
      ) : (
        <div />
      )}

      {isLast ? (
        <div className="flex flex-col items-end gap-2">
        <Button type="button" onClick={onSubmit} disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {t("submit")}
            </>
          )}
        </Button>
        <p className="text-xs text-text-tertiary">
          {t("privacyNotice")}{" "}
          <a href="/fr/privacy" className="underline hover:text-text-secondary">{t("privacyLink")}</a>
        </p>
        </div>
      ) : (
        <Button type="button" onClick={onNext}>
          {t("next")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
