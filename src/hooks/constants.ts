import { chordTuning, guitar, instruments } from './chord-db';
import { RefObject } from 'react';
import { Orientation } from '../common/fretboard';

const DEFAULT_TYPE = 'guitar';

export interface PrintableProps {
  printRef: RefObject<HTMLDivElement>;
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

const keys = guitar.keys;

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

const chordGuitarTypes: GuitarType[] = Object.entries(instruments).map((value) => ({
  name: value[0],
  type: chordTuning(value[0]) as TuningType,
}));

const guitarTypes = [...scaleGuitarTypes, ...chordGuitarTypes].filter(onlyUniqueGuitarTypes);

const commonGuitarTypes = (): GuitarType[] => {
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

const defaultGuitar = commonGuitarTypes()[0];

const standardTuning = (): StringTuningType => {
  const guitar = chordGuitarTypes.filter((type) => type.name === DEFAULT_TYPE)[0];
  const tunings = extractTuning(guitar);
  return tunings[0];
};

export {
  keys,
  extractTuning,
  scaleGuitarTypes,
  chordGuitarTypes,
  guitarTypes,
  defaultGuitar,
  commonGuitarTypes,
  standardTuning,
};
