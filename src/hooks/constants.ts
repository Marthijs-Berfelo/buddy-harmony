import { chordTuning, getInstruments, loadChordDb } from './chord-db';
import { RefObject } from 'react';
import { Orientation } from '@/common/fretboard/options';

const DEFAULT_TYPE = 'guitar';

export interface PrintableProps {
  printRef: RefObject<HTMLDivElement | null>;
  printDisabled?: boolean;
}

export interface Printable extends PrintableProps {
  printStyle: (orientation: Orientation) => string;
}

type TuningType = { [name: string]: string[] };

export type GuitarType = {
  name: string;
  type: TuningType;
};

export type StringTuningType = {
  name: string;
  tuning: string[];
};

export interface GuitarTypesData {
  chordGuitarTypes: GuitarType[];
  guitarTypes: GuitarType[];
  defaultGuitar: GuitarType;
  standardTuning: StringTuningType;
}

// Stable across chords-db releases — see @tombatossals/chords-db/lib/guitar.json's `keys` field.
const keys = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

const onlyUniqueGuitarTypes = (type: GuitarType, index: number, array: GuitarType[]): boolean =>
  array.findIndex((origin) => origin.name == type.name) === index;

const extractTuning = (guitar: GuitarType): StringTuningType[] =>
  Object.entries(guitar.type).map((value) => ({
    name: value[0].toLowerCase(),
    tuning: value[1],
  }));

const scaleGuitarTypes: GuitarType[] = [
  {
    name: DEFAULT_TYPE,
    type: {
      standard: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      standard_flat: ['Eb2', 'Ab2', 'C#3', 'F#3', 'Bb3', 'Eb4'],
      standard_d: ['D2', 'G2', 'C3', 'F3', 'A3', 'D4'],
      drop_d: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'],
      drop_c: ['C2', 'G2', 'C3', 'F3', 'A3', 'D4'],
      double_drop_d: ['D2', 'A2', 'D3', 'G3', 'B3', 'D4'],
      dadgad: ['D2', 'A2', 'D3', 'G3', 'A3', 'D4'],
    },
  },
];

const commonGuitarTypes = (chordGuitarTypes: GuitarType[]): GuitarType[] => {
  const common = [];
  for (const scaleGuitar of scaleGuitarTypes) {
    for (const chordGuitar of chordGuitarTypes) {
      if (scaleGuitar.name === chordGuitar.name) {
        common.push(scaleGuitar);
      }
    }
  }
  return common;
};

let cache: Promise<GuitarTypesData> | undefined;

export const computeGuitarTypes = (): Promise<GuitarTypesData> => {
  cache ??= loadChordDb().then(() => {
    const chordGuitarTypes: GuitarType[] = Object.entries(getInstruments()).map((value) => ({
      name: value[0],
      type: chordTuning(value[0]) as TuningType,
    }));

    const guitarTypes = [...scaleGuitarTypes, ...chordGuitarTypes].filter(onlyUniqueGuitarTypes);
    const defaultGuitar = commonGuitarTypes(chordGuitarTypes)[0];

    const guitar = chordGuitarTypes.filter((type) => type.name === DEFAULT_TYPE)[0];
    const standardTuning = extractTuning(guitar)[0];

    return { chordGuitarTypes, guitarTypes, defaultGuitar, standardTuning };
  });
  return cache;
};

export { keys, extractTuning, scaleGuitarTypes };
