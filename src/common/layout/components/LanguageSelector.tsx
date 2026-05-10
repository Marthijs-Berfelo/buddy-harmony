import type { JSX } from 'react';
import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from 'react-flags-select';
import { useEffect, useState } from 'react';
import { CustomLabels } from 'react-flags-select/build/types';

const LanguageSelector = (): JSX.Element => {
  const { selectedLanguage, onSelectLanguage, languageLabels, countries } = useLanguage();

  return (
    <div className="flex" id={'lang-selector'}>
      <ReactFlagsSelect
        selected={selectedLanguage}
        onSelect={onSelectLanguage}
        countries={countries}
        customLabels={languageLabels}
        showOptionLabel={false}
        showSelectedLabel={false}
      />
    </div>
  );
};

export default LanguageSelector;

interface LanguageHook {
  selectedLanguage: string;
  onSelectLanguage: (lang: string) => void;
  languageLabels: CustomLabels;
  countries: string[];
}

const languageLabels: CustomLabels = {
  US: 'en',
  GB: 'en',
  NL: 'nl',
};

const defaultLanguageCode = 'nl-NL';
const defaultLanguage = 'NL';

const getInitialLanguage = (): string => {
  const stored = localStorage.getItem('i18nextLng');
  if (!stored) return defaultLanguage;
  return stored.includes('-') ? stored.split('-')[1].toUpperCase() : stored.toUpperCase();
};

const useLanguage = (): LanguageHook => {
  const { i18n } = useTranslation();
  const [browserLanguage, setBrowserLanguage] = useState<string>(i18n.language);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(getInitialLanguage());

  useEffect(() => {
    const lang = i18n.resolvedLanguage || i18n.language;
    setBrowserLanguage(lang);
    setSelectedLanguage(lang.split('-')[1]?.toUpperCase() ?? defaultLanguage);

    return () => {
      i18n.changeLanguage(browserLanguage).catch(console.error);
      setSelectedLanguage(browserLanguage.split('-')[1]?.toUpperCase() ?? defaultLanguage);
    };
  }, [i18n]);

  useEffect(() => {
    if (!i18n.language.toUpperCase().endsWith(selectedLanguage)) {
      i18n.changeLanguage(languageCode(selectedLanguage)).catch(console.error);
    }
  }, [selectedLanguage, i18n]);

  const onSelectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
  };

  const languageCode = (lang: string): string => {
    const codes = Object.entries(languageLabels)
      .filter((label) => label[0] === lang)
      .map((label) => `${label[1].toString()}-${label[0]}`);
    return codes.length > 0 ? codes[0] : defaultLanguageCode;
  };

  return {
    selectedLanguage,
    onSelectLanguage,
    languageLabels,
    countries: Object.keys(languageLabels),
  };
};
