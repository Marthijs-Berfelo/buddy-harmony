import { computeGuitarTypes, extractTuning, keys, loadChordDb, scaleGuitarTypes } from '@/hooks';

describe('constants', () => {
  test('keys matches the guitar keys from chords-db', async () => {
    const { guitar } = await loadChordDb();
    expect(keys).toEqual(guitar.keys);
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

  describe('computeGuitarTypes', () => {
    test('derives one chordGuitarTypes entry per instrument in the chords-db, each with a standard tuning', async () => {
      const { chordGuitarTypes } = await computeGuitarTypes();
      expect(chordGuitarTypes.length).toBeGreaterThan(0);
      const guitar = chordGuitarTypes.find((type) => type.name === 'guitar');
      expect(guitar).toBeDefined();
      expect(guitar?.type.standard).toEqual(['E2', 'A2', 'D3', 'G3', 'B3', 'E4']);
    });

    test('guitarTypes is the union of scale and chord guitar types, de-duplicated by name', async () => {
      const { guitarTypes } = await computeGuitarTypes();
      const names = guitarTypes.map((type) => type.name);
      expect(new Set(names).size).toBe(names.length);
      expect(names).toEqual(expect.arrayContaining(['guitar', 'ukulele']));
    });

    test('defaultGuitar is the first guitar type common to both scale and chord types', async () => {
      const { defaultGuitar } = await computeGuitarTypes();
      expect(defaultGuitar.name).toBe('guitar');
    });

    test('standardTuning returns the standard tuning for the default guitar', async () => {
      const { standardTuning } = await computeGuitarTypes();
      expect(standardTuning).toEqual({
        name: 'standard',
        tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      });
    });

    test('resolves the same underlying data on repeated calls', async () => {
      const first = await computeGuitarTypes();
      const second = await computeGuitarTypes();
      expect(first.defaultGuitar).toEqual(second.defaultGuitar);
    });
  });
});
