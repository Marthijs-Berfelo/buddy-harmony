import { ChordDetail } from '../../../hooks';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';

interface ChordSelectorProps {
  chords: ChordDetail[];
  chord?: ChordDetail;
  setChord: Dispatch<SetStateAction<ChordDetail | undefined>>;
}
const ChordSelector = ({ chords, chord, setChord }: ChordSelectorProps): JSX.Element => {
  const { t } = useTranslation(['chord']);
  return chords.length < 2 ? (
    <Button
      variant="text"
      disabled
      color="blue-grey"
      className="capitalize bg-grey-200 hover:bg-grey-200 w-40"
    >
      {t('chord:title', !!chord ? { context: 'selected', chord } : undefined)}
    </Button>
  ) : (
    <Menu offset={3}>
      <MenuHandler>
        <Button variant="outlined" className="capitalize bg-white w-40">
          {t('chord:title', !!chord ? { context: 'selected', chord } : undefined)}
        </Button>
      </MenuHandler>
      <MenuList className="max-h-96 overflow-y-auto">
        {chords.map((option) => (
          <MenuItem
            key={option.suffix}
            disabled={option.suffix === chord?.suffix}
            className={'justify-items-stretch'}
            onClick={() => setChord(option)}
          >
            {option.suffix}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ChordSelector;
