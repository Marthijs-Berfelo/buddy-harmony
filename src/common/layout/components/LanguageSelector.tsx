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
    // Mount/unmount only — deliberately omits `i18n` and `browserLanguage`.
    //
    // react-i18next's useTranslation() returns a NEW `i18n` wrapper object every time
    // the resolved language changes (see node_modules/react-i18next/src/useTranslation.js,
    // "language changed -> create fresh wrapper so identity changes"). This effect's own
    // cleanup calls i18n.changeLanguage(...), which changes the resolved language, which
    // gives us a new `i18n` reference on the next render. If `i18n` were a dependency here,
    // that identity change would re-trigger this effect's cleanup + body on every render,
    // an oscillation that never reaches a fixed point (confirmed via console logging:
    // browserLanguage flips between 'nl' and 'en' indefinitely) until React throws
    // "Maximum update depth exceeded". Likewise, `browserLanguage` is written by this
    // effect's own body, so depending on it directly self-triggers the same loop.
    // All of `i18n`'s methods (changeLanguage, .language, .resolvedLanguage) are valid on
    // every wrapper instance regardless of identity, so this effect never actually needs
    // to re-run when `i18n`'s identity changes — only on mount/unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!i18n.language.toUpperCase().endsWith(selectedLanguage)) {
      i18n.changeLanguage(languageCode(selectedLanguage)).catch(console.error);
    }
    // Only re-run when the user's selection changes, for the same reason as above —
    // `i18n`'s identity is language-dependent, so including it here would self-trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLanguage]);

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
