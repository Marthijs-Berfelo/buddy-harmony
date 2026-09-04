import type { JSX } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useLanguage } from './use-language';

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
