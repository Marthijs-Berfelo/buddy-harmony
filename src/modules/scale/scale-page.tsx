import type { JSX } from 'react';
import { GuitarScaleProvider } from './hooks';
import { ScaleToolBar } from './components/scale-tool-bar';
import { ScaleContent } from './components/scale-content';

export const ScalePage = (): JSX.Element => {
  return (
    <div className="page" id="scale-page">
      <GuitarScaleProvider>
        <ScaleToolBar />
        <ScaleContent />
      </GuitarScaleProvider>
    </div>
  );
};
