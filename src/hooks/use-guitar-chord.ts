import { KeysHook, useKeys } from './use-keys';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ChordDetail, chordModels, chordNames } from './chord-db';
import { useSettings } from './settings';
import { chordGuitarTypes, GuitarType } from './constants';

export interface GuitarChordHook extends KeysHook {
  chords: string[];
  chord?: string;
  setChord: Dispatch<SetStateAction<string | undefined>>;
  chordModel: ChordDetail | undefined;
}

const isSupportedType = (guitar: GuitarType): boolean =>
  chordGuitarTypes.findIndex((type) => type.name === guitar.name) > -1;

export const useGuitarChord = (): GuitarChordHook => {
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

  return {
    keys,
    selectedKey,
    setSelectedKey,
    chords,
    chord,
    setChord,
    chordModel,
  };
};
