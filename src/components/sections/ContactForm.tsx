"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, MapPin, Github, Linkedin, ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { GlowCard } from "@/components/ui/GlowCard";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { SITE } from "@/lib/constants";
import { SectionBackground } from "@/components/ui/SectionBackground";

type FormStatus = "idle" | "loading" | "success" | "error";

const SERVICE_KEYS = [
  "site-web", "refonte", "agents-ia", "automatisation",
  "audit-qualite", "consulting", "solution-custom", "autre",
] as const;

const BUDGET_KEYS = ["less-3k", "3k-10k", "10k-25k", "25k-50k", "50k-plus"] as const;
const TIMELINE_KEYS = ["urgent", "soon", "standard", "flexible"] as const;
const SHOW_BUDGET_FOR = new Set(["site-web", "refonte", "agents-ia", "automatisation", "solution-custom"]);

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [selectedService, setSelectedService] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    try {
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://formspree.io/f/xpwdjkql", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        setSelectedService("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-lg border border-white/[0.06] bg-background/60 px-4 py-3 text-sm text-txt-primary placeholder-txt-tertiary outline-none transition-colors focus:border-cyber-cyan/40 focus:ring-1 focus:ring-cyber-cyan/20";

  const showBudget = SHOW_BUDGET_FOR.has(selectedService);

  return (
    <div className="relative py-20 md:py-28">
      <SectionBackground src="/backgrounds/hero-contact.jpg" opacity={0.25} />
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <FadeIn>
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.28em] text-cyber-cyan">
            {t("hero.label")}
          </span>
          <h1 className="text-h1 font-bold text-txt-primary">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-txt-secondary">
            {t("hero.description")}
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Form */}
          <FadeIn>
            <GlowCard className="p-8">
              {status === "success" ? (
                <div className="py-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyber-neon/10">
                    <svg className="h-8 w-8 text-cyber-neon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold text-cyber-neon">
                    {t("form.success")}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name + Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-txt-secondary">
                        {t("form.name")}
                      </label>
                      <input id="name" name="name" type="text" required className={inputClass} placeholder={t("form.namePlaceholder")} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-txt-secondary">
                        {t("form.email")}
                      </label>
                      <input id="email" name="email" type="email" required className={inputClass} placeholder={t("form.emailPlaceholder")} />
                    </div>
                  </div>

                  {/* Service dropdown */}
                  <div>
                    <label htmlFor="subject" className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-txt-secondary">
                      {t("form.subject")}
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      >
                        <option value="" disabled>{t("form.subjectPlaceholder")}</option>
                        {SERVICE_KEYS.map((key) => (
                          <option key={key} value={key}>
                            {t(`form.subjects.${key}.label`)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyber-cyan" />
                    </div>
                    {selectedService && (
                      <p className="mt-2 text-xs text-cyber-cyan/70">
                        {t(`form.subjects.${selectedService}.hint`)}
                      </p>
                    )}
                  </div>

                  {/* Budget + Timeline (conditional) */}
                  {showBudget && (
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="budget" className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-txt-secondary">
                          {t("form.budget")}
                        </label>
                        <div className="relative">
                          <select id="budget" name="budget" className={`${inputClass} appearance-none pr-10 cursor-pointer`}>
                            <option value="">{t("form.budgetPlaceholder")}</option>
                            {BUDGET_KEYS.map((key) => (
                              <option key={key} value={key}>{t(`form.budgets.${key}`)}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyber-cyan" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="timeline" className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-txt-secondary">
                          {t("form.timeline")}
                        </label>
                        <div className="relative">
                          <select id="timeline" name="timeline" className={`${inputClass} appearance-none pr-10 cursor-pointer`}>
                            <option value="">{t("form.timelinePlaceholder")}</option>
                            {TIMELINE_KEYS.map((key) => (
                              <option key={key} value={key}>{t(`form.timelines.${key}`)}</option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cyber-cyan" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-txt-secondary">
                      {t("form.message")}
                    </label>
                    <textarea id="message" name="message" rows={4} required className={`${inputClass} resize-none`} placeholder={t("form.messagePlaceholder")} />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-cyber-danger">{t("form.error")}</p>
                  )}

                  <Button type="submit" disabled={status === "loading"} className="w-full">
                    {status === "loading" ? t("form.sending") : t("form.submit")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </GlowCard>
          </FadeIn>

          {/* Sidebar */}
          <FadeIn>
            <GlowCard className="p-8">
              <h3 className="font-mono text-sm uppercase tracking-[0.18em] text-cyber-cyan">
                {t("info.emailLabel")}
              </h3>
              <ul className="mt-6 space-y-5">
                <li>
                  <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-sm text-txt-secondary transition-colors hover:text-cyber-cyan">
                    <Mail className="h-5 w-5 shrink-0 text-cyber-cyan" />
                    {t("info.email")}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-txt-secondary">
                  <MapPin className="h-5 w-5 shrink-0 text-cyber-cyan" />
                  {t("info.location")}
                </li>
                <li>
                  <a href={t("info.githubUrl")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-txt-secondary transition-colors hover:text-cyber-cyan">
                    <Github className="h-5 w-5 shrink-0 text-cyber-cyan" />
                    {t("info.github")}
                  </a>
                </li>
                <li>
                  <a href={t("info.linkedinUrl")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-txt-secondary transition-colors hover:text-cyber-cyan">
                    <Linkedin className="h-5 w-5 shrink-0 text-cyber-cyan" />
                    LinkedIn
                  </a>
                </li>
              </ul>
              <div className="mt-8 border-t border-white/[0.06] pt-6">
                <p className="text-sm text-txt-secondary">
                  {t("info.briefDescription")}
                </p>
                <Link href="/brief" className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-cyber-cyan transition-colors hover:text-cyber-cyan/70">
                  {t("info.briefLink")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </GlowCard>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
