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
        open: 'Open',
        positioned_selected: 'Positioned {{key}}',
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

describe('CagedContent', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders translated labels, unique ids, and matching colors for every CAGED letter', async () => {
    renderCagedContent();

    await act(async () => screen.getByText('select-key').click());
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(3000));

    await act(async () => screen.getByText('select-chord').click());

    expect(screen.getAllByText('Open')).toHaveLength(1);
    expect(screen.getAllByText('Positioned C')).toHaveLength(1);
    expect(document.getElementById('caged-column-headers')).toBeInTheDocument();

    (['C', 'A', 'G', 'E', 'D'] as const).forEach((letter) => {
      expect(document.getElementById(`caged-${letter}`)).toBeInTheDocument();
      expect(document.getElementById(`caged-step-${letter}`)).toBeInTheDocument();
      expect(document.getElementById(`caged-open-${letter}`)).toBeInTheDocument();
      expect(document.getElementById(`caged-chord-${letter}`)).toBeInTheDocument();

      const label = document.getElementById(`caged-step-${letter}`)?.querySelector('p');
      expect(label).toHaveClass(...CAGED_COLORS[letter].text.split(' '));
      expect(label).toHaveTextContent(letter);
    });
  });

  test('renders rows in cagedOrder order', async () => {
    renderCagedContent('F');

    await act(async () => screen.getByText('select-key').click());
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(3000));

    await act(async () => screen.getByText('select-chord').click());

    const expectedOrder = screen.getByTestId('caged-order').textContent?.split(',');
    const renderedOrder = screen
      .getAllByText(/^[CAGED]$/)
      .map((el) => el.textContent)
      .filter((text): text is string => !!text);

    expect(renderedOrder).toEqual(expectedOrder);
    expect(renderedOrder).not.toEqual(['C', 'A', 'G', 'E', 'D']);
  });
});
