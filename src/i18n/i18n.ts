import i18n from "i18next";
import enCommon from "./locales/en/common.json";
import thCommon from "./locales/th/common.json";

const resources = {
  en: { common: enCommon },
  th: { common: thCommon },
} as const;

if (!i18n.isInitialized) {
  i18n.init({
    resources,
    lng: "en",
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;

export const readStoredLanguage = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem("i18nLng");
  return stored && stored in resources ? stored : null;
};
