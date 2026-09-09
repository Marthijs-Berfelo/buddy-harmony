import {
  createContext,
  Dispatch,
  JSX,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Orientation, ScaleModel } from 'components/fretboard/options';
import * as gs from 'guitar-scales';
import { KeysHook, useKeys, Printable } from 'hooks';

export interface GuitarScaleHook extends KeysHook, Printable {
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
  scaleModel: ScaleModel | undefined;
}

const guitarScale = gs.GuitarScale;

const GuitarScaleContext = createContext<GuitarScaleHook | undefined>(undefined);

export const GuitarScaleProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const printRef = useRef<HTMLDivElement>(null);
  const { keys, selectedKey, setSelectedKey } = useKeys();
  const [scale, setScale] = useState<string>();

  const scaleModel = useMemo(() => {
    if (!!selectedKey && !!scale) {
      return guitarScale.get(selectedKey, scale) as ScaleModel;
    }
  }, [selectedKey, scale]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const printStyle = (_: Orientation): string =>
    `@page: { size: A4 portrait, margin: 0mm 30mm 30mm 30mm }`;

  const scaleHook: GuitarScaleHook = {
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

  return <GuitarScaleContext.Provider value={scaleHook}>{children}</GuitarScaleContext.Provider>;
};

export const useGuitarScale = (): GuitarScaleHook => {
  const context = useContext(GuitarScaleContext);
  if (context) {
    return context;
  }
  throw new Error('`useGuitarScale` must be used with `GuitarScaleProvider`');
};
