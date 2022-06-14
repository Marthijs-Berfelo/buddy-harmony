import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { ScaleModel } from '../components/fretboard';
import * as gs from 'guitar-scales';
import { useSettings } from './settings';
import { KeysHook, useKeys } from './use-keys';

export interface GuitarScaleHook extends KeysHook {
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
  scaleModel: () => ScaleModel | undefined;
}

export const useGuitarScale = (): GuitarScaleHook => {
  const guitarScale = gs.GuitarScale;
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { tuningType } = useSettings();
  const [scale, setScale] = useState<string>();

  useEffect(() => {
    //TODO library error when setting tuning
    console.log('TUNING', tuningType);
    //guitarScale.setTuning(tuningType.tuning);
  }, [tuningType]);

  const scaleModel = useCallback((): ScaleModel | undefined => {
    if (!!selectedKey && !!scale) {
      const model = guitarScale.get(selectedKey, scale);
      return model as ScaleModel;
    } else {
      return;
    }
  }, [selectedKey, scale]);

  return {
    keys,
    selectedKey,
    setSelectedKey,
    scales: guitarScale.getNames(),
    scale,
    setScale,
    scaleModel,
  };
};
