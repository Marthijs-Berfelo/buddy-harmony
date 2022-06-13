import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Tuning } from 'fretboard-api';
import { GuitarType, SettingsContext, StringTuningType } from './use-settings';
import { Orientation } from '../../components/fretboard';

const standardTuning: StringTuningType = {
  name: 'STANDARD',
  tuning: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'],
};

const guitarTypes = Object.entries(Tuning).map((value) => ({ name: value[0], type: value[1] }));

const SettingsContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [guitarType, setGuitarType] = useState<GuitarType>({ name: 'guitar', type: Tuning.guitar });
  const [tuningTypes, setTuningTypes] = useState<StringTuningType[]>([]);
  const [tuningType, setTuningType] = useState<StringTuningType>(standardTuning);
  const [leftHanded, setLeftHanded] = useState<boolean>(false);
  const [orientation, setOrientation] = useState<Orientation>(Orientation.VERTICAL);
  const [orientationLabel, setOrientationLabel] = useState<string>(
    Orientation.HORIZONTAL.toString()
  );

  useEffect(() => {
    const tunings = Object.entries(guitarType.type).map((value) => ({
      name: value[0],
      tuning: value[1],
    }));
    setTuningTypes(tunings);
  }, [guitarType]);

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
