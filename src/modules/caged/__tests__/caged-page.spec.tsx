import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { CagedPage } from '../caged-page';
import { SettingsProvider } from 'hooks';
import { TooltipProvider } from '@/components/ui/tooltip';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderCagedPage = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <SettingsProvider>
          <CagedPage />
        </SettingsProvider>
      </TooltipProvider>
    </I18nextProvider>
  );

describe('CagedPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders the caged page container with its tool bar and content', async () => {
    renderCagedPage();

    expect(document.getElementById('caged-page')).toBeInTheDocument();
    expect(document.getElementById('caged-content')).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(3000));

    expect(screen.getByRole('button', { name: 'button-label' })).toBeInTheDocument();
  });
});
