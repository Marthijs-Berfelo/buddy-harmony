import { useEffect, useState } from 'react';
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
import { CagedChords, cagedConfigs, CagedConfig } from './caged-constants';
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
  const [cagedConfig, setCagedConfig] = useState<CagedConfig>();
  const [cagedChords, setCagedChords] = useState<CagedChords>();

  useEffect(() => {
    if (!!cagedConfig && !!chord) {
      const caged = buildCagedChords(chord.key, chord.suffix, cagedConfig, tuningType, guitarType);
      setCagedChords(caged);
    } else {
      setCagedChords(undefined);
    }
  }, [chord, cagedConfig]);

  useEffect(() => {
    if (!!chord) {
      setCagedConfig(cagedConfigs.get(chord.suffix));
    } else {
      setCagedChords(undefined);
    }
  }, [chord]);

  useEffect(() => {
    handleSelectionForChords(
      guitarType,
      selectedKey,
      isSupportedType,
      cagedChordsForKey(Array.from(cagedConfigs.keys())),
      setChords,
      setChord,
      chord
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
