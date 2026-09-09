import { createContext, JSX, PropsWithChildren, useContext } from 'react';
import { PrintableProps } from 'hooks';
import { GuitarScaleHook, useGuitarScale } from './use-guitar-scale';

const GuitarScaleContext = createContext<GuitarScaleHook | undefined>(undefined);

export const GuitarScaleProvider = ({
  children,
  printRef,
}: PropsWithChildren<PrintableProps>): JSX.Element => {
  const scale = useGuitarScale({ printRef });
  return <GuitarScaleContext.Provider value={scale}>{children}</GuitarScaleContext.Provider>;
};

export const useGuitarScaleContext = (): GuitarScaleHook => {
  const context = useContext(GuitarScaleContext);
  if (context) {
    return context;
  }
  throw new Error('`useGuitarScaleContext` must be used with `GuitarScaleProvider`');
};
