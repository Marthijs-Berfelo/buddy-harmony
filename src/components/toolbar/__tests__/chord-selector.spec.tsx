import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { ChordSelector } from '../chord-selector';
import { computeGuitarTypes, SettingsProvider } from 'hooks';
import type { ChordDetail } from 'hooks';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderChordSelector = (chords: ChordDetail[]) =>
  render(
    <I18nextProvider i18n={i18n}>
      <SettingsProvider>
        <ChordSelector chords={chords} setChord={() => {}} />
      </SettingsProvider>
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

    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

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

    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const trigger = screen.getByRole('button', { name: 'title' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(screen.queryByTestId('note-wave-glyph')).not.toBeInTheDocument();
  });

  test('uses the provided labelKey instead of the default chord:title key', async () => {
    render(
      <I18nextProvider i18n={i18n}>
        <SettingsProvider>
          <ChordSelector
            chords={[
              { key: 'C', suffix: 'major', positions: [] },
              { key: 'C', suffix: 'minor', positions: [] },
            ]}
            setChord={() => {}}
            labelKey="caged:type-title"
          />
        </SettingsProvider>
      </I18nextProvider>
    );

    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const trigger = screen.getByRole('button', { name: 'type-title' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  });
});
