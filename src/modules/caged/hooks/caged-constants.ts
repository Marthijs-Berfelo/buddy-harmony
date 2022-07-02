import { ChordPosition } from '../../../hooks';

export interface CagedPositionConfig {
  key: string;
  position: number;
  root: string;
  rootString: number;
}

export interface CagedKeyConfig {
  open: CagedPositionConfig;
  base: CagedPositionConfig;
}

export interface CagedKey {
  open: CagedChordPosition;
  base: CagedChordPosition;
  positioned: CagedChordPosition;
}

export interface CagedChords {
  C: CagedKey;
  A: CagedKey;
  G: CagedKey;
  E: CagedKey;
  D: CagedKey;
}

export const cagedConfig: CagedConfig = {
  C: {
    open: {
      key: 'C',
      position: 0,
      root: 'C3',
      rootString: 1,
    },
    base: {
      key: 'D',
      position: 1,
      root: 'D3',
      rootString: 1,
    },
  },
  A: {
    open: {
      key: 'A',
      position: 0,
      root: 'A2',
      rootString: 1,
    },
    base: {
      key: 'B',
      position: 0,
      root: 'B2',
      rootString: 1,
    },
  },
  G: {
    open: {
      key: 'G',
      position: 0,
      root: 'G2',
      rootString: 0,
    },
    base: {
      key: 'C',
      position: 2,
      root: 'C3',
      rootString: 0,
    },
  },
  E: {
    open: {
      key: 'E',
      position: 0,
      root: 'E2',
      rootString: 0,
    },
    base: {
      key: 'F',
      position: 0,
      root: 'F2',
      rootString: 0,
    },
  },
  D: {
    open: {
      key: 'D',
      position: 0,
      root: 'D3',
      rootString: 2,
    },
    base: {
      key: 'E',
      position: 1,
      root: 'E3',
      rootString: 2,
    },
  },
};

interface CagedChordPosition extends CagedPositionConfig {
  chord: ChordPosition;
}

interface CagedConfig {
  C: CagedKeyConfig;
  A: CagedKeyConfig;
  G: CagedKeyConfig;
  E: CagedKeyConfig;
  D: CagedKeyConfig;
}
