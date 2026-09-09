import { act, renderHook } from '@testing-library/react';
import { createElement, PropsWithChildren, RefObject } from 'react';
import { useCaged } from '../use-caged';
import { computeGuitarTypes, SettingsContextProvider, useSettings } from 'hooks';

const wrapper = ({ children }: PropsWithChildren) =>
  createElement(SettingsContextProvider, null, children);
const printRef = { current: null } as RefObject<HTMLDivElement | null>;

const renderCaged = () =>
  renderHook(() => ({ caged: useCaged({ printRef }), settings: useSettings() }), { wrapper });

describe('useCaged', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('does not throw and leaves chords empty when a key is selected while chord data is loading', () => {
    const { result } = renderCaged();
    expect(result.current.settings.chordDataLoading).toBe(true);

    expect(() => act(() => result.current.caged.setSelectedKey('C'))).not.toThrow();
    expect(result.current.caged.chords).toEqual([]);
  });

  test('populates chords once chord data has resolved and a key is selected', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));

    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(3000));

    expect(result.current.settings.chordDataLoading).toBe(false);
    expect(result.current.caged.chords.length).toBeGreaterThan(0);
  });

  test('builds cagedChords once a chord is selected from the resolved chord list', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(3000));

    act(() => result.current.caged.setChord(result.current.caged.chords[0]));

    expect(result.current.caged.cagedChords).toMatchObject({
      C: expect.any(Object),
      A: expect.any(Object),
      G: expect.any(Object),
      E: expect.any(Object),
      D: expect.any(Object),
    });
  });
});
