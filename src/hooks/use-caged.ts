import { Interval, transpose } from '@tonaljs/tonal';
import { GuitarType, Printable, PrintableProps, StringTuningType } from './constants';
import { chordModels, ChordPosition } from './chord-db';
import { KeysHook, useKeys } from './use-keys';
import { useSettings } from './settings';
import { useEffect, useMemo, useState } from 'react';
import {
  CagedChords,
  cagedConfig,
  CagedKey,
  CagedKeyConfig,
  CagedPositionConfig,
} from './caged-constants';
import { Orientation } from '../common/fretboard';

export interface CagedHook extends KeysHook, Printable {
  cagedChords?: CagedChords;
}

export const useCaged = ({ printRef }: PrintableProps): CagedHook => {
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { guitarType, tuningType } = useSettings();
  const type = useMemo(() => 'major', []);
  const [cagedChords, setCagedChords] = useState<CagedChords>();

  useEffect(() => {
    if (!!selectedKey) {
      const caged = buildCagedChords(selectedKey, type, tuningType, guitarType);
      setCagedChords(caged);
    } else {
      setCagedChords(undefined);
    }
  }, [selectedKey, guitarType, tuningType, type]);

  const printStyle = (orientation: Orientation): string =>
    `@page: { size: A4 ${
      orientation === Orientation.HORIZONTAL ? 'portrait' : 'portrait'
    }, margin: 0mm 30mm 30mm 30mm }`;

  return {
    keys,
    selectedKey,
    setSelectedKey,
    cagedChords,
    printRef,
    printStyle,
  };
};

const buildCagedChords = (
  key: string,
  type: string,
  tuning: StringTuningType,
  guitarType: GuitarType
): CagedChords => ({
  C: buildCagedKey(key, type, cagedConfig.C, tuning, guitarType),
  A: buildCagedKey(key, type, cagedConfig.A, tuning, guitarType),
  G: buildCagedKey(key, type, cagedConfig.G, tuning, guitarType),
  E: buildCagedKey(key, type, cagedConfig.E, tuning, guitarType),
  D: buildCagedKey(key, type, cagedConfig.D, tuning, guitarType),
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

function inSecondOctaveOnFirstString(stringRoot: number, key: string) {
  return stringRoot === 0 && ['E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'].includes(key);
}

function inSecondOctaveOnSecondString(stringRoot: number, key: string) {
  return stringRoot === 1 && ['A', 'Bb', 'B'].includes(key);
}

function inFourthOctaveOnThirdString(stringRoot: number, key: string) {
  return stringRoot === 2 && ['C', 'C#', 'D'].includes(key);
}

const fretDistance = (keyRoot: string, chordRoot: string): number => {
  const intervalLiteral = Interval.distance(chordRoot, keyRoot);
  return Interval.semitones(intervalLiteral) || 0;
};
