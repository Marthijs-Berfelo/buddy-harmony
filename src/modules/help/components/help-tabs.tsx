import { Suspense, type JSX } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Markdown } from '@/components/ui/markdown';
import { useHelpMarkdown } from '@/help/hooks/help-markdown';
import { HelpSection } from '@/help/content-types';

const PAGE_SECTIONS = [HelpSection.CHORD, HelpSection.SCALE, HelpSection.CAGED] as const;

function HelpTabPanel({ section }: { section: HelpSection }): JSX.Element {
  const content = useHelpMarkdown(section);
  return (
    <TabsContent value={section}>
      <Markdown content={content} />
    </TabsContent>
  );
}

function HelpTabs(): JSX.Element {
  const { t } = useTranslation('common');

  return (
    <Tabs defaultValue={PAGE_SECTIONS[0]}>
      <TabsList>
        {PAGE_SECTIONS.map((section) => (
          <TabsTrigger key={section} value={section}>
            {t('routing.page', { context: section.toUpperCase() })}
          </TabsTrigger>
        ))}
      </TabsList>
      {PAGE_SECTIONS.map((section) => (
        <Suspense key={section} fallback={null}>
          <HelpTabPanel section={section} />
        </Suspense>
      ))}
    </Tabs>
  );
}

export { HelpTabs };
