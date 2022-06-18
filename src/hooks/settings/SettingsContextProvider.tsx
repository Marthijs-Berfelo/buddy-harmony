import React, { PropsWithChildren, useEffect, useState } from 'react';
import { SettingsContext } from './use-settings';
import { FretNumberType, Orientation } from '../../common/fretboard';
import {
  defaultGuitar,
  extractTuning,
  GuitarType,
  guitarTypes,
  standardTuning,
  StringTuningType,
} from '../constants';

const SettingsContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [guitarType, setGuitarType] = useState<GuitarType>(defaultGuitar);
  const [tuningTypes, setTuningTypes] = useState<StringTuningType[]>([]);
  const [tuningType, setTuningType] = useState<StringTuningType>(standardTuning());
  const [leftHanded, setLeftHanded] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.VERTICAL);
  const [orientationLabel, setOrientationLabel] = useState<Orientation>(Orientation.HORIZONTAL);
  const [fretNumbers, setFretNumbers] = useState<FretNumberType>(FretNumberType.ROMAN);

  useEffect(() => {
    const tunings = extractTuning(guitarType);
    setTuningTypes(tunings);
  }, [guitarType]);

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

  const context = {
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

export default SettingsContextProvider;
