import React, { useRef } from 'react';
import { useGuitarChord } from './hooks';
import ChordToolBar from './components/ChordToolBar';
import ChordContent from './components/ChordContent';
import '../../common/Page.css';

const ChordPage = (): JSX.Element => {
  const printRef = useRef<HTMLDivElement>(null);
  const hook = useGuitarChord({ printRef });

  return (
    <div className="page" id="chord-page">
      <ChordToolBar {...hook} />
      <ChordContent {...hook} />
    </div>
  );
};

export default ChordPage;
