import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { NoteHook, useNote } from './use-notes';
import { ScaleModel } from '../components/fretboard';
import * as gs from 'guitar-scales';

export interface GuitarScaleHook extends NoteHook {
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
  scaleModel: () => ScaleModel | undefined;
}

export const useGuitarScale = (): GuitarScaleHook => {
  const guitarScale = gs.GuitarScale;
  const { notes, note, setNote } = useNote();
  const [scale, setScale] = useState<string>();

  const scaleModel = useCallback((): ScaleModel | undefined => {
    console.log('NOTE', note, 'SCALE', scale);
    if (!!note && !!scale) {
      const model = guitarScale.get(note, scale);
      console.log('SCALE:', model);
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
