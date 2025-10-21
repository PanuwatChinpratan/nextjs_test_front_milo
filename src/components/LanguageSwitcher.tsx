"use client";

import { Select } from "antd";
import type { SelectProps } from "antd";
import { useCallback, useMemo } from "react";
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
