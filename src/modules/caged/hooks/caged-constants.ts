import { ChordPosition } from 'hooks';

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

export interface CagedConfig {
  C: CagedKeyConfig;
  A: CagedKeyConfig;
  G: CagedKeyConfig;
  E: CagedKeyConfig;
  D: CagedKeyConfig;
}

export type CagedLetter = keyof CagedChords;

export const CAGED_SCALE_SHORTLIST: Record<'major' | 'minor' | '7', string[]> = {
  'major': ['major', 'major pentatonic', 'lydian'],
  'minor': ['aeolian', 'minor pentatonic', 'harmonic minor', 'melodic minor'],
  '7': ['mixolydian', 'mixolydian pentatonic', 'lydian dominant'],
};

export interface CagedColor {
  caged: string;
  bg: string;
  border: string;
}

export const CAGED_COLORS: Record<CagedLetter, CagedColor> = {
  C: {
    caged: 'stroke-blue-700 fill-blue-700',
    bg: 'bg-blue-700',
    border: 'border-blue-700',
  },
  A: {
    caged: 'stroke-red-700 fill-red-700',
    bg: 'bg-red-700',
    border: 'border-red-700',
  },
  G: {
    caged: 'stroke-green-700 fill-green-700',
    bg: 'bg-green-700',
    border: 'border-green-700',
  },
  E: {
    caged: 'stroke-orange-800 fill-orange-800',
    bg: 'bg-orange-800',
    border: 'border-orange-800',
  },
  D: {
    caged: 'stroke-violet-800 fill-violet-800',
    bg: 'bg-violet-800',
    border: 'border-violet-800',
  },
};

export const majorCagedConfig: CagedConfig = {
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
      key: 'C',
      position: 1,
      root: 'C3',
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

export const cagedConfigs = new Map<string, CagedConfig>([
  ['major', majorCagedConfig],
  [
    'minor',
    {
      C: {
        open: {
          key: 'C',
          position: 0,
          root: 'C3',
          rootString: 1,
        },
        base: {
          key: 'C#',
          position: 0,
          root: 'C#3',
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
          key: 'C',
          position: 1,
          root: 'C3',
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
          key: 'F',
          position: 1,
          root: 'F3',
          rootString: 2,
        },
      },
    },
  ],
  [
    '7',
    {
      C: {
        open: {
          key: 'C',
          position: 0,
          root: 'C3',
          rootString: 1,
        },
        base: {
          key: 'C#',
          position: 0,
          root: 'C#3',
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
          key: 'C',
          position: 1,
          root: 'C3',
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
          key: 'F',
          position: 1,
          root: 'F3',
          rootString: 2,
        },
      },
    },
  ],
]);

interface CagedChordPosition extends CagedPositionConfig {
  chord: ChordPosition;
}
