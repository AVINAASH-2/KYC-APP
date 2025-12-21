"use client";

import { createContext, useContext } from "react";

export type LanguageContextType = {
  language: string;
  setLanguage: (_lang: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "English",
  setLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);
