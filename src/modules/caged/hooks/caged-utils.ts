import {
  CagedChords,
  CagedConfig,
  CagedKey,
  CagedKeyConfig,
  CagedPositionConfig,
} from './caged-constants';
import {
  ChordDetail,
  chordModels,
  chordNamesForKey,
  ChordPosition,
  chordsForKey,
  GuitarType,
  StringTuningType,
} from '../../../hooks';
import { Interval, transpose } from '@tonaljs/tonal';

export const cagedChordsForKey =
  (cagedChordTypes: string[]): ((instrument: string, key: string) => ChordDetail[]) =>
  (instrument, key) =>
    chordsForKey(instrument, key)
      .filter((chord) => cagedChordTypes.includes(chord.suffix))
      .filter((chord) => chordNamesForKey(instrument, 'C').includes(chord.suffix))
      .filter((chord) => chordNamesForKey(instrument, 'A').includes(chord.suffix))
      .filter((chord) => chordNamesForKey(instrument, 'G').includes(chord.suffix))
      .filter((chord) => chordNamesForKey(instrument, 'E').includes(chord.suffix))
      .filter((chord) => chordNamesForKey(instrument, 'D').includes(chord.suffix));

export const buildCagedChords = (
  key: string,
  type: string,
  config: CagedConfig,
  tuning: StringTuningType,
  guitarType: GuitarType
): CagedChords => ({
  C: buildCagedKey(key, type, config.C, tuning, guitarType),
  A: buildCagedKey(key, type, config.A, tuning, guitarType),
  G: buildCagedKey(key, type, config.G, tuning, guitarType),
  E: buildCagedKey(key, type, config.E, tuning, guitarType),
  D: buildCagedKey(key, type, config.D, tuning, guitarType),
});

const buildCagedKey = (
  key: string,
  type: string,
  config: CagedKeyConfig,
  tuning: StringTuningType,
  guitarType: GuitarType
): CagedKey => {
  const openChord = cagedChord(config.open, guitarType, type);
  const baseChord = cagedChord(config.base, guitarType, type);
  const positionedChord = addNotes(
    Object.assign({}, baseChord, {
      baseFret: baseFret(key, baseChord, config),
    }),
    tuning
  );

  return {
    open: Object.assign({}, config.open, { chord: openChord }),
    base: Object.assign({}, config.base, { chord: baseChord }),
    positioned: Object.assign({}, config.base, { chord: positionedChord }),
  };
};

const cagedChord = (
  position: CagedPositionConfig,
  guitarType: GuitarType,
  type: string
): ChordPosition => {
  const models = chordModels(guitarType.name, position.key, type);
  if (models.length > 0) {
    const chord = models[0];
    return chord.positions[position.position];
  } else {
    throw new Error(`No chord for position [${position.key} | ${type} | ${guitarType.name}]`);
  }
};

const addNotes = (chord: ChordPosition, tuning: StringTuningType): ChordPosition => {
  const notes = chord.frets
    .map((fret) => fret + chord.baseFret - 1)
    .map(Interval.fromSemitones)
    .map((interval, index) => transpose(tuning.tuning[index], interval));
  return Object.assign({}, chord, { notes });
};

const baseFret = (key: string, baseChord: ChordPosition, config: CagedKeyConfig): number => {
  const baseFret =
    baseChord.baseFret + fretDistance(keyRoot(key, config.base.rootString), config.base.root);
  console.log('Base fret', baseFret, baseChord, config);
  if (baseFret < 1) {
    return baseFret + 12;
  }
  return baseFret;
};

const keyRoot = (key: string, stringRoot: number): string => {
  if (inSecondOctaveOnFirstString(stringRoot, key)) {
    return `${key}2`;
  } else if (inSecondOctaveOnSecondString(stringRoot, key)) {
    return `${key}2`;
  } else if (inFourthOctaveOnThirdString(stringRoot, key)) {
    return `${key}4`;
  } else {
    return `${key}3`;
  }
};

const inSecondOctaveOnFirstString = (stringRoot: number, key: string): boolean =>
  stringRoot === 0 && ['E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].includes(key);

const inSecondOctaveOnSecondString = (stringRoot: number, key: string): boolean =>
  stringRoot === 1 && ['A', 'Bb', 'B'].includes(key);

const inFourthOctaveOnThirdString = (stringRoot: number, key: string): boolean =>
  stringRoot === 2 && ['C', 'C#', 'D'].includes(key);

const fretDistance = (keyRoot: string, chordRoot: string): number => {
  const intervalLiteral = Interval.distance(chordRoot, keyRoot);
  return Interval.semitones(intervalLiteral) || 0;
};

export const test_export = {
  buildCagedKey,
  cagedChord,
  addNotes,
  baseFret,
  keyRoot,
};
