import { chordGuitarTypes, GuitarChordHook } from '../../../hooks';
import { ChordSelector, KeySelector, Toolbar } from '../../../common';
import React from 'react';
import { Pages } from '../../../common/routing/pages';

const context = Pages.CHORD;

const ChordToolBar = ({
  keys,
  selectedKey,
  setSelectedKey,
  chords,
  chord,
  setChord,
  printRef,
}: GuitarChordHook): JSX.Element => {
  return (
    <Toolbar
      page={context}
      supportedGuitars={chordGuitarTypes}
      printRef={printRef}
      printDisabled={!chord}
      tools={[
        <KeySelector key={'caged-key'} {...{ keys, selectedKey, setSelectedKey }} />,
        <ChordSelector key={'caged-chord'} {...{ chords, chord, setChord }} />,
      ]}
    />
  );
};

export default ChordToolBar;
