import {
  createContext,
  Dispatch,
  JSX,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { HelpSection } from '@/help/content-types';

interface HelpDrawer {
  isOpen: boolean;
  activeSection?: HelpSection;
  open: (section: HelpSection) => void;
  close: () => void;
}

const HelpDrawerContext = createContext<HelpDrawer | undefined>(undefined);

const useHelpDrawer = (): HelpDrawer => {
  const context = useContext(HelpDrawerContext);
  if (context) {
    return context;
  }
  throw new Error('`useHelpDrawer` must be used with `HelpDrawerProvider`');
};

const HelpDrawerProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);
  const [activeSection, setActiveSection] = useState<HelpSection | undefined>(undefined);
  const location = useLocation();
  const [lastPathname, setLastPathname] = useState(location.pathname);

  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname);
    setIsOpen(false);
  }

  const open = useCallback((section: HelpSection) => {
    setActiveSection(section);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const context = useMemo<HelpDrawer>(
    () => ({ isOpen, activeSection, open, close }),
    [isOpen, activeSection, open, close]
  );

  return <HelpDrawerContext.Provider value={context}>{children}</HelpDrawerContext.Provider>;
};

export { HelpDrawerProvider, useHelpDrawer };
