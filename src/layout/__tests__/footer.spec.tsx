import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Footer } from '../footer';
import { TooltipProvider } from '@/components/ui/tooltip';
import { appInfo } from 'lib/app-info';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderFooter = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <Footer />
      </TooltipProvider>
    </I18nextProvider>
  );

describe('Footer', () => {
  test('links to the source repository, issues page, and author profile', () => {
    renderFooter();

    expect(document.querySelector(`a[href="${appInfo.app.source}"]`)).toBeInTheDocument();
    expect(
      document.querySelector(`a[href="${appInfo.app.source}${appInfo.app.issuesUri}"]`)
    ).toBeInTheDocument();
    expect(document.querySelector(`a[href="${appInfo.author.profile}"]`)).toBeInTheDocument();
    expect(
      document.querySelector(`a[href="mailto:${appInfo.author.email}"]`)
    ).toBeInTheDocument();
  });

  test('renders the version text as a link to the release', () => {
    renderFooter();

    expect(screen.getByText('app-version')).toBeInTheDocument();
  });
});
