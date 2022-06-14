import { Tuning, TuningType } from 'fretboard-api';
import { chordTuning, guitar, instruments } from './chord-db';

const DEFAULT_TYPE = 'guitar';

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

const scaleGuitarTypes: GuitarType[] = Object.entries(Tuning).map((value) => ({
  name: value[0],
  type: value[1],
}));

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
