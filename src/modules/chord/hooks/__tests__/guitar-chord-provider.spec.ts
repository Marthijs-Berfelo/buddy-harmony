import { act, renderHook } from '@testing-library/react';
import { createElement, PropsWithChildren } from 'react';
import { GuitarChordProvider, useGuitarChord } from '../guitar-chord-provider';
import { computeGuitarTypes, SettingsContextProvider, useSettings } from 'hooks';

const wrapper = ({ children }: PropsWithChildren) =>
  createElement(
    SettingsContextProvider,
    null,
    createElement(GuitarChordProvider, null, children)
  );

const renderGuitarChord = () =>
  renderHook(() => ({ chord: useGuitarChord(), settings: useSettings() }), {
    wrapper,
  });

describe('useGuitarChord', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('does not throw and leaves chords empty when a key is selected while chord data is loading', () => {
    const { result } = renderGuitarChord();
    expect(result.current.settings.chordDataLoading).toBe(true);

    expect(() => act(() => result.current.chord.setSelectedKey('C'))).not.toThrow();
    expect(result.current.chord.chords).toEqual([]);
  });

  test('populates chords once chord data has resolved and a key is selected', async () => {
    const { result } = renderGuitarChord();
    act(() => result.current.chord.setSelectedKey('C'));

    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(3000));

    expect(result.current.settings.chordDataLoading).toBe(false);
    expect(result.current.chord.chords.length).toBeGreaterThan(0);
  });
});
