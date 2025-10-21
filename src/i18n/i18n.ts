import i18n from "i18next";
import enCommon from "./locales/en/common.json";
import thCommon from "./locales/th/common.json";

const resources = {
  en: { common: enCommon },
  th: { common: thCommon },
} as const;

const detectInitialLanguage = (): string => {
  if (typeof window === "undefined") {
    return "en";
  }

  const stored = window.localStorage.getItem("i18nLng");
  return stored && resources[stored as keyof typeof resources] ? stored : "en";
};

if (!i18n.isInitialized) {
  i18n.init({
    resources,
    lng: detectInitialLanguage(),
    fallbackLng: "en",
    defaultNS: "common",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
