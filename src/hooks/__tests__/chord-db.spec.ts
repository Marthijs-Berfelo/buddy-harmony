import {
  ChordDetail,
  chordModels,
  chordNamesForKey,
  chordsForKey,
  chordTuning,
  handleSelectionForChords,
  loadChordDb,
} from '../chord-db';

describe('chord-db', () => {
  let guitarInstrument: Awaited<ReturnType<typeof loadChordDb>>['guitar'];
  let ukuleleInstrument: Awaited<ReturnType<typeof loadChordDb>>['ukulele'];

  beforeAll(async () => {
    const db = await loadChordDb();
    guitarInstrument = db.guitar;
    ukuleleInstrument = db.ukulele;
  });

  describe('loadChordDb', () => {
    test('returns the same cached promise on subsequent calls', () => {
      const first = loadChordDb();
      const second = loadChordDb();
      expect(first).toBe(second);
    });

    test('resolves guitar and ukulele instrument data', async () => {
      const db = await loadChordDb();
      expect(db.guitar.main.name).toBe('guitar');
      expect(db.ukulele.main.name).toBe('ukulele');
    });
  });

  describe('chordTuning', () => {
    test('returns the tunings for a known instrument', () => {
      expect(chordTuning('guitar')).toEqual({ standard: guitarInstrument.tunings.standard });
    });

    test('throws for an unsupported instrument', () => {
      expect(() => chordTuning('banjo')).toThrow('Unsupported CHORD instrument: banjo');
    });
  });

  describe('chordsForKey', () => {
    test('returns only chords matching the given key', () => {
      const result = chordsForKey('guitar', 'C');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((chord) => chord.key === 'C')).toBe(true);
    });

    test('works for the ukulele instrument too', () => {
      const result = chordsForKey('ukulele', 'C');
      expect(result.length).toBeGreaterThan(0);
      expect(result.every((chord) => chord.key === 'C')).toBe(true);
    });
  });

  describe('chordModels', () => {
    test('filters chords by both key and suffix', () => {
      const result = chordModels('guitar', 'C', 'major');
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({ key: 'C', suffix: 'major' });
    });

    test('returns an empty array when no chord matches the suffix', () => {
      expect(chordModels('guitar', 'C', 'not-a-real-suffix')).toEqual([]);
    });
  });

  describe('chordNamesForKey', () => {
    test('returns the suffixes available for a key', () => {
      const names = chordNamesForKey('guitar', 'C');
      expect(names).toEqual(expect.arrayContaining(['major', 'minor', '7']));
    });
  });

  describe('handleSelectionForChords', () => {
    const guitarType = { name: 'guitar', type: {} };
    const chordA: ChordDetail = { key: 'C', suffix: 'major', positions: [] };
    const chordB: ChordDetail = { key: 'C', suffix: 'minor', positions: [] };

    test('clears chords and chord when the guitar type is unsupported', () => {
      const setChords = vi.fn();
      const setChord = vi.fn();

      handleSelectionForChords(guitarType, 'C', () => false, vi.fn(), setChords, setChord);

      expect(setChords).toHaveBeenCalledWith([]);
      expect(setChord).toHaveBeenCalledWith(undefined);
    });

    test('clears chords and chord when no key is selected', () => {
      const setChords = vi.fn();
      const setChord = vi.fn();

      handleSelectionForChords(guitarType, undefined, () => true, vi.fn(), setChords, setChord);

      expect(setChords).toHaveBeenCalledWith([]);
      expect(setChord).toHaveBeenCalledWith(undefined);
    });

    test('auto-selects the single chord when exactly one matches', () => {
      const setChords = vi.fn();
      const setChord = vi.fn();
      const getChords = vi.fn().mockReturnValue([chordA]);

      handleSelectionForChords(guitarType, 'C', () => true, getChords, setChords, setChord);

      expect(getChords).toHaveBeenCalledWith('guitar', 'C');
      expect(setChords).toHaveBeenCalledWith([chordA]);
      expect(setChord).toHaveBeenCalledWith(chordA);
    });

    test('re-selects the chord matching the previous suffix when multiple chords match', () => {
      const setChords = vi.fn();
      const setChord = vi.fn();
      const getChords = vi.fn().mockReturnValue([chordA, chordB]);

      handleSelectionForChords(guitarType, 'C', () => true, getChords, setChords, setChord, chordB);

      expect(setChord).toHaveBeenCalledWith(chordB);
    });

    test('selects undefined when multiple chords match but none share the previous suffix', () => {
      const setChords = vi.fn();
      const setChord = vi.fn();
      const getChords = vi.fn().mockReturnValue([chordA, chordB]);

      handleSelectionForChords(
        guitarType,
        'C',
        () => true,
        getChords,
        setChords,
        setChord,
        { key: 'C', suffix: 'dim', positions: [] }
      );

      expect(setChord).toHaveBeenCalledWith(undefined);
    });
  });
});
