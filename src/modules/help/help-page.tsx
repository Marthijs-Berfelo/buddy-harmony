import type { JSX } from 'react';
import { Markdown } from '@/components/ui/markdown';
import { useHelpMarkdown } from '@/help/hooks/help-markdown';
import { HelpSection } from '@/help/content-types';
import { HelpTabs } from './components/help-tabs';

export const HelpPage = (): JSX.Element => {
  const generalContent = useHelpMarkdown(HelpSection.GENERAL);
  const commonContent = useHelpMarkdown(HelpSection.COMMON);

  return (
    <div className="page flex flex-col gap-6 pb-20 md:px-96" id="help-page">
      <Markdown content={generalContent} />
      <Markdown content={commonContent} />
      <HelpTabs />
    </div>
  );
};
