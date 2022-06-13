import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { NoteHook, useNote } from './use-notes';
import { ScaleModel } from '../components/fretboard';
import * as gs from 'guitar-scales';
import { useSettings } from './settings';

export interface GuitarScaleHook extends NoteHook {
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
  scaleModel: () => ScaleModel | undefined;
}

export const useGuitarScale = (): GuitarScaleHook => {
  const guitarScale = gs.GuitarScale;
  const { notes, note, setNote } = useNote();
  const { tuningType } = useSettings();
  const [scale, setScale] = useState<string>();

  useEffect(() => {
    //TODO library error when setting tuning
    console.log('TUNING', tuningType);
    //guitarScale.setTuning(tuningType.tuning);
  }, [tuningType]);

  const scaleModel = useCallback((): ScaleModel | undefined => {
    if (!!note && !!scale) {
      const model = guitarScale.get(note, scale);
      return model as ScaleModel;
    } else {
      return;
    }
  }, [note, scale]);

  return {
    notes,
    note,
    setNote,
    scales: guitarScale.getNames(),
    scale,
    setScale,
    scaleModel,
  };
};
