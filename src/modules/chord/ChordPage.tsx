import React from 'react';
import { guitar } from '../../hooks';
import { useGuitarChord } from '../../hooks';
import ChordToolBar from './components/ChordToolBar';
import ChordContent from './components/ChordContent';

const ChordPage = (): JSX.Element => {
  const hook = useGuitarChord();
  console.log('chords', guitar);
  return (
    <div className="page" id="chord-page">
      <ChordToolBar {...hook} />
      <ChordContent {...hook} />
    </div>
  );
};

export default ChordPage;
