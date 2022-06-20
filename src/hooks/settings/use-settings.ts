import { BaseContext } from '../base-context';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { DEFAULT_STYLE, FretNumberType, Orientation, ScaleModel } from '../../common/fretboard';
import { defaultGuitar, GuitarType, StringTuningType } from '../constants';
import { DiagramStyle } from '../../common/fretboard/utils';
import { ChordPosition } from '../chord-db';

export interface Settings extends BaseContext {
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

export const SettingsContext = createContext<Settings>({
  diagramStyle: DEFAULT_STYLE,
  fretCount: () => 0,
  stringCount: 0,
  guitarTypes: [],
  guitarType: defaultGuitar,
  onlySupportedGuitars: () => () => false,
  setGuitarType: () => null,
  tuningTypes: [],
  tuningType: { name: 'none', tuning: [] },
  setTuningType: () => null,
  leftHanded: false,
  setLeftHanded: () => null,
  orientation: Orientation.VERTICAL,
  orientationLabel: Orientation.HORIZONTAL,
  toggleOrientation: () => null,
  fretNumbers: FretNumberType.ROMAN,
  onSelectFretNumber: () => null,
  check: () => {
    throw new Error('`useSettings` must be used with `SettingsContextProvider`');
  },
});

export const useSettings = (): Settings => {
  const context = useContext(SettingsContext);
  context.check();
  return context;
};
