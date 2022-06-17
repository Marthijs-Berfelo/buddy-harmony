import React from 'react';
import { useGuitarChord } from '../../hooks';
import ChordToolBar from './components/ChordToolBar';
import ChordContent from './components/ChordContent';
import '../../common/Page.css';

const ChordPage = (): JSX.Element => {
  const hook = useGuitarChord();

  return (
    <div className="page" id="chord-page">
      <ChordToolBar {...hook} />
      <ChordContent {...hook} />
    </div>
  );
};

export default ChordPage;
