import type { JSX } from 'react';
import React from 'react';
import { Pages } from 'routing/pages';
import { ChordSelector, KeySelector } from 'components/toolbar';
import Toolbar from 'layout/toolbar/Toolbar';
import { useSettings } from 'hooks';
import { useCagedContext } from '../hooks';

const context = Pages.CAGED;

const CagedToolBar = (): JSX.Element => {
  const { keys, selectedKey, setSelectedKey, chords, chord, setChord, printRef } =
    useCagedContext();
  const { chordGuitarTypes } = useSettings();
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
