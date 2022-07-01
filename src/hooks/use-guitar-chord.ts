import { KeysHook, useKeys } from './use-keys';
import { useEffect, useState } from 'react';
import { ChordDetail, chordsForKey, ChordsHook, handleSelectionForChords } from './chord-db';
import { useSettings } from './settings';
import { chordGuitarTypes, GuitarType, Printable, PrintableProps } from './constants';
import { Orientation } from '../common/fretboard';

export interface GuitarChordHook extends KeysHook, ChordsHook, Printable {}

const isSupportedType = (guitar: GuitarType): boolean =>
  chordGuitarTypes.findIndex((type) => type.name === guitar.name) > -1;

export const useGuitarChord = ({ printRef }: PrintableProps): GuitarChordHook => {
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { guitarType } = useSettings();
  const [chords, setChords] = useState<ChordDetail[]>([]);
  const [chord, setChord] = useState<ChordDetail>();

  useEffect(() => {
    handleSelectionForChords(
      guitarType,
      selectedKey,
      isSupportedType,
      chordsForKey,
      setChords,
      setChord,
      chord
    );
  }, [guitarType, selectedKey]);

  const printStyle = (orientation: Orientation): string =>
    `@page: { size: A4 ${
      orientation === Orientation.HORIZONTAL ? 'landscape' : 'portrait'
    }, margin: 0mm 30mm 30mm 30mm }`;

  return {
    keys,
    selectedKey,
    setSelectedKey,
    chords,
    chord,
    setChord,
    printRef,
    printStyle,
  };
};
