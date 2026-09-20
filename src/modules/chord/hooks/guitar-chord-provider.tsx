import {
  createContext,
  JSX,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  KeysHook,
  useKeys,
  ChordDetail,
  chordsForKey,
  ChordsHook,
  handleSelectionForChords,
  useSettings,
  Printable,
} from 'hooks';
import { Orientation } from 'components/fretboard/options';

export interface GuitarChordHook extends KeysHook, ChordsHook, Printable {}

const GuitarChordContext = createContext<GuitarChordHook | undefined>(undefined);

export const GuitarChordProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const printRef = useRef<HTMLDivElement>(null);
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { guitarType, isSupportedType } = useSettings();
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
  }, [guitarType, selectedKey, isSupportedType]);

  const printStyle = (orientation: Orientation): string =>
    `@page: { size: A4 ${
      orientation === Orientation.HORIZONTAL ? 'landscape' : 'portrait'
    }, margin: 0mm 30mm 30mm 30mm }`;

  const chordHook: GuitarChordHook = {
    keys,
    selectedKey,
    setSelectedKey,
    chords,
    chord,
    setChord,
    printRef,
    printStyle,
  };

  return <GuitarChordContext.Provider value={chordHook}>{children}</GuitarChordContext.Provider>;
};

export const useGuitarChord = (): GuitarChordHook => {
  const context = useContext(GuitarChordContext);
  if (context) {
    return context;
  }
  throw new Error('`useGuitarChord` must be used with `GuitarChordProvider`');
};
