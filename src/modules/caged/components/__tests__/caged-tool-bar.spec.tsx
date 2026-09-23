import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createElement, PropsWithChildren } from 'react';
import { CagedToolBar } from '../caged-tool-bar';
import { CagedProvider, useCaged } from '../../hooks';
import { computeGuitarTypes, SettingsProvider, useSettings } from 'hooks';
import { TooltipProvider } from '@/components/ui/tooltip';

i18n.init({
  resources: {
    en: {
      caged: {
        'view-toggle-label_chord': 'Scale',
        'view-toggle-label_scale': 'Chord',
        'scale-view-disabled-tooltip': 'Scale view needs standard 6-string guitar tuning',
        'type-title': 'Select Type',
        'type-title_selected': 'Type: {{chord.suffix}}',
      },
      scale: {
        title: 'Scale',
        title_selected: 'Scale: {{scale}}',
        none: 'None',
      },
      settings: {},
      common: {},
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const Selector = ({ selectKey }: { selectKey: string }) => {
  const { setSelectedKey, chords, chord, setChord } = useCaged();
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

const renderCagedToolBar = (selectKey = 'C') =>
  render(createElement(CagedToolBar), { wrapper: wrapperFor(selectKey) });

const selectKeyAndChord = async () => {
  await act(async () => screen.getByText('select-key').click());
  await computeGuitarTypes();
  await act(() => vi.advanceTimersByTimeAsync(4000));
  await act(async () => screen.getByText('select-chord').click());
};

describe('CagedToolBar', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders a single Chord/Scale toggle button before the Key and Chord selectors', () => {
    renderCagedToolBar();

    expect(screen.getByRole('button', { name: 'Chord' })).toBeInTheDocument();
    const scaleButtons = screen.getAllByRole('button', { name: 'Scale' });
    expect(scaleButtons).toHaveLength(1);
  });

  test('defaults to Scale view active, showing a button labeled with the other view, and flips the label on click', async () => {
    renderCagedToolBar();

    expect(screen.getByRole('button', { name: 'Chord' })).toBeInTheDocument();

    await act(async () => screen.getByRole('button', { name: 'Chord' }).click());

    expect(screen.queryByRole('button', { name: 'Chord' })).not.toBeInTheDocument();
    const scaleButtons = screen.getAllByRole('button', { name: 'Scale' });
    expect(scaleButtons.some((button) => !button.hasAttribute('disabled'))).toBe(true);
  });

  test('renders a ScaleSelector once a chord is selected, with no scale auto-selected', async () => {
    renderCagedToolBar();
    await selectKeyAndChord();

    expect(screen.getByRole('button', { name: 'Scale' })).toBeInTheDocument();
  });

  test('lists the real scale shortlist for the selected chord and updates the trigger on selection', async () => {
    renderCagedToolBar();
    await selectKeyAndChord();
    vi.useRealTimers();
    const user = userEvent.setup();

    const trigger = screen.getByRole('button', { name: 'Scale' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');

    await user.click(trigger);

    expect(screen.getByRole('menuitem', { name: 'major' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'major pentatonic' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'lydian' })).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'lydian' }));

    expect(screen.getByRole('button', { name: 'Scale: lydian' })).toBeInTheDocument();
  });

  test('lists a "None" menu item and clicking it clears scaleName back to the placeholder', async () => {
    renderCagedToolBar();
    await selectKeyAndChord();
    vi.useRealTimers();
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: 'Scale' }));
    await user.click(screen.getByRole('menuitem', { name: 'lydian' }));

    const trigger = screen.getByRole('button', { name: 'Scale: lydian' });
    await user.click(trigger);

    expect(screen.getByRole('menuitem', { name: 'None' })).toBeInTheDocument();
    await user.click(screen.getByRole('menuitem', { name: 'None' }));

    expect(screen.getByRole('button', { name: 'Scale' })).toBeInTheDocument();
  });

  test('disables the toggle button when it would switch to the disallowed Scale view under non-standard tuning', async () => {
    renderCagedToolBar();
    await selectKeyAndChord();

    await act(async () => screen.getByText('switch-to-ukulele').click());

    // "Scale" is now ambiguous between the view toggle and the (undefined-scale)
    // ScaleSelector placeholder, so single out the toggle by the absence of the
    // dropdown-trigger's aria-haspopup attribute.
    screen
      .getAllByRole('button', { name: 'Scale' })
      .filter((button) => !button.hasAttribute('aria-haspopup'))
      .forEach((button) => {
        expect(button).toBeDisabled();
      });
  });
});
