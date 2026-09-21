import { act, renderHook } from '@testing-library/react';
import { createElement, PropsWithChildren } from 'react';
import { CagedProvider, useCaged } from '../';
import { computeGuitarTypes, SettingsProvider, useSettings } from 'hooks';

const wrapper = ({ children }: PropsWithChildren) =>
  createElement(SettingsProvider, null, createElement(CagedProvider, null, children));

const renderCaged = () =>
  renderHook(() => ({ caged: useCaged(), settings: useSettings() }), { wrapper });

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
    await act(() => vi.advanceTimersByTimeAsync(4000));

    expect(result.current.settings.chordDataLoading).toBe(false);
    expect(result.current.caged.chords.length).toBeGreaterThan(0);
  });

  test('builds cagedChords once a chord is selected from the resolved chord list', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    act(() => result.current.caged.setChord(result.current.caged.chords[0]));

    expect(result.current.caged.cagedChords).toMatchObject({
      C: expect.any(Object),
      A: expect.any(Object),
      G: expect.any(Object),
      E: expect.any(Object),
      D: expect.any(Object),
    });
  });

  test('orders cagedChords ascending by positioned base fret once chords are built', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    act(() => result.current.caged.setChord(result.current.caged.chords[0]));

    const { cagedChords, cagedOrder } = result.current.caged;
    expect(cagedOrder).toBeDefined();
    const baseFrets = cagedOrder!.map((letter) => cagedChords![letter].positioned.chord.baseFret);
    expect(baseFrets).toEqual([...baseFrets].sort((a, b) => a - b));
    expect(cagedOrder![0]).toBe('C');
  });

  test('defaults to scale view mode with every shape visible', () => {
    const { result } = renderCaged();

    expect(result.current.caged.viewMode).toBe('scale');
    expect(result.current.caged.visibleShapes).toEqual({
      C: true,
      A: true,
      G: true,
      E: true,
      D: true,
    });
  });

  test('setViewMode switches between chord and scale', () => {
    const { result } = renderCaged();

    act(() => result.current.caged.setViewMode('chord'));
    expect(result.current.caged.viewMode).toBe('chord');

    act(() => result.current.caged.setViewMode('scale'));
    expect(result.current.caged.viewMode).toBe('scale');
  });

  test('toggleShapeVisibility flips only the targeted letter', () => {
    const { result } = renderCaged();

    act(() => result.current.caged.toggleShapeVisibility('G'));

    expect(result.current.caged.visibleShapes).toEqual({
      C: true,
      A: true,
      G: false,
      E: true,
      D: true,
    });

    act(() => result.current.caged.toggleShapeVisibility('G'));

    expect(result.current.caged.visibleShapes.G).toBe(true);
  });
});
