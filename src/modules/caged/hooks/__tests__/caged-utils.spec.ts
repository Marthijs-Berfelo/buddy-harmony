import {
  addNotes,
  baseFret,
  buildCagedChords,
  buildCagedKey,
  cagedChord,
  keyRoot,
  sortedCagedShapes,
} from '../caged-utils';
import { CAGED_COLORS, CagedChords, cagedConfigs, CagedLetter, majorCagedConfig } from '../caged-constants';
import { ChordPosition, computeGuitarTypes, GuitarType, keys, StringTuningType } from 'hooks';
import { Note } from '@tonaljs/tonal';

describe('Caged Utils', () => {
  let tuning: StringTuningType;
  const guitarType = { name: 'guitar', type: {} };

  beforeAll(async () => {
    ({ standardTuning: tuning } = await computeGuitarTypes());
  });

  describe('cagedChord', () => {
    test('returns the requested position from the matching chord model', () => {
      const chord = cagedChord(majorCagedConfig.C.open, guitarType, 'major');

      expect(chord).toMatchObject({ baseFret: 1, frets: [-1, 3, 2, 0, 1, 0] });
    });

    test('throws when no chord model matches the position', () => {
      expect(() =>
        cagedChord({ key: 'C', position: 0, root: 'C3', rootString: 1 }, guitarType, 'not-a-suffix')
      ).toThrow('No chord for position [C | not-a-suffix | guitar]');
    });
  });

  describe('addNotes', () => {
    test('transposes each fretted string against the tuning to derive notes', () => {
      const chord = cagedChord(majorCagedConfig.C.open, guitarType, 'major');

      const result = addNotes(chord, tuning);

      expect(result.notes).toEqual(['D#2', 'C3', 'E3', 'G3', 'C4', 'E4']);
    });
  });

  describe('baseFret', () => {
    test('returns 0 when the raw distance is exactly 0, signaling the open position', () => {
      const baseChord = cagedChord(majorCagedConfig.C.base, guitarType, 'major');

      expect(baseFret('C', baseChord, majorCagedConfig.C)).toBe(0);
    });

    test('still wraps up an octave when the raw distance is negative', () => {
      const baseChord = cagedChord(majorCagedConfig.C.base, guitarType, 'major');

      expect(baseFret('A', baseChord, majorCagedConfig.C)).toBe(9);
    });

    test('unwraps an octave when the raw distance is 12 or higher', () => {
      const baseChord = cagedChord(majorCagedConfig.D.base, guitarType, 'major');

      expect(baseFret('D', baseChord, majorCagedConfig.D)).toBe(0);
    });
  });

  describe('buildCagedKey', () => {
    test('builds the open, base, and positioned chords for a CAGED shape', () => {
      const result = buildCagedKey('A', 'major', majorCagedConfig.C, tuning, guitarType);

      expect(result.open.chord).toMatchObject({ baseFret: 1, frets: [-1, 3, 2, 0, 1, 0] });
      expect(result.base.chord).toMatchObject({ baseFret: 2, frets: [1, 4, 3, 1, 2, 1] });
      expect(result.positioned.chord.baseFret).toBe(9);
    });

    test('substitutes the open chord for positioned when the raw distance is exactly 0', () => {
      const result = buildCagedKey('C', 'major', majorCagedConfig.C, tuning, guitarType);

      expect(result.positioned.chord).toMatchObject({ baseFret: 1, frets: [-1, 3, 2, 0, 1, 0] });
      expect(result.positioned.chord.notes).toEqual(['D#2', 'C3', 'E3', 'G3', 'C4', 'E4']);
      expect(result.positioned.key).toBe('C');
    });
  });

  const keyRootCases = [
    ['C', 0, 'C3'],
    ['C#', 0, 'C#3'],
    ['D', 0, 'D3'],
    ['Eb', 0, 'Eb3'],
    ['E', 0, 'E2'],
    ['F', 0, 'F2'],
    ['F#', 0, 'F#2'],
    ['G', 0, 'G2'],
    ['Ab', 0, 'Ab2'],
    ['A', 0, 'A2'],
    ['Bb', 0, 'Bb2'],
    ['B', 0, 'B2'],
    ['C', 1, 'C3'],
    ['C#', 1, 'C#3'],
    ['D', 1, 'D3'],
    ['Eb', 1, 'Eb3'],
    ['E', 1, 'E3'],
    ['F', 1, 'F3'],
    ['F#', 1, 'F#3'],
    ['G', 1, 'G3'],
    ['Ab', 1, 'Ab3'],
    ['A', 1, 'A2'],
    ['Bb', 1, 'Bb2'],
    ['B', 1, 'B2'],
    ['C', 2, 'C4'],
    ['C#', 2, 'C#4'],
    ['D', 2, 'D4'],
    ['Eb', 2, 'Eb3'],
    ['E', 2, 'E3'],
    ['F', 2, 'F3'],
    ['F#', 2, 'F#3'],
    ['G', 2, 'G3'],
    ['Ab', 2, 'Ab3'],
    ['A', 2, 'A3'],
    ['Bb', 2, 'Bb3'],
    ['B', 2, 'B3'],
  ];

  test.each(keyRootCases)('should root key %s on string %i as %s', (key, string, expected) => {
    expect(keyRoot(key.toString(), string as number)).toEqual(expected);
  });

  describe('sortedCagedShapes', () => {
    const chordFor = (baseFret: number): ChordPosition => ({
      frets: [-1, 3, 2, 0, 1, 0],
      fingers: [0, 3, 2, 0, 1, 0],
      baseFret,
      midi: [],
    });

    const cagedChords: CagedChords = {
      C: { open: {} as never, base: {} as never, positioned: { chord: chordFor(1) } as never },
      A: { open: {} as never, base: {} as never, positioned: { chord: chordFor(5) } as never },
      G: { open: {} as never, base: {} as never, positioned: { chord: chordFor(2) } as never },
      E: { open: {} as never, base: {} as never, positioned: { chord: chordFor(0) } as never },
      D: { open: {} as never, base: {} as never, positioned: { chord: chordFor(3) } as never },
    };
    const cagedOrder: CagedLetter[] = ['E', 'C', 'G', 'D', 'A'];

    test('maps cagedOrder to {chord, color} pairs using CAGED_COLORS', () => {
      const shapes = sortedCagedShapes(cagedChords, cagedOrder, {
        C: true,
        A: true,
        G: true,
        E: true,
        D: true,
      });

      expect(shapes).toEqual([
        { chord: cagedChords.E.positioned.chord, color: CAGED_COLORS.E.caged },
        { chord: cagedChords.C.positioned.chord, color: CAGED_COLORS.C.caged },
        { chord: cagedChords.G.positioned.chord, color: CAGED_COLORS.G.caged },
        { chord: cagedChords.D.positioned.chord, color: CAGED_COLORS.D.caged },
        { chord: cagedChords.A.positioned.chord, color: CAGED_COLORS.A.caged },
      ]);
    });

    test('filters out letters whose visibleShapes entry is false, preserving cagedOrder', () => {
      const shapes = sortedCagedShapes(cagedChords, cagedOrder, {
        C: true,
        A: false,
        G: true,
        E: false,
        D: true,
      });

      expect(shapes.map((shape) => shape.chord.baseFret)).toEqual([
        cagedChords.C.positioned.chord.baseFret,
        cagedChords.G.positioned.chord.baseFret,
        cagedChords.D.positioned.chord.baseFret,
      ]);
    });

    test('returns an empty array when every shape is hidden', () => {
      const shapes = sortedCagedShapes(cagedChords, cagedOrder, {
        C: false,
        A: false,
        G: false,
        E: false,
        D: false,
      });

      expect(shapes).toEqual([]);
    });
  });

  describe('buildCagedChords C-shape at key B', () => {
    let guitarType: GuitarType;

    beforeAll(async () => {
      ({ defaultGuitar: guitarType } = await computeGuitarTypes());
    });

    const soundedChromas = (chord: ReturnType<typeof cagedChord> & { notes?: string[] }) =>
      chord.frets
        .map((fret, index) => (fret === -1 ? undefined : Note.chroma(chord.notes![index])))
        .filter((chroma): chroma is number => chroma !== undefined);

    test('produces a B minor triad, not a C minor triad', () => {
      const cagedChords = buildCagedChords(
        'B',
        'minor',
        cagedConfigs.get('minor')!,
        tuning,
        guitarType
      );

      // B minor: B=11, D=2, F#=6
      expect(new Set(soundedChromas(cagedChords.C.positioned.chord))).toEqual(new Set([11, 2, 6]));
    });

    test('produces a B7 chord, not a C7 chord', () => {
      const cagedChords = buildCagedChords('B', '7', cagedConfigs.get('7')!, tuning, guitarType);

      // B7: B=11, D#=3, F#=6, A=9 (barre shape omits the 5th, F#)
      const chromas = soundedChromas(cagedChords.C.positioned.chord);
      expect(chromas.every((chroma) => [11, 3, 6, 9].includes(chroma))).toBe(true);
      expect(new Set(chromas)).toEqual(new Set([11, 3, 9]));
    });
  });

  describe('buildCagedChords', () => {
    let guitarType: GuitarType;

    beforeAll(async () => {
      ({ defaultGuitar: guitarType } = await computeGuitarTypes());
    });

    const buildCagedChordsCases = Array.from(cagedConfigs.entries()).flatMap(([type, config]) =>
      keys.map((key) => [key, type, config] as const)
    );

    test.each(buildCagedChordsCases)(
      'builds valid CAGED chords for key %s, type %s',
      (key, type, config) => {
        const cagedChords = buildCagedChords(key, type, config, tuning, guitarType);

        (['C', 'A', 'G', 'E', 'D'] as CagedLetter[]).forEach((letter) => {
          const { open, base, positioned } = cagedChords[letter];

          [open.chord, base.chord, positioned.chord].forEach((chord) => {
            expect(chord.frets.length).toBe(tuning.tuning.length);
          });
          expect(positioned.chord.notes?.length).toBe(tuning.tuning.length);

          expect(positioned.chord.baseFret).toBeGreaterThanOrEqual(0);
          expect(positioned.chord.baseFret).toBeLessThan(12);
        });
      }
    );
  });
});
