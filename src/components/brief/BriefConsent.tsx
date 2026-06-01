import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface BriefConsentProps {
  consent: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

/* Case de consentement Loi 25 (étape récapitulatif) — bloque l'envoi. */
export function BriefConsent({ consent, onChange, error }: BriefConsentProps) {
  const t = useTranslations("briefPage");

  return (
    <div className="mt-6">
      <label
        htmlFor="brief-consent"
        className="flex cursor-pointer items-start gap-3 text-sm text-text-secondary"
      >
        <input
          id="brief-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => onChange(e.target.checked)}
          aria-describedby={error ? "brief-consent-error" : undefined}
          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-sm border-surface-border bg-surface accent-accent"
        />
        <span>
          {t("consent.text")}{" "}
          <Link
            href="/privacy"
            className="text-accent underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            {t("consent.link")}
          </Link>
          . <span className="text-accent">*</span>
        </span>
      </label>
      {error && (
        <p id="brief-consent-error" className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
