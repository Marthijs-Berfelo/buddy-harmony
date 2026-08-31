import { createContext, Dispatch, JSX, SetStateAction, useContext, useMemo } from 'react';
import React, { PropsWithChildren, useState } from 'react';
import { DEFAULT_STYLE, FretNumberType, Orientation, ScaleModel } from '@/common/fretboard';
import {
  defaultGuitar,
  extractTuning,
  GuitarType,
  guitarTypes,
  standardTuning,
  StringTuningType,
} from '@/hooks';
import { DiagramStyle } from '@/common/fretboard/utils';
import { ChordPosition } from '@/hooks';
import { BaseContext } from '@/hooks/base-context.ts';

const CHORD_FRETS = 5;
const DEFAULT_FRETS = 12;

interface Props {
  diagramStyle?: DiagramStyle;
  chordFretSize?: number;
  defaultFretSize?: number;
}

interface Settings extends BaseContext {
  diagramStyle: DiagramStyle;
  fretCount: (scale?: ScaleModel, chord?: ChordPosition) => number;
  stringCount: number;
  guitarTypes: GuitarType[];
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
  const [guitarType, setGuitarType] = useState<GuitarType>(defaultGuitar);
  const [tuningType, setTuningType] = useState<StringTuningType>(standardTuning());
  const [leftHanded, setLeftHanded] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.VERTICAL);
  const [orientationLabel, setOrientationLabel] = useState<Orientation>(Orientation.HORIZONTAL);
  const [fretNumbers, setFretNumbers] = useState<FretNumberType>(FretNumberType.ROMAN);

  const tuningTypes = useMemo(() => {
    return extractTuning(guitarType);
  }, [guitarType]);

  const stringCount = useMemo(() => {
    return tuningType.tuning.length;
  }, [tuningType]);

  const onlySupportedGuitars =
    (supportedGuitarTypes?: GuitarType[]): ((type: GuitarType) => boolean) =>
    (type) => {
      if (supportedGuitarTypes !== undefined) {
        return supportedGuitarTypes.findIndex((supported) => supported.name === type.name) > -1;
      } else {
        return true;
      }
    };

  const toggleOrientation = (): void => {
    setOrientationLabel(orientation);
    switch (orientation) {
      case Orientation.VERTICAL:
        setOrientation(Orientation.HORIZONTAL);
        break;
      case Orientation.HORIZONTAL:
        setOrientation(Orientation.VERTICAL);
        break;
    }
  };

  const onSelectFretNumber = (fretNumber: string): void =>
    setFretNumbers(FretNumberType[fretNumber as keyof typeof FretNumberType]);

  const fretCount = (scale?: ScaleModel, chord?: ChordPosition) =>
    scale
      ? scale.fretzNumber
      : chord
        ? chordFretSize || CHORD_FRETS
        : defaultFretSize || DEFAULT_FRETS;

  const context = {
    diagramStyle: diagramStyle || DEFAULT_STYLE,
    fretCount,
    stringCount,
    guitarTypes,
    guitarType,
    onlySupportedGuitars,
    setGuitarType,
    tuningTypes,
    tuningType,
    setTuningType,
    leftHanded,
    setLeftHanded,
    orientation: orientation,
    toggleOrientation,
    orientationLabel,
    fretNumbers,
    onSelectFretNumber,
    check: () => null,
  };

  return <SettingsContext.Provider value={context}>{children}</SettingsContext.Provider>;
};

export { SettingsContextProvider, useSettings };
