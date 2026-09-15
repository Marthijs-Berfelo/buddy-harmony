import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { ScalePage } from '../scale-page';
import { SettingsProvider } from 'hooks';
import { TooltipProvider } from '@/components/ui/tooltip';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderScalePage = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <SettingsProvider>
          <ScalePage />
        </SettingsProvider>
      </TooltipProvider>
    </I18nextProvider>
  );

describe('ScalePage', () => {
  test('renders the scale page container with its tool bar and content', () => {
    renderScalePage();

    expect(document.getElementById('scale-page')).toBeInTheDocument();
    expect(document.getElementById('scale-content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'button-label' })).toBeInTheDocument();
  });
});
