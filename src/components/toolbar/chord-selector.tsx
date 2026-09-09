import type { JSX } from 'react';
import { ChordDetail, useSettings } from 'hooks';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NoteWaveLoader } from '@/components/ui/note-wave-loader';

interface ChordSelectorProps {
  chords: ChordDetail[];
  chord?: ChordDetail;
  setChord: Dispatch<SetStateAction<ChordDetail | undefined>>;
}
export const ChordSelector = ({ chords, chord, setChord }: ChordSelectorProps): JSX.Element => {
  const { t } = useTranslation(['chord']);
  const { chordDataLoading } = useSettings();

  if (chordDataLoading) {
    return (
      <Button
        variant="ghost"
        disabled
        className="capitalize text-slate-500 bg-gray-200 hover:bg-gray-200 w-48"
      >
        <NoteWaveLoader />
      </Button>
    );
  }

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
