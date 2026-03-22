"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { fadeInUp, VIEWPORT_CONFIG } from "@/lib/animations";

interface SectionHeaderWithNsProps {
  ns: string;
  centered?: boolean;
  className?: string;
  as?: "h1" | "h2";
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
  as?: "h1" | "h2";
}

type SectionHeaderProps = SectionHeaderWithNsProps | SectionHeaderWithPropsProps;

export function SectionHeader(props: SectionHeaderProps) {
  const { centered = true, className, as: Heading = "h2" } = props;
  const t = useTranslations(props.ns || "common");

  const label = props.ns ? t("label") : props.label;
  const title = props.ns ? t("title") : props.title;
  const description = props.ns
    ? (t.has("description") ? t("description") : undefined)
    : props.description;

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={cn("mb-16", centered && "text-center", className)}
    >
      {label && (
        <span className="mb-4 inline-block font-mono text-xs uppercase tracking-widest text-accent">
          {"// "}{label}
        </span>
      )}
      <Heading className="text-h2 font-bold text-text-primary lg:text-h1">
        {title}
      </Heading>
      {description && (
        <p className="mt-4 max-w-2xl text-body-lg text-text-secondary lg:mt-6 mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
