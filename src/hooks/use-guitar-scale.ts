import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Orientation, ScaleModel } from '../common/fretboard';
import * as gs from 'guitar-scales';
import { KeysHook, useKeys } from './use-keys';
import { Printable, PrintableProps } from './constants';

export interface GuitarScaleHook extends KeysHook, Printable {
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
  scaleModel: ScaleModel | undefined;
}

export const useGuitarScale = ({ printRef }: PrintableProps): GuitarScaleHook => {
  const guitarScale = gs.GuitarScale;
  const { keys, selectedKey, setSelectedKey } = useKeys();
  // const { tuningType } = useSettings();
  const [scale, setScale] = useState<string>();
  const [scaleModel, setScaleModel] = useState<ScaleModel>();

  // useEffect(() => {
  // //TODO library error when setting tuning
  //   console.log('TUNING', tuningType);
  //   //guitarScale.setTuning(tuningType.tuning);
  // }, [tuningType]);

  useEffect(() => {
    if (!!selectedKey && !!scale) {
      const model = guitarScale.get(selectedKey, scale);
      setScaleModel(model as ScaleModel);
    } else {
      setScaleModel(undefined);
    }
  }, [selectedKey, scale]);

  const printStyle = (orientation: Orientation): string =>
    `@page: { size: A4 ${
      orientation === Orientation.HORIZONTAL ? 'landscape' : 'portrait'
    }, margin: 10mm 10mm 10mm 10mm }`;

  return {
    keys,
    selectedKey,
    setSelectedKey,
    scales: guitarScale.getNames(),
    scale,
    setScale,
    scaleModel,
    printRef,
    printStyle,
  };
};
