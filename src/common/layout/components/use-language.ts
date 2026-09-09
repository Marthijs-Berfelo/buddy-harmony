import { RefObject, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CustomLabels } from 'react-flags-select/build/types';

export interface LanguageHook {
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  languageLabels: CustomLabels;
  countries: string[];
  selectorRef: RefObject<HTMLDivElement | null>;
}

const languageLabels: CustomLabels = {
  US: 'en',
  GB: 'en',
  NL: 'nl',
};

const defaultLanguageCode = 'nl-NL';
const defaultLanguage = 'NL';
const languageChangeEvent = 'languageChanged';

const getInitialLanguage = (): string => {
  const stored = localStorage.getItem('i18nextLng');
  if (!stored) {
    return defaultLanguage;
  }
  return stored.includes('-') ? stored.split('-')[1].toUpperCase() : stored.toUpperCase();
};

const languageCode = (lang: string): string => {
  const codes = Object.entries(languageLabels)
    .filter((label) => label[0] === lang)
    .map((label) => `${label[1].toString()}-${label[0]}`);
  return codes.length > 0 ? codes[0] : defaultLanguageCode;
};

export const useLanguage = (): LanguageHook => {
  const { i18n } = useTranslation('common');
  const initialLang = i18n.resolvedLanguage || i18n.language;
  const browserLanguage = useRef<string>(initialLang);
  const selectorRef = useRef<HTMLDivElement>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    initialLang
      ? (initialLang.split('-')[1]?.toUpperCase() ?? defaultLanguage)
      : getInitialLanguage()
  );

  useEffect(() => {
    const handleLanguageChanged = (lang: string) => {
      browserLanguage.current = lang;
      setSelectedLanguage(lang.split('-')[1]?.toUpperCase() ?? defaultLanguage);
    };

    i18n.on(languageChangeEvent, handleLanguageChanged);

    return () => {
      i18n.off(languageChangeEvent, handleLanguageChanged);
      i18n.changeLanguage(browserLanguage.current).catch(console.error);
      setSelectedLanguage(browserLanguage.current.split('-')[1]?.toUpperCase() ?? defaultLanguage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!i18n.language.toUpperCase().endsWith(selectedLanguage)) {
      i18n.changeLanguage(languageCode(selectedLanguage)).catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

  useEffect(() => {
    const container = selectorRef.current;
    if (!container) {
      return;
    }

    /**
     * Updates ARIA labels for the language selector button and its options.
     * Uses i18n.t directly to ensure labels reflect the current language state,
     * as useTranslation's t may lag behind during async language changes.
     */
    const labelSelector = () => {
      const a11yKey = 'aria-label';
      container.querySelector('button')?.setAttribute(a11yKey, i18n.t('common:language-selector'));
      container.querySelectorAll('li[role="option"]').forEach((option) => {
        const countryCode = option.id.split('-').pop();
        if (!countryCode) {
          return;
        }
        const code = countryCode as 'US' | 'GB' | 'NL';
        option.setAttribute(a11yKey, i18n.t(`common:language-option.${code}`));
      });
    };

    labelSelector();
    i18n.on(languageChangeEvent, labelSelector);
    const observer = new MutationObserver(labelSelector);
    observer.observe(container, { childList: true, subtree: true });
    return () => {
      i18n.off(languageChangeEvent, labelSelector);
      observer.disconnect();
    };
  }, [i18n, selectedLanguage]);

  const onSelectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
  };

  return {
    selectedLanguage,
    onSelectLanguage,
    languageLabels,
    countries: Object.keys(languageLabels),
    selectorRef,
  };
};
