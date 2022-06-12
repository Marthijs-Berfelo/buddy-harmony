import { Dispatch, SetStateAction, useState } from 'react';

const NOTES = [
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
  'A',
  'A#',
  'Bb',
  'B',
];

export interface NoteHook {
  notes: string[];
  note?: string;
  setNote: Dispatch<SetStateAction<string | undefined>>;
}

export const useNote = (): NoteHook => {
  const [note, setNote] = useState<string>();

  return {
    notes: NOTES,
    note,
    setNote,
  };
};
