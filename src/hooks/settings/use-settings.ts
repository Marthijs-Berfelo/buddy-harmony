import { BaseContext } from '../base-context';
import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { Tuning, TuningType } from 'fretboard-api';
import { Orientation } from '../../components/fretboard';

export type GuitarType = {
  name: string;
  type: TuningType;
};

export type StringTuningType = {
  name: string;
  tuning: string[];
};

export interface Settings extends BaseContext {
  guitarTypes: GuitarType[];
  guitarType: GuitarType;
  setGuitarType: Dispatch<SetStateAction<GuitarType>>;
  tuningTypes: StringTuningType[];
  tuningType: StringTuningType;
  setTuningType: Dispatch<SetStateAction<StringTuningType>>;
  leftHanded: boolean;
  setLeftHanded: Dispatch<SetStateAction<boolean>>;
  orientation: Orientation;
  orientationLabel: string;
  toggleOrientation: () => void;
}

export const SettingsContext = createContext<Settings>({
  guitarTypes: [],
  guitarType: { name: 'guitar', type: Tuning.guitar },
  setGuitarType: () => null,
  tuningTypes: [],
  tuningType: { name: 'none', tuning: [] },
  setTuningType: () => null,
  leftHanded: false,
  setLeftHanded: () => null,
  orientation: Orientation.VERTICAL,
  orientationLabel: '',
  toggleOrientation: () => null,
  check: () => {
    throw new Error('`useSettings` must be used with `SettingsContextProvider`');
  },
});

export const useSettings = (): Settings => {
  const context = useContext(SettingsContext);
  context.check();
  return context;
};
