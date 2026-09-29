import { useTranslation } from 'react-i18next';
import { HelpSection } from '@/help/content-types';

function useHelpMarkdown(section: HelpSection): string {
  const { t } = useTranslation(`help-${section}`);
  return t('content');
}

export { useHelpMarkdown };
