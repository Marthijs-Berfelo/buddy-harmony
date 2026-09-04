import { useEffect, useRef, useState } from 'react';
import {
  KeysHook,
  useKeys,
  ChordDetail,
  chordsForKey,
  ChordsHook,
  handleSelectionForChords,
  useSettings,
  GuitarType,
  Printable,
  PrintableProps,
} from '@/hooks';
import { Orientation } from '@/common/fretboard/options';

export interface GuitarChordHook extends KeysHook, ChordsHook, Printable {}

export const useGuitarChord = ({ printRef }: PrintableProps): GuitarChordHook => {
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { guitarType, chordGuitarTypes } = useSettings();
  const isSupportedType = (guitar: GuitarType): boolean =>
    chordGuitarTypes.findIndex((type) => type.name === guitar.name) > -1;
  const [chords, setChords] = useState<ChordDetail[]>([]);
  const [chord, setChord] = useState<ChordDetail>();
  const chordRef = useRef(chord);
  useEffect(() => {
    chordRef.current = chord;
  }, [chord]);

  useEffect(() => {
    handleSelectionForChords(
      guitarType,
      selectedKey,
      isSupportedType,
      chordsForKey,
      setChords,
      setChord,
      chordRef.current
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
