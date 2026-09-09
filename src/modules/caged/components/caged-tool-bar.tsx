import type { JSX } from 'react';
import React from 'react';
import { Pages } from 'routing/pages';
import { ChordSelector, KeySelector } from 'components/toolbar';
import { Toolbar } from 'layout/toolbar';
import { useSettings } from 'hooks';
import { useCaged } from '../hooks';

const context = Pages.CAGED;

export const CagedToolBar = (): JSX.Element => {
  const { keys, selectedKey, setSelectedKey, chords, chord, setChord, printRef } = useCaged();
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
