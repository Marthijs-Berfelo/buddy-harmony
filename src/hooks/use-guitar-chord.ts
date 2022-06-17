import { KeysHook, useKeys } from './use-keys';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChordDetail, chordModels, chordNames } from './chord-db';
import { useSettings } from './settings';
import { chordGuitarTypes, GuitarType, Printable, PrintableProps } from './constants';
import { Orientation } from '../common/fretboard';

export interface GuitarChordHook extends KeysHook, Printable {
  chords: string[];
  chord?: string;
  setChord: Dispatch<SetStateAction<string | undefined>>;
  chordModel: ChordDetail | undefined;
}

const isSupportedType = (guitar: GuitarType): boolean =>
  chordGuitarTypes.findIndex((type) => type.name === guitar.name) > -1;

export const useGuitarChord = ({ printRef }: PrintableProps): GuitarChordHook => {
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { guitarType } = useSettings();
  const [chords, setChords] = useState<string[]>([]);
  const [chord, setChord] = useState<string>();
  const [chordModel, setChordModel] = useState<ChordDetail>();

  useEffect(() => {
    if (isSupportedType(guitarType)) {
      setChords(chordNames(guitarType.name));
    } else {
      setChords([]);
    }
  }, [guitarType]);

  useEffect(() => {
    if (isSupportedType(guitarType) && !!selectedKey && !!chord) {
      const models = chordModels(guitarType.name, selectedKey, chord);
      if (models.length > 0) {
        setChordModel(models[0]);
      }
    } else {
      setChordModel(undefined);
    }
  }, [guitarType, selectedKey, chord]);

  const printStyle = (orientation: Orientation): string =>
    `@page: { size: A4 ${
      orientation === Orientation.HORIZONTAL ? 'landscape' : 'portrait'
    }, margin: 10mm 10mm 10mm 10mm }`;

  return {
    keys,
    selectedKey,
    setSelectedKey,
    chords,
    chord,
    setChord,
    chordModel,
    printRef,
    printStyle,
  };
};
