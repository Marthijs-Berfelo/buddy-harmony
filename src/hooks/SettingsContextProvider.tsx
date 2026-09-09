import React, {
  createContext,
  Dispatch,
  JSX,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DEFAULT_STYLE,
  DiagramStyle,
  FretNumberType,
  Orientation,
  ScaleModel,
} from 'common/fretboard/options';
import {
  ChordPosition,
  computeGuitarTypes,
  extractTuning,
  GuitarType,
  scaleGuitarTypes,
  StringTuningType,
} from 'hooks';
import { withMinDelay } from 'common/utils';

const CHORD_FRETS = 5;
const DEFAULT_FRETS = 12;
const NOTE_WAVE_LOADER_MIN_DISPLAY_MS = 3000;

interface Props {
  diagramStyle?: DiagramStyle;
  chordFretSize?: number;
  defaultFretSize?: number;
}

interface Settings {
  diagramStyle: DiagramStyle;
  fretCount: (scale?: ScaleModel, chord?: ChordPosition) => number;
  stringCount: number;
  guitarTypes: GuitarType[];
  chordGuitarTypes: GuitarType[];
  chordDataLoading: boolean;
  guitarType: GuitarType;
  onlySupportedGuitars: (
    supportedGuitarTypes?: GuitarType[]
  ) => (guitarType: GuitarType) => boolean;
  setGuitarType: Dispatch<SetStateAction<GuitarType>>;
  tuningTypes: StringTuningType[];
  tuningType: StringTuningType;
  setTuningType: Dispatch<SetStateAction<StringTuningType>>;
  leftHanded: boolean;
  setLeftHanded: Dispatch<SetStateAction<boolean>>;
  orientation: Orientation;
  orientationLabel: Orientation;
  toggleOrientation: () => void;
  fretNumbers: FretNumberType;
  onSelectFretNumber: (fretNumber: string) => void;
}

const SettingsContext = createContext<Settings | undefined>(undefined);

const useSettings = (): Settings => {
  const context = useContext(SettingsContext);
  if (context) {
    return context;
  }
  throw new Error('`useSettings` must be used with `SettingsContextProvider`');
};

const SettingsContextProvider = ({
  children,
  diagramStyle,
  chordFretSize,
  defaultFretSize,
}: PropsWithChildren<Props>): JSX.Element => {
  const [guitarTypes, setGuitarTypes] = useState<GuitarType[]>(scaleGuitarTypes);
  const [chordGuitarTypes, setChordGuitarTypes] = useState<GuitarType[]>([]);
  const [chordDataLoading, setChordDataLoading] = useState<boolean>(true);
  // Lazy initializers (not module-level constants) — `@/hooks` re-exports `./settings`
  // before `./constants`, so `scaleGuitarTypes` can be undefined at module-evaluation time.
  const [guitarType, setGuitarType] = useState<GuitarType>(() => scaleGuitarTypes[0]);
  const [tuningType, setTuningType] = useState<StringTuningType>(
    () => extractTuning(scaleGuitarTypes[0])[0]
  );
  const [leftHanded, setLeftHanded] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.VERTICAL);
  const [orientationLabel, setOrientationLabel] = useState<Orientation>(Orientation.HORIZONTAL);
  const [fretNumbers, setFretNumbers] = useState<FretNumberType>(FretNumberType.ROMAN);

  useEffect(() => {
    withMinDelay(computeGuitarTypes(), NOTE_WAVE_LOADER_MIN_DISPLAY_MS)
      .then((data) => {
        setChordGuitarTypes(data.chordGuitarTypes);
        setGuitarTypes(data.guitarTypes);
        setGuitarType(data.defaultGuitar);
        setTuningType(data.standardTuning);
        setChordDataLoading(false);
      })
      .catch((err) => console.error('Failed to load chord data:', err));
  }, []);

  const tuningTypes = useMemo(() => {
    return extractTuning(guitarType);
  }, [guitarType]);

  const stringCount = useMemo(() => {
    return tuningType.tuning.length;
  }, [tuningType]);

  const onlySupportedGuitars = useCallback(
    (supportedGuitarTypes?: GuitarType[]): ((type: GuitarType) => boolean) =>
      (type) => {
        if (supportedGuitarTypes !== undefined) {
          return supportedGuitarTypes.findIndex((supported) => supported.name === type.name) > -1;
        } else {
          return true;
        }
      },
    []
  );

  const toggleOrientation = useCallback((): void => {
    setOrientationLabel(orientation);
    switch (orientation) {
      case Orientation.VERTICAL:
        setOrientation(Orientation.HORIZONTAL);
        break;
      case Orientation.HORIZONTAL:
        setOrientation(Orientation.VERTICAL);
        break;
    }
  }, [orientation]);

  const onSelectFretNumber = useCallback(
    (fretNumber: string): void =>
      setFretNumbers(FretNumberType[fretNumber as keyof typeof FretNumberType]),
    []
  );

  const fretCount = useCallback(
    (scale?: ScaleModel, chord?: ChordPosition) =>
      scale
        ? scale.fretzNumber
        : chord
          ? chordFretSize || CHORD_FRETS
          : defaultFretSize || DEFAULT_FRETS,
    [chordFretSize, defaultFretSize]
  );

  const context = useMemo<Settings>(
    () => ({
      diagramStyle: diagramStyle || DEFAULT_STYLE,
      fretCount,
      stringCount,
      guitarTypes,
      chordGuitarTypes,
      chordDataLoading,
      guitarType,
      onlySupportedGuitars,
      setGuitarType,
      tuningTypes,
      tuningType,
      setTuningType,
      leftHanded,
      setLeftHanded,
      orientation,
      toggleOrientation,
      orientationLabel,
      fretNumbers,
      onSelectFretNumber,
    }),
    [
      diagramStyle,
      fretCount,
      stringCount,
      guitarTypes,
      chordGuitarTypes,
      chordDataLoading,
      guitarType,
      onlySupportedGuitars,
      setGuitarType,
      tuningTypes,
      tuningType,
      setTuningType,
      leftHanded,
      setLeftHanded,
      orientation,
      toggleOrientation,
      orientationLabel,
      fretNumbers,
      onSelectFretNumber,
    ]
  );

  return <SettingsContext.Provider value={context}>{children}</SettingsContext.Provider>;
};

export { SettingsContextProvider, useSettings };
