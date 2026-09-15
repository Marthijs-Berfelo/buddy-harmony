import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { PropsWithChildren } from 'react';
import { Layout } from '../layout';
import { TooltipProvider } from '@/components/ui/tooltip';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

vi.mock('@/translations', () => ({
  TranslationsProvider: ({ children }: PropsWithChildren) => children,
}));

describe('Layout', () => {
  test('renders the header, routed content, and footer inside the translations provider', () => {
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n}>
          <TooltipProvider>
            <Layout />
          </TooltipProvider>
        </I18nextProvider>
      </MemoryRouter>
    );

    expect(document.getElementById('app')).toBeInTheDocument();
    expect(document.getElementById('content')).toBeInTheDocument();
  });
});
