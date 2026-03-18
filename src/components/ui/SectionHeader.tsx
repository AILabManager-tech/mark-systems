"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/animations";

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
    <motion.div
      variants={fadeInUp}
      initial="visible"
      animate="visible"
      className={cn("mb-12", centered && "text-center", className)}
    >
      {label && (
        <span className="eyebrow-tag mb-5">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {label}
        </span>
      )}
      <h2 className="mx-auto max-w-4xl text-h2 font-bold leading-[0.92] text-text-primary lg:text-h1">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-5 max-w-2xl text-body-lg leading-relaxed text-text-secondary lg:mt-6">
          {description}
        </p>
      )}
    </motion.div>
  );
}
