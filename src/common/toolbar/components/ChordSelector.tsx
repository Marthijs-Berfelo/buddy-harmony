import type { JSX } from 'react';
import { ChordDetail } from '../../../hooks';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

interface ChordSelectorProps {
  chords: ChordDetail[];
  chord?: ChordDetail;
  setChord: Dispatch<SetStateAction<ChordDetail | undefined>>;
}
const ChordSelector = ({ chords, chord, setChord }: ChordSelectorProps): JSX.Element => {
  const { t } = useTranslation(['chord']);
  return chords.length < 2 ? (
    <Button
      variant="ghost"
      disabled
      className="capitalize text-slate-500 bg-gray-200 hover:bg-gray-200 w-48"
    >
      {t('chord:title', chord ? { context: 'selected', chord } : undefined)}
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize bg-white w-48">
          {t('chord:title', chord ? { context: 'selected', chord } : undefined)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {chords.map((option) => (
          <DropdownMenuItem
            key={option.suffix}
            disabled={option.suffix === chord?.suffix}
            onClick={() => setChord(option)}
          >
            {option.suffix}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChordSelector;
