import { defineRouting } from "next-intl/routing";

export const locales = [
  "en",
  "fr",
  "es",
  "pt-BR",
  "de",
  "ja",
  "zh-CN",
  "ko",
  "hi",
  "ar",
] as const;

export type Locale = (typeof locales)[number];

export const RTL_LOCALES: Locale[] = ["ar"];

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
});
