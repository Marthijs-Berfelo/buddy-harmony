import {
  createContext,
  JSX,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Printable,
  ChordDetail,
  ChordsHook,
  handleSelectionForChords,
  KeysHook,
  useKeys,
  useSettings,
} from 'hooks';
import { CagedChords, CagedLetter, cagedConfigs } from './caged-constants';
import { Orientation } from 'components/fretboard/options';
import { buildCagedChords, cagedChordsForKey } from './caged-utils';

export interface CagedHook extends KeysHook, ChordsHook, Printable {
  cagedChords?: CagedChords;
  cagedOrder?: CagedLetter[];
}

const CagedContext = createContext<CagedHook | undefined>(undefined);

export const CagedProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const printRef = useRef<HTMLDivElement>(null);
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { guitarType, tuningType, isSupportedType } = useSettings();
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

  const cagedOrder = useMemo(() => {
    if (cagedChords) {
      return (Object.keys(cagedChords) as CagedLetter[]).sort(
        (a, b) =>
          cagedChords[a].positioned.chord.baseFret - cagedChords[b].positioned.chord.baseFret
      );
    }
  }, [cagedChords]);

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
  }, [guitarType, selectedKey, isSupportedType]);

  const printStyle = (orientation: Orientation): string =>
    `@page: { size: A4 ${
      orientation === Orientation.HORIZONTAL ? 'portrait' : 'portrait'
    }, margin: 0mm 30mm 30mm 30mm }`;

  const caged: CagedHook = {
    keys,
    selectedKey,
    setSelectedKey,
    chords,
    chord,
    setChord,
    cagedChords,
    cagedOrder,
    printRef,
    printStyle,
  };

  return <CagedContext.Provider value={caged}>{children}</CagedContext.Provider>;
};

export const useCaged = (): CagedHook => {
  const context = useContext(CagedContext);
  if (context) {
    return context;
  }
  throw new Error('`useCaged` must be used with `CagedProvider`');
};
