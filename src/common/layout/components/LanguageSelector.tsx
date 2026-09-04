import type { JSX } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useLanguage } from './use-language';

const LanguageSelector = (): JSX.Element => {
  const { t } = useTranslation();
  const { selectedLanguage, onSelectLanguage, languageLabels, countries } = useLanguage();
  const selectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    selectorRef.current
      ?.querySelector('button')
      ?.setAttribute('aria-label', t('common:language-selector'));
  }, [selectedLanguage, t]);

  return (
    <div className="flex" id={'lang-selector'} ref={selectorRef}>
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
