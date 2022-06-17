import React, { PropsWithChildren, useEffect, useState } from 'react';
import { SettingsContext } from './use-settings';
import { Orientation } from '../../common/fretboard';
import {
  guitarTypes,
  defaultGuitar,
  extractTuning,
  standardTuning,
  GuitarType,
  StringTuningType,
} from '../constants';

const SettingsContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [guitarType, setGuitarType] = useState<GuitarType>(defaultGuitar);
  const [tuningTypes, setTuningTypes] = useState<StringTuningType[]>([]);
  const [tuningType, setTuningType] = useState<StringTuningType>(standardTuning());
  const [leftHanded, setLeftHanded] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.VERTICAL);
  const [orientationLabel, setOrientationLabel] = useState<string>(
    Orientation.HORIZONTAL.toString()
  );

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
    setOrientationLabel(orientation.toString());
    switch (orientation) {
      case Orientation.VERTICAL:
        setOrientation(Orientation.HORIZONTAL);
        break;
      case Orientation.HORIZONTAL:
        setOrientation(Orientation.VERTICAL);
        break;
    }
  };

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
    check: () => null,
  };

  return <SettingsContext.Provider value={context}>{children}</SettingsContext.Provider>;
};

export default SettingsContextProvider;
