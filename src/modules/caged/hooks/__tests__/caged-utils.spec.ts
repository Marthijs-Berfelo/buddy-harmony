import { test_export } from '../caged-utils';
import { majorCagedConfig } from '../caged-constants';
import { standardTuning } from '../../../../hooks';

const { keyRoot, cagedChord, addNotes, baseFret, buildCagedKey } = test_export;

describe('Caged Utils', () => {
  const tuning = standardTuning();
  const guitarType = { name: 'guitar', type: {} };

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
    test('wraps the base fret up an octave when the raw distance is not positive', () => {
      const baseChord = cagedChord(majorCagedConfig.C.base, guitarType, 'major');

      expect(baseFret('C', baseChord, majorCagedConfig.C)).toBe(12);
    });
  });

  describe('buildCagedKey', () => {
    test('builds the open, base, and positioned chords for a CAGED shape', () => {
      const result = buildCagedKey('C', 'major', majorCagedConfig.C, tuning, guitarType);

      expect(result.open.chord).toMatchObject({ baseFret: 1, frets: [-1, 3, 2, 0, 1, 0] });
      expect(result.base.chord).toMatchObject({ baseFret: 2, frets: [1, 4, 3, 1, 2, 1] });
      expect(result.positioned.chord.baseFret).toBe(12);
      expect(result.positioned.chord.notes).toEqual(['E3', 'C4', 'E4', 'G4', 'C5', 'E5']);
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
});

