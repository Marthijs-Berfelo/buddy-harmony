import type { JSX } from 'react';
import { useSettings } from '@/hooks';
import { ChordSelector, KeySelector, Toolbar } from '../../../common';
import React from 'react';
import { Pages } from '@/common/routing/pages.ts';
import { GuitarChordHook } from '../hooks';

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

export default ChordToolBar;
