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

  test('defaults showTriads to true', () => {
    const { result } = renderCaged();

    expect(result.current.caged.showTriads).toBe(true);
  });

  test('setShowTriads toggles the triad switch', () => {
    const { result } = renderCaged();

    act(() => result.current.caged.setShowTriads(false));
    expect(result.current.caged.showTriads).toBe(false);

    act(() => result.current.caged.setShowTriads(true));
    expect(result.current.caged.showTriads).toBe(true);
  });

  test('leaves scaleName undefined once a chord is chosen (no auto-default)', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const majorChord = result.current.caged.chords.find((chord) => chord.suffix === 'major');
    act(() => result.current.caged.setChord(majorChord));

    expect(result.current.caged.scaleName).toBeUndefined();
  });

  test('leaves scaleName undefined when the chord suffix changes and no scale was picked', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const majorChord = result.current.caged.chords.find((chord) => chord.suffix === 'major');
    act(() => result.current.caged.setChord(majorChord));
    expect(result.current.caged.scaleName).toBeUndefined();

    const minorChord = result.current.caged.chords.find((chord) => chord.suffix === 'minor');
    act(() => result.current.caged.setChord(minorChord));

    expect(result.current.caged.scaleName).toBeUndefined();
  });

  test('clears a manually picked scaleName when the chord suffix changes to a different suffix', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const majorChord = result.current.caged.chords.find((chord) => chord.suffix === 'major');
    act(() => result.current.caged.setChord(majorChord));

    act(() => result.current.caged.setScaleName('lydian'));
    expect(result.current.caged.scaleName).toBe('lydian');

    const minorChord = result.current.caged.chords.find((chord) => chord.suffix === 'minor');
    act(() => result.current.caged.setChord(minorChord));

    expect(result.current.caged.scaleName).toBeUndefined();
  });

  test('preserves a user-picked scaleName when the key changes but the chord suffix stays the same', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const cMajorChord = result.current.caged.chords.find((chord) => chord.suffix === 'major');
    act(() => result.current.caged.setChord(cMajorChord));
    act(() => result.current.caged.setScaleName('lydian'));

    act(() => result.current.caged.setSelectedKey('G'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const gMajorChord = result.current.caged.chords.find((chord) => chord.suffix === 'major');
    expect(gMajorChord).not.toBe(cMajorChord);
    act(() => result.current.caged.setChord(gMajorChord));

    expect(result.current.caged.scaleName).toBe('lydian');
  });

  test('computes scaleModel from selectedKey and scaleName once both are set', async () => {
    const { result } = renderCaged();
    act(() => result.current.caged.setSelectedKey('C'));
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    const majorChord = result.current.caged.chords.find((chord) => chord.suffix === 'major');
    act(() => result.current.caged.setChord(majorChord));
    act(() => result.current.caged.setScaleName('major'));

    expect(result.current.caged.scaleModel).toBeDefined();
    expect(result.current.caged.scaleModel?.info).toHaveLength(7);
  });

  test('isStandardTuning is true for the default guitar/tuning', async () => {
    const { result } = renderCaged();
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));

    expect(result.current.caged.isStandardTuning).toBe(true);
  });

  test('falls back viewMode to chord when isStandardTuning becomes false while viewMode is scale', async () => {
    const { result } = renderCaged();
    await computeGuitarTypes();
    await act(() => vi.advanceTimersByTimeAsync(4000));
    expect(result.current.caged.viewMode).toBe('scale');

    const ukulele = result.current.settings.guitarTypes.find((type) => type.name === 'ukulele');
    act(() => result.current.settings.setGuitarType(ukulele!));

    expect(result.current.caged.isStandardTuning).toBe(false);
    expect(result.current.caged.viewMode).toBe('chord');
  });
});
