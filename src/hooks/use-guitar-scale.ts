import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ScaleModel } from '../common/fretboard';
import * as gs from 'guitar-scales';
import { useSettings } from './settings';
import { KeysHook, useKeys } from './use-keys';

export interface GuitarScaleHook extends KeysHook {
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
  scaleModel: ScaleModel | undefined;
}

export const useGuitarScale = (): GuitarScaleHook => {
  const guitarScale = gs.GuitarScale;
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const { tuningType } = useSettings();
  const [scale, setScale] = useState<string>();
  const [scaleModel, setScaleModel] = useState<ScaleModel>();

  useEffect(() => {
    //TODO library error when setting tuning
    console.log('TUNING', tuningType);
    //guitarScale.setTuning(tuningType.tuning);
  }, [tuningType]);

  useEffect(() => {
    if (!!selectedKey && !!scale) {
      const model = guitarScale.get(selectedKey, scale);
      console.log('K', selectedKey, 'S', scale, 'M', model);
      setScaleModel(model as ScaleModel);
    } else {
      setScaleModel(undefined);
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
