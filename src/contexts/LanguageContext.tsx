import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import en from "@/locales/en.json";
import fr from "@/locales/fr.json";

type Lang = "en" | "fr";
type Translations = Record<string, string>;

const translations: Record<Lang, Translations> = { en, fr };

const STORAGE_KEY = "app_language";

const detectLanguage = (): Lang => {
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "en" || stored === "fr") return stored;
  return navigator.language.startsWith("fr") ? "fr" : "en";
};

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(detectLanguage);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEY, newLang);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const t = useCallback((key: string): string => {
    return translations[lang][key] || translations["en"][key] || key;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useTranslation must be used within LanguageProvider");
  return ctx;
};
