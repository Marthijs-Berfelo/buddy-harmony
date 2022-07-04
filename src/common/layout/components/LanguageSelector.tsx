import { useTranslation } from 'react-i18next';
import ReactFlagsSelect from 'react-flags-select';
import React, { useEffect, useState } from 'react';
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

const useLanguage = (): LanguageHook => {
  const { i18n } = useTranslation();
  const [browserLanguage, setBrowserLanguage] = useState<string>(i18n.language);
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    localStorage.getItem('i18nextLng') || defaultLanguage
  );

  useEffect(() => {
    setBrowserLanguage(i18n.language);
    setLanguages(i18n.languages.filter((value) => !value.includes('-')));
    setSelectedLanguage(i18n.language.split('-')[1]);

    return () => {
      i18n.changeLanguage(browserLanguage).then();
      setSelectedLanguage(browserLanguage.split('-')[1]);
    };
  }, []);

  useEffect(() => {
    if (!i18n.language.endsWith(selectedLanguage)) {
      i18n.changeLanguage(languageCode(selectedLanguage)).then();
    }
  }, [selectedLanguage]);

  const onSelectLanguage = (lang: string) => {
    setSelectedLanguage(lang);
  };

  const languageCode = (lang: string): string => {
    const codes = Object.entries(languageLabels)
      .filter((label) => label[0] === lang)
      .map((label) => `${label[1].toString()}-${label[0]}`);
    if (codes.length > 0) {
      return codes[0];
    }
    return defaultLanguageCode;
  };

  return {
    selectedLanguage,
    onSelectLanguage,
    languageLabels,
    countries: Object.entries(languageLabels)
      .filter((label) => languages.includes(label[1].toString()))
      .map((label) => label[0]),
  };
};
