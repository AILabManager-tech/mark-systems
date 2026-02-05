"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface SectionHeaderWithNsProps {
  ns: string;
  centered?: boolean;
  className?: string;
  label?: never;
  title?: never;
  description?: never;
}

interface SectionHeaderWithPropsProps {
  ns?: never;
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

type SectionHeaderProps = SectionHeaderWithNsProps | SectionHeaderWithPropsProps;

export function SectionHeader(props: SectionHeaderProps) {
  const { centered = true, className } = props;
  const t = useTranslations(props.ns || "common");

  const label = props.ns ? t("label") : props.label;
  const title = props.ns ? t("title") : props.title;
  const description = props.ns
    ? (t.has("description") ? t("description") : undefined)
    : props.description;

  return (
    <div className={cn("mb-16", centered && "text-center", className)}>
      {label && (
        <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-accent">
          {label}
        </span>
      )}
      <h2 className="text-h2 font-bold text-text-primary lg:text-h1">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-body-lg text-text-secondary lg:mt-6 mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
