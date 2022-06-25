import { useEffect, useMemo, useState } from 'react';
import conf from 'tailwindcss/defaultConfig';
import { ScreensConfig } from 'tailwindcss/types/config';
import * as resolveConfig from 'tailwindcss/resolveConfig';

const fallbackScreens: ScreensConfig = {
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
};

const config = resolveConfig(conf);

interface BreakpointHook {
  minWidth: string;
  breakpoints: string[];
}

export const useBreakpoint = (): BreakpointHook => {
  const screens = useMemo(() => config.theme?.screens || fallbackScreens, []);
  const minWidth = useMemo(() => screens.sm, []);
  const [breakpoints, setBreakpoints] = useState<string[]>([]);

  useEffect(() => {
    function handleResize() {
      const breakpoints = Object.entries(screens)
        .filter((screen) => window.innerWidth > Number.parseInt(`${screen[1]}`.replace('px', '')))
        .map((screen) => screen[0]);
      console.log('BREAK POINTS', breakpoints);
      setBreakpoints(breakpoints);
    }
    window.addEventListener('resize', handleResize);
  }, []);

  return {
    minWidth,
    breakpoints,
  };
};
