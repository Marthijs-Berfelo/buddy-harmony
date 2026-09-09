import type { JSX } from 'react';
import { useRef } from 'react';
import { GuitarChordProvider } from './hooks';
import ChordToolBar from './components/ChordToolBar';
import ChordContent from './components/ChordContent';

const ChordPage = (): JSX.Element => {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="page" id="chord-page">
      <GuitarChordProvider printRef={printRef}>
        <ChordToolBar />
        <ChordContent />
      </GuitarChordProvider>
    </div>
  );
};

export default ChordPage;
