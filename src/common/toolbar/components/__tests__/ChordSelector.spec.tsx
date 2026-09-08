import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import ChordSelector from '../ChordSelector';
import { SettingsContextProvider } from '@/hooks';
import type { ChordDetail } from '@/hooks';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderChordSelector = (chords: ChordDetail[]) =>
  render(
    <I18nextProvider i18n={i18n}>
      <SettingsContextProvider>
        <ChordSelector chords={chords} setChord={() => {}} />
      </SettingsContextProvider>
    </I18nextProvider>
  );

describe('ChordSelector', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('shows the note-wave loader while chord data is loading', () => {
    renderChordSelector([]);

    expect(screen.getAllByTestId('note-wave-glyph')).toHaveLength(3);
  });

  test('shows the disabled placeholder once chord data has resolved with fewer than two chords', async () => {
    renderChordSelector([]);

    await act(() => vi.advanceTimersByTimeAsync(3000));

    expect(screen.queryByTestId('note-wave-glyph')).not.toBeInTheDocument();
    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
    expect(trigger).not.toHaveAttribute('aria-haspopup');
  });

  test('shows the chord dropdown once chord data has resolved with two or more chords', async () => {
    renderChordSelector([
      { key: 'C', suffix: 'major', positions: [] },
      { key: 'C', suffix: 'minor', positions: [] },
    ]);

    await act(() => vi.advanceTimersByTimeAsync(3000));

    const trigger = screen.getByRole('button', { name: 'title' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.queryByTestId('note-wave-glyph')).not.toBeInTheDocument();
  });
});
