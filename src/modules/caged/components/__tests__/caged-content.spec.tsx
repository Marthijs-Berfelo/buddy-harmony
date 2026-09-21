import { act, render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createElement, PropsWithChildren } from 'react';
import { CagedContent } from '../caged-content';
import { CagedProvider, useCaged } from '../../hooks';
import { computeGuitarTypes, SettingsProvider } from 'hooks';
import { CAGED_COLORS } from '../../hooks/caged-constants';

i18n.init({
  resources: {
    en: {
      caged: {
        positioned_selected: 'Positioned {{key}}',
        'view-chord': 'Chord',
        'view-scale': 'Scale',
        'legend-shape-label': '{{letter}} chord',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const Selector = ({ selectKey }: { selectKey: string }) => {
  const { setSelectedKey, chords, chord, setChord, cagedOrder } = useCaged();

  return (
    <div>
      <button onClick={() => setSelectedKey(selectKey)}>select-key</button>
      {chords.length > 0 && !chord && (
        <button onClick={() => setChord(chords[0])}>select-chord</button>
      )}
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
        SettingsProvider,
        null,
        createElement(CagedProvider, null, createElement(Selector, { selectKey }), children)
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

  test('defaults to Scale/overlay view with the legend visible', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    expect(document.getElementById('caged-legend')).toBeInTheDocument();
    expect(document.getElementById('caged-scale-view')).toBeInTheDocument();
    expect(document.getElementById('caged-chord-view')).not.toBeInTheDocument();
  });

  test('switches to Chord/rows view and renders one simplified row per letter', async () => {
    renderCagedContent();
    await selectKeyAndChord();

    expect(screen.getByRole('button', { name: 'Chord' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(screen.getByRole('button', { name: 'Scale' })).toHaveAttribute('aria-pressed', 'true');

    await act(async () => screen.getByRole('button', { name: 'Chord' }).click());

    expect(screen.getByRole('button', { name: 'Chord' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Scale' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(document.getElementById('caged-chord-view')).toBeInTheDocument();
    expect(document.getElementById('caged-scale-view')).not.toBeInTheDocument();
    expect(document.getElementById('caged-legend')).toBeInTheDocument();

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

    const [strokeClass, fillClass] = CAGED_COLORS.G.caged.split(' ');
    expect(
      document.querySelector(`#caged-scale-view circle.${strokeClass}.${fillClass}`)
    ).toBeInTheDocument();

    await act(async () => screen.getByRole('button', { name: 'G chord' }).click());

    expect(
      document.querySelector(`#caged-scale-view circle.${strokeClass}.${fillClass}`)
    ).not.toBeInTheDocument();

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
});
