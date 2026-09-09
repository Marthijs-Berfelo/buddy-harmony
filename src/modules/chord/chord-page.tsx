import type { JSX } from 'react';
import { GuitarChordProvider } from './hooks';
import { ChordToolBar } from './components/chord-tool-bar';
import { ChordContent } from './components/chord-content';

export const ChordPage = (): JSX.Element => {
  return (
    <div className="page" id="chord-page">
      <GuitarChordProvider>
        <ChordToolBar />
        <ChordContent />
      </GuitarChordProvider>
    </div>
  );
};
