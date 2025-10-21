"use client";

import { useSyncExternalStore } from "react";
import i18n from "./i18n";

type TranslationKey = string;

const subscribe = (listener: () => void) => {
  i18n.on("languageChanged", listener);
  return () => {
    i18n.off("languageChanged", listener);
  };
};

export const useTranslation = () => {
  const language = useSyncExternalStore(
    subscribe,
    () => i18n.language,
    () => i18n.language,
  );

  const t = (key: TranslationKey) => i18n.t(key) as string;

  return { t, i18n, language };
};
