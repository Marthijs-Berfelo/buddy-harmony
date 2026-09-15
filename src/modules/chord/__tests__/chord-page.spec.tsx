import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { ChordPage } from '../chord-page';
import { SettingsProvider } from 'hooks';
import { TooltipProvider } from '@/components/ui/tooltip';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderChordPage = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <TooltipProvider>
        <SettingsProvider>
          <ChordPage />
        </SettingsProvider>
      </TooltipProvider>
    </I18nextProvider>
  );

describe('ChordPage', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders the chord page container with its tool bar and content', async () => {
    renderChordPage();

    expect(document.getElementById('chord-page')).toBeInTheDocument();
    expect(document.getElementById('chord-content')).toBeInTheDocument();

    await act(() => vi.advanceTimersByTimeAsync(3000));

    expect(screen.getByRole('button', { name: 'button-label' })).toBeInTheDocument();
  });
});
