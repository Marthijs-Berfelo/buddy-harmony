import {
  createContext,
  Dispatch,
  JSX,
  PropsWithChildren,
  SetStateAction,
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
import { Orientation, ScaleModel } from 'components/fretboard/options';
import {
  applyDefaultScaleName,
  buildCagedChords,
  cagedChordsForKey,
  enforceStandardTuningForScaleView,
} from './caged-utils';
import * as gs from 'guitar-scales';

const guitarScale = gs.GuitarScale;

export type CagedViewMode = 'chord' | 'scale';

export interface CagedHook extends KeysHook, ChordsHook, Printable {
  cagedChords?: CagedChords;
  cagedOrder?: CagedLetter[];
  viewMode: CagedViewMode;
  setViewMode: Dispatch<SetStateAction<CagedViewMode>>;
  visibleShapes: Record<CagedLetter, boolean>;
  toggleShapeVisibility: (letter: CagedLetter) => void;
  scaleName?: string;
  setScaleName: Dispatch<SetStateAction<string | undefined>>;
  showTriads: boolean;
  setShowTriads: Dispatch<SetStateAction<boolean>>;
  scaleModel: ScaleModel | undefined;
  isStandardTuning: boolean;
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

  const [viewMode, setViewMode] = useState<CagedViewMode>('scale');
  const [visibleShapes, setVisibleShapes] = useState<Record<CagedLetter, boolean>>({
    C: true,
    A: true,
    G: true,
    E: true,
    D: true,
  });

  const toggleShapeVisibility = (letter: CagedLetter): void =>
    setVisibleShapes((current) => ({ ...current, [letter]: !current[letter] }));

  const [scaleName, setScaleName] = useState<string>();
  const [showTriads, setShowTriads] = useState<boolean>(true);
  const suffixRef = useRef(chord?.suffix);

  useEffect(() => {
    if (chord && chord.suffix !== suffixRef.current) {
      suffixRef.current = chord.suffix;
      applyDefaultScaleName(chord, setScaleName);
    }
  }, [chord]);

  const scaleModel = useMemo(() => {
    if (!!selectedKey && !!scaleName) {
      return guitarScale.get(selectedKey, scaleName) as ScaleModel;
    }
  }, [selectedKey, scaleName]);

  const isStandardTuning = guitarType.name === 'guitar' && tuningType.name === 'standard';

  useEffect(() => {
    enforceStandardTuningForScaleView(isStandardTuning, viewMode, setViewMode);
  }, [isStandardTuning, viewMode]);

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
    viewMode,
    setViewMode,
    visibleShapes,
    toggleShapeVisibility,
    scaleName,
    setScaleName,
    showTriads,
    setShowTriads,
    scaleModel,
    isStandardTuning,
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
