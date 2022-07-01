import instrumentsJson from '@tombatossals/chords-db/lib/instruments.json';
import guitarJson from '@tombatossals/chords-db/lib/guitar.json';
import ukuleleJson from '@tombatossals/chords-db/lib/ukulele.json';
import { Dispatch, SetStateAction } from 'react';
import { GuitarType } from './constants';

interface Instruments {
  [name: string]: InstrumentMain;
}

interface InstrumentMain {
  name: string;
  fretsOnChord: number;
  strings: number;
  numberOfChords: number;
}

interface Tunings {
  [name: string]: string[];
}

export interface ChordPosition {
  frets: number[];
  fingers: number[];
  baseFret: number;
  barres?: number[];
  capo?: boolean;
  midi: number[];
  notes?: string[];
}
export interface ChordDetail {
  key: string;
  suffix: string;
  positions: ChordPosition[];
}

interface Chord {
  [name: string]: ChordDetail[];
}

export interface Instrument {
  main: InstrumentMain;
  keys: string[];
  suffixes: string[];
  tunings: Tunings;
  chords: Chord;
}

export interface ChordsHook {
  chords: ChordDetail[];
  chord?: ChordDetail;
  setChord: Dispatch<SetStateAction<ChordDetail | undefined>>;
}

export const guitar: Instrument = guitarJson;
export const ukulele: Instrument = ukuleleJson;
export const instruments: Instruments = instrumentsJson;

const getInstrument = (instrument: string): Instrument => {
  if (instrument === guitar.main.name) {
    return guitar;
  } else if (instrument === ukulele.main.name) {
    return ukulele;
  } else {
    throw new Error(`Unsupported CHORD instrument: ${instrument}`);
  }
};

const getChords = (instrument: string): ChordDetail[] =>
  Object.values(getInstrument(instrument).chords).flat();

export const chordTuning = (instrument: string): Tunings => getInstrument(instrument).tunings;

export const handleSelectionForChords = (
  guitarType: GuitarType,
  selectedKey: string | undefined,
  isSupported: (guitarType: GuitarType) => boolean,
  getChords: (instrument: string, key: string) => ChordDetail[],
  setChords: Dispatch<SetStateAction<ChordDetail[]>>,
  setChord: Dispatch<SetStateAction<ChordDetail | undefined>>,
  chord?: ChordDetail
): void => {
  if (isSupported(guitarType) && !!selectedKey) {
    const chords = getChords(guitarType.name, selectedKey);
    setChords(chords);
    if (chords.length === 1) {
      setChord(chords[0]);
    }
    if (
      chords.length > 1 &&
      chords.findIndex((type) => type.suffix === (chord?.suffix || type.suffix)) < 0
    ) {
      setChord(undefined);
    }
  } else {
    setChords([]);
    setChord(undefined);
  }
};

export const chordsForKey = (instrument: string, key: string): ChordDetail[] =>
  getChords(instrument).filter((chord) => chord.key === key);

export const chordModels = (instrument: string, key: string, name: string): ChordDetail[] =>
  getChords(instrument).filter((chord) => chord.key === key && chord.suffix === name);

export const chordNamesForKey = (instrument: string, key: string): string[] =>
  chordsForKey(instrument, key).map((chord) => chord.suffix);

export const cagedChordsForKey = (instrument: string, key: string): ChordDetail[] =>
  chordsForKey(instrument, key)
    .filter((chord) => chordNamesForKey(instrument, 'C').includes(chord.suffix))
    .filter((chord) => chordNamesForKey(instrument, 'A').includes(chord.suffix))
    .filter((chord) => chordNamesForKey(instrument, 'G').includes(chord.suffix))
    .filter((chord) => chordNamesForKey(instrument, 'E').includes(chord.suffix))
    .filter((chord) => chordNamesForKey(instrument, 'D').includes(chord.suffix));
