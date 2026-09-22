import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createElement, PropsWithChildren } from 'react';
import { CagedContent } from '../caged-content';
import { CagedProvider, useCaged } from '../../hooks';
import { computeGuitarTypes, SettingsProvider, useSettings } from 'hooks';
import { TooltipProvider } from '@/components/ui/tooltip';

i18n.init({
  resources: {
    en: {
      caged: {
        positioned_selected: 'Positioned {{key}}',
        chord_selected: 'Chord {{key}}',
        'legend-title': 'Legend',
        'legend-shape-label': '{{letter}} shape',
        'legend-triad-label': 'Show triads',
        'legend-symbol-triad': 'Triad',
        'legend-symbol-scale': 'Scale tone',
      },
      scale: {
        title: 'Scale',
        title_selected: 'Scale: {{scale}}',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const Selector = ({ selectKey }: { selectKey: string }) => {
  const { setSelectedKey, chords, chord, setChord, cagedOrder, viewMode, setViewMode } =
    useCaged();
  const { setGuitarType, guitarTypes } = useSettings();

  return (
    <div>
      <button onClick={() => setSelectedKey(selectKey)}>select-key</button>
      {chords.length > 0 && !chord && (
        <button onClick={() => setChord(chords[0])}>select-chord</button>
      )}
      <button
        onClick={() => setGuitarType(guitarTypes.find((type) => type.name === 'ukulele')!)}
      >
        switch-to-ukulele
      </button>
      <button onClick={() => setViewMode(viewMode === 'chord' ? 'scale' : 'chord')}>
        toggle-view
      </button>
      <div data-testid="caged-order">{cagedOrder?.join(',')}</div>
    </div>
  );
};

const wrapperFor = (selectKey: string) =>
  function Wrapper({ children }: PropsWithChildren) {
    return createElement(
      I18nextProvider,
      { i18n },
      createElement(
        TooltipProvider,
        null,
        createElement(
          SettingsProvider,
          null,
          createElement(CagedProvider, null, createElement(Selector, { selectKey }), children)
        )
      )
    );
  };

const renderCagedContent = (selectKey = 'C') =>
  render(createElement(CagedContent), { wrapper: wrapperFor(selectKey) });

const selectKeyAndChord = async () => {
  await act(async () => screen.getByText('select-key').click());
  await computeGuitarTypes();
  await act(() => vi.advanceTimersByTimeAsync(4000));
  await act(async () => screen.getByText('select-chord').click());
};

describe('CagedContent', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('defaults to Scale/overlay view with the legend visible and no header', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    expect(document.getElementById('caged-legend')).toBeInTheDocument();
    expect(document.getElementById('caged-scale-view')).toBeInTheDocument();
    expect(document.getElementById('caged-chord-view')).not.toBeInTheDocument();
    expect(screen.queryByText('Positioned C')).not.toBeInTheDocument();
  });

  test('switches to Chord/rows view, shows a header, and renders one row per letter with no colored border', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    await act(async () => screen.getByText('toggle-view').click());

    expect(document.getElementById('caged-chord-view')).toBeInTheDocument();
    expect(document.getElementById('caged-scale-view')).not.toBeInTheDocument();
    expect(document.getElementById('caged-legend')).toBeInTheDocument();
    expect(screen.getByText('Chord C')).toBeInTheDocument();

    (['C', 'A', 'G', 'E', 'D'] as const).forEach((letter) => {
      const row = document.getElementById(`caged-${letter}`);
      expect(row).toBeInTheDocument();
      expect(row?.className).not.toMatch(/border-l-4/);
      expect(document.getElementById(`caged-chord-${letter}`)).toBeInTheDocument();
    });
  });

  test('disables the legend shape chips in Chord view but not in Scale view', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    expect(screen.getByRole('button', { name: 'G shape' })).not.toBeDisabled();

    await act(async () => screen.getByText('toggle-view').click());

    expect(screen.getByRole('button', { name: 'G shape' })).toBeDisabled();
  });

  test('toggling a legend chip hides that shape from the overlay but not from Chord/rows view', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    await act(async () => screen.getByRole('button', { name: 'G shape' }).click());
    await act(async () => screen.getByText('toggle-view').click());

    expect(document.getElementById('caged-G')).toBeInTheDocument();
  });

  test('renders rows in cagedOrder order in Chord view', async () => {
    renderCagedContent('F');
    await selectKeyAndChord();

    await act(async () => screen.getByText('toggle-view').click());

    const expectedOrder = screen.getByTestId('caged-order').textContent?.split(',');
    const renderedOrder = Array.from(
      document.querySelectorAll('#caged-chord-view > [id^="caged-"]')
    ).map((el) => el.id.replace('caged-', ''));

    expect(renderedOrder).toEqual(expectedOrder);
    expect(renderedOrder).not.toEqual(['C', 'A', 'G', 'E', 'D']);
  });
});
