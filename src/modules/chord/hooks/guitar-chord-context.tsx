import { createContext, JSX, PropsWithChildren, useContext } from 'react';
import { PrintableProps } from 'hooks';
import { GuitarChordHook, useGuitarChord } from './use-guitar-chord';

const GuitarChordContext = createContext<GuitarChordHook | undefined>(undefined);

export const GuitarChordProvider = ({
  children,
  printRef,
}: PropsWithChildren<PrintableProps>): JSX.Element => {
  const chord = useGuitarChord({ printRef });
  return <GuitarChordContext.Provider value={chord}>{children}</GuitarChordContext.Provider>;
};

export const useGuitarChordContext = (): GuitarChordHook => {
  const context = useContext(GuitarChordContext);
  if (context) {
    return context;
  }
  throw new Error('`useGuitarChordContext` must be used with `GuitarChordProvider`');
};
