import { chordGuitarTypes, GuitarChordHook } from '../../../hooks';
import { Toolbar } from '../../../common';
import { Option, Select } from '@material-tailwind/react';
import React from 'react';
import { Pages } from '../../../common/routing/pages';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('chord');
  return (
    <Toolbar
      page={context}
      supportedGuitars={chordGuitarTypes}
      printRef={printRef}
      tools={[
        <Select
          key={'chord-note'}
          label={t('common:key')}
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
          label={t('common:page.title', { context })}
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
};

export default ChordToolBar;
