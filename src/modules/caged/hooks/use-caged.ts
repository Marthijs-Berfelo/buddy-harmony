import { useEffect, useMemo, useRef, useState } from 'react';
import {
  chordGuitarTypes,
  GuitarType,
  Printable,
  PrintableProps,
  ChordDetail,
  ChordsHook,
  handleSelectionForChords,
  KeysHook,
  useKeys,
  useSettings,
} from '../../../hooks';
import { CagedChords, cagedConfigs } from './caged-constants';
import { Orientation } from '../../../common/fretboard';
import { buildCagedChords, cagedChordsForKey } from './caged-utils';

export interface CagedHook extends KeysHook, ChordsHook, Printable {
  cagedChords?: CagedChords;
}

const isSupportedType = (guitar: GuitarType): boolean =>
  chordGuitarTypes.findIndex((type) => type.name === guitar.name) > -1;

export const useCaged = ({ printRef }: PrintableProps): CagedHook => {
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { guitarType, tuningType } = useSettings();
  const [chords, setChords] = useState<ChordDetail[]>([]);
  const [chord, setChord] = useState<ChordDetail>();
  const chordRef = useRef(chord);
  useEffect(() => {
    chordRef.current = chord;
  }, [chord]);

  const cagedConfig = useMemo(() => {
    if (chord) {
      return cagedConfigs.get(chord.suffix);
    }
  }, [chord]);

  const cagedChords = useMemo(() => {
    if (!!cagedConfig && !!chord) {
      return buildCagedChords(chord.key, chord.suffix, cagedConfig, tuningType, guitarType);
    }
  }, [chord, cagedConfig, guitarType, tuningType]);

  useEffect(() => {
    handleSelectionForChords(
      guitarType,
      selectedKey,
      isSupportedType,
      cagedChordsForKey(Array.from(cagedConfigs.keys())),
      setChords,
      setChord,
      chordRef.current
    );
  }, [guitarType, selectedKey]);

  const printStyle = (orientation: Orientation): string =>
    `@page: { size: A4 ${
      orientation === Orientation.HORIZONTAL ? 'portrait' : 'portrait'
    }, margin: 0mm 30mm 30mm 30mm }`;

  return {
    keys,
    selectedKey,
    setSelectedKey,
    chords,
    chord,
    setChord,
    cagedChords,
    printRef,
    printStyle,
  };
};
