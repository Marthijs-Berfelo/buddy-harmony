import { createContext, JSX, PropsWithChildren, useContext } from 'react';
import { PrintableProps } from 'hooks';
import { CagedHook, useCaged } from './use-caged';

const CagedContext = createContext<CagedHook | undefined>(undefined);

export const CagedProvider = ({
  children,
  printRef,
}: PropsWithChildren<PrintableProps>): JSX.Element => {
  const caged = useCaged({ printRef });
  return <CagedContext.Provider value={caged}>{children}</CagedContext.Provider>;
};

export const useCagedContext = (): CagedHook => {
  const context = useContext(CagedContext);
  if (context) {
    return context;
  }
  throw new Error('`useCagedContext` must be used with `CagedProvider`');
};
