import React from 'react';
import { Pages } from 'common/routing/pages';
import { ChordSelector, KeySelector, Toolbar } from '../../../common';
import { CagedHook, chordGuitarTypes } from '../../../hooks';

const context = Pages.CAGED;

const CagedToolBar = ({
  keys,
  selectedKey,
  setSelectedKey,
  chords,
  chord,
  setChord,
  printRef,
}: CagedHook): JSX.Element => {
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

export default CagedToolBar;
