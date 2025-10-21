"use client";

import { Select } from "antd";
import type { SelectProps } from "antd";
import { useCallback, useEffect, useMemo } from "react";
import { readStoredLanguage } from "@/i18n/i18n";
import { useTranslation } from "@/i18n/useTranslation";

type LanguageOption = "en" | "th";

const languageOptions: NonNullable<SelectProps<LanguageOption>["options"]> = [
  { label: "EN", value: "en" },
  { label: "TH", value: "th" },
];

const LanguageSwitcher = () => {
  const { i18n, language } = useTranslation();
  const currentLanguage = useMemo<LanguageOption>(
    () => (language === "th" ? "th" : "en"),
    [language],
  );
  useEffect(() => {
    const stored = readStoredLanguage();
    if (
      stored &&
      (stored === "en" || stored === "th") &&
      stored !== i18n.language
    ) {
      void i18n.changeLanguage(stored);
    }
  }, [i18n]);
  const handleChange = useCallback(
    async (value: LanguageOption) => {
      await i18n.changeLanguage(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem("i18nLng", value);
      }
    },
    [i18n],
  );

  return (
    <Select<LanguageOption>
      value={currentLanguage}
      onChange={handleChange}
      options={languageOptions}
      style={{ width: 120 }}
    />
  );
};

export default LanguageSwitcher;
