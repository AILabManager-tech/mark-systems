import type { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import fr from "../messages/fr.json";

/**
 * Rend un composant client enveloppé du provider next-intl (messages FR réels),
 * comme en production. Permet de tester les composants qui appellent
 * useTranslations sans mocker chaque clé à la main.
 */
export function renderWithIntl(ui: ReactElement, locale = "fr") {
  return render(
    <NextIntlClientProvider locale={locale} messages={fr}>
      {ui}
    </NextIntlClientProvider>,
  );
}

export function IntlWrapper({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider locale="fr" messages={fr}>
      {children}
    </NextIntlClientProvider>
  );
}
