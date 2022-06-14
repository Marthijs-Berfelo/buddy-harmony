import { GuitarChordHook, chordGuitarTypes } from '../../../hooks';
import { Toolbar } from '../../../components';
import { Option, Select } from '@material-tailwind/react';
import React from 'react';

const ChordToolBar = ({
  keys,
  selectedKey,
  setSelectedKey,
  chords,
  chord,
  setChord,
}: GuitarChordHook): JSX.Element => (
  <Toolbar
    title={'Chord'}
    supportedGuitars={chordGuitarTypes}
    tools={[
      <Select
        key={'chord-note'}
        label="Key"
        className="flex items-center bg-white z-40"
        selected={(value) => {
          if (value?.key && value?.key !== selectedKey) {
            setSelectedKey(value?.key?.toString());
          }
          return value;
        }}
      >
        {keys.map((noteOption) => (
          <Option key={noteOption}>{noteOption}</Option>
        ))}
      </Select>,
      <Select
        key={'chord-chord'}
        label="Chord"
        className="flex items-center bg-white"
        selected={(value) => {
          if (value?.key && value?.key !== chord) {
            setChord(value?.key?.toString());
          }
          return value;
        }}
      >
        {chords.map((chordOption) => (
          <Option key={chordOption}>{chordOption}</Option>
        ))}
      </Select>,
    ]}
  />
);

export default ChordToolBar;
