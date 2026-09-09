import type { JSX } from 'react';
import { useSettings } from 'hooks';
import { ChordSelector, KeySelector } from 'components/toolbar';
import { Toolbar } from 'layout/toolbar';
import React from 'react';
import { Pages } from 'routing/pages';
import { useGuitarChord } from '../hooks';

const context = Pages.CHORD;

export const ChordToolBar = (): JSX.Element => {
  const { keys, selectedKey, setSelectedKey, chords, chord, setChord, printRef } = useGuitarChord();
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
