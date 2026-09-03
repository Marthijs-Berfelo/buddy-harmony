import {
  chordGuitarTypes,
  commonGuitarTypes,
  defaultGuitar,
  extractTuning,
  guitarTypes,
  keys,
  scaleGuitarTypes,
  standardTuning,
} from '../constants';

describe('constants', () => {
  test('keys are sourced from the guitar chord db', () => {
    expect(keys).toEqual(expect.arrayContaining(['C', 'D', 'E']));
  });

  describe('extractTuning', () => {
    test('maps each tuning entry to a lowercase name and its string array', () => {
      const result = extractTuning({
        name: 'guitar',
        type: {
          Standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
          Drop_D: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
        },
      });

      expect(result).toEqual([
        { name: 'standard', tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
        { name: 'drop_d', tuning: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
      ]);
    });
  });

  describe('scaleGuitarTypes', () => {
    test('contains a single hardcoded guitar type with all its named tunings', () => {
      expect(scaleGuitarTypes).toHaveLength(1);
      expect(scaleGuitarTypes[0].name).toBe('guitar');
      expect(Object.keys(scaleGuitarTypes[0].type)).toEqual(
        expect.arrayContaining(['standard', 'drop_d', 'drop_c', 'dadgad'])
      );
    });
  });

  describe('chordGuitarTypes', () => {
    test('derives one entry per instrument in the chords-db, each with a standard tuning', () => {
      expect(chordGuitarTypes.length).toBeGreaterThan(0);
      const guitar = chordGuitarTypes.find((type) => type.name === 'guitar');
      expect(guitar).toBeDefined();
      expect(guitar?.type.standard).toEqual(['E2', 'A2', 'D3', 'G3', 'B3', 'E4']);
    });
  });

  describe('guitarTypes', () => {
    test('is the union of scale and chord guitar types, de-duplicated by name', () => {
      const names = guitarTypes.map((type) => type.name);
      expect(new Set(names).size).toBe(names.length);
      expect(names).toEqual(expect.arrayContaining(['guitar', 'ukulele']));
    });
  });

  describe('commonGuitarTypes', () => {
    test('only returns guitar types present in both scale and chord lists', () => {
      const common = commonGuitarTypes();
      expect(common.every((type) => type.name === 'guitar')).toBe(true);
      expect(common).toHaveLength(1);
    });
  });

  describe('defaultGuitar', () => {
    test('is the first guitar type common to both scale and chord types', () => {
      expect(defaultGuitar.name).toBe('guitar');
    });
  });

  describe('standardTuning', () => {
    test('returns the standard tuning for the default guitar', () => {
      expect(standardTuning()).toEqual({
        name: 'standard',
        tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      });
    });
  });
});
