import instrumentsJson from '@tombatossals/chords-db/lib/instruments.json';
import guitarJson from '@tombatossals/chords-db/lib/guitar.json';
import ukuleleJson from '@tombatossals/chords-db/lib/ukulele.json';

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

export const chordNames = (instrument: string): string[] => getInstrument(instrument).suffixes;

export const chordModels = (instrument: string, key: string, name: string): ChordDetail[] =>
  getChords(instrument).filter((chord) => chord.key === key && chord.suffix === name);
