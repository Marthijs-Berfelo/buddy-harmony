import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createElement, PropsWithChildren } from 'react';
import { CagedContent } from '../caged-content';
import { CagedProvider, useCaged } from '../../hooks';
import { computeGuitarTypes, SettingsProvider, useSettings } from 'hooks';
import { CAGED_COLORS } from '../../hooks/caged-constants';
import { TooltipProvider } from '@/components/ui/tooltip';

i18n.init({
  resources: {
    en: {
      caged: {
        positioned_selected: 'Positioned {{key}}',
        'view-chord': 'Chord',
        'view-scale': 'Scale',
        'legend-shape-label': '{{letter}} shape',
        'legend-triad-label': 'Show triad emphasis',
        'legend-symbol-triad': 'Triad tone',
        'legend-symbol-scale': 'Scale tone',
        'scale-view-disabled-tooltip': 'Scale view needs standard 6-string guitar tuning',
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
  const { setSelectedKey, chords, chord, setChord, cagedOrder } = useCaged();
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

  test('defaults to Scale/overlay view with the legend and scale selector visible', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    expect(document.getElementById('caged-legend')).toBeInTheDocument();
    expect(document.getElementById('caged-scale-view')).toBeInTheDocument();
    expect(document.getElementById('caged-chord-view')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /major/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scale' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Chord' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('switches to Chord/rows view and renders one simplified row per letter', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    await act(async () => screen.getByRole('button', { name: 'Chord' }).click());

    expect(document.getElementById('caged-chord-view')).toBeInTheDocument();
    expect(document.getElementById('caged-scale-view')).not.toBeInTheDocument();
    expect(document.getElementById('caged-legend')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Chord' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Scale' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );

    (['C', 'A', 'G', 'E', 'D'] as const).forEach((letter) => {
      const row = document.getElementById(`caged-${letter}`);
      expect(row).toBeInTheDocument();
      expect(row).toHaveClass(...CAGED_COLORS[letter].border.split(' '));
      expect(document.getElementById(`caged-step-${letter}`)).not.toBeInTheDocument();
      expect(document.getElementById(`caged-open-${letter}`)).not.toBeInTheDocument();
      expect(document.getElementById(`caged-chord-${letter}`)).toBeInTheDocument();
    });
  });

  test('toggling a legend chip hides that shape from the overlay but not from Chord/rows view', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    await act(async () => screen.getByRole('button', { name: 'G shape' }).click());
    await act(async () => screen.getByRole('button', { name: 'Chord' }).click());

    expect(document.getElementById('caged-G')).toBeInTheDocument();
  });

  test('renders rows in cagedOrder order in Chord view', async () => {
    renderCagedContent('F');
    await selectKeyAndChord();

    await act(async () => screen.getByRole('button', { name: 'Chord' }).click());

    const expectedOrder = screen.getByTestId('caged-order').textContent?.split(',');
    const renderedOrder = Array.from(
      document.querySelectorAll('#caged-chord-view > [id^="caged-"]')
    ).map((el) => el.id.replace('caged-', ''));

    expect(renderedOrder).toEqual(expectedOrder);
    expect(renderedOrder).not.toEqual(['C', 'A', 'G', 'E', 'D']);
  });

  test('disables the Scale view button and falls back to Chord view when tuning becomes non-standard', async () => {
    renderCagedContent();
    await selectKeyAndChord();
    expect(document.getElementById('caged-scale-view')).toBeInTheDocument();

    await act(async () => screen.getByText('switch-to-ukulele').click());

    expect(screen.getByRole('button', { name: 'Scale' })).toBeDisabled();
    expect(document.getElementById('caged-chord-view')).toBeInTheDocument();
    expect(document.getElementById('caged-scale-view')).not.toBeInTheDocument();
  });
});
