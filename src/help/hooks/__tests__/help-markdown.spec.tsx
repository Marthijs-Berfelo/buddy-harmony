import { renderHook } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { PropsWithChildren } from 'react';
import { useHelpMarkdown } from '../help-markdown';
import { HelpSection } from '@/help/content-types';

i18n.init({
  resources: {
    en: {
      'help-chord': { content: '# Chord help\n\nBody.' },
      'help-scale': { content: '# Scale help' },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const wrapper = ({ children }: PropsWithChildren) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('useHelpMarkdown', () => {
  test('resolves HelpSection.CHORD to the help-chord namespace content', () => {
    const { result } = renderHook(() => useHelpMarkdown(HelpSection.CHORD), { wrapper });

    expect(result.current).toBe('# Chord help\n\nBody.');
  });

  test('resolves HelpSection.SCALE to the help-scale namespace content', () => {
    const { result } = renderHook(() => useHelpMarkdown(HelpSection.SCALE), { wrapper });

    expect(result.current).toBe('# Scale help');
  });
});
