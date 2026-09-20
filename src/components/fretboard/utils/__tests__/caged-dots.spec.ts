import { dedupeCagedDots } from '../caged-dots';
import { ChordPosition } from 'hooks';

const chord = (overrides: Partial<ChordPosition>): ChordPosition => ({
  frets: [-1, 0, 0, 0, 0, 0],
  fingers: [0, 0, 0, 0, 0, 0],
  baseFret: 1,
  midi: [],
  ...overrides,
});

describe('dedupeCagedDots', () => {
  test('emits one dot per fretted string, converting to an absolute fret', () => {
    const shape = {
      chord: chord({ frets: [-1, 3, 2, 0, 1, 0], baseFret: 1, notes: ['', 'C3', 'E3', '', 'C4', ''] }),
      color: 'stroke-blue-700 fill-blue-700',
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots).toEqual([
      { string: 1, fret: 3, color: 'stroke-blue-700 fill-blue-700', note: 'C3' },
      { string: 2, fret: 2, color: 'stroke-blue-700 fill-blue-700', note: 'E3' },
      { string: 4, fret: 1, color: 'stroke-blue-700 fill-blue-700', note: 'C4' },
    ]);
  });

  test('an earlier shape wins when two shapes share a (string, absoluteFret) position', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, 2, 0, 1, 0], baseFret: 1 }),
      color: 'stroke-blue-700 fill-blue-700',
    };
    const later = {
      chord: chord({ frets: [-1, 3, 2, 0, 1, 0], baseFret: 1 }),
      color: 'stroke-red-700 fill-red-700',
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(3);
    expect(dots.every((dot) => dot.color === 'stroke-blue-700 fill-blue-700')).toBe(true);
  });

  test('skips muted (-1) and open (0) strings entirely', () => {
    const shape = {
      chord: chord({ frets: [-1, 0, 2, 0, 1, 0], baseFret: 1 }),
      color: 'stroke-green-700 fill-green-700',
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots.map((dot) => dot.string)).toEqual([2, 4]);
  });

  test('converts a fretted note to its true absolute fret using baseFret', () => {
    const shape = {
      chord: chord({ frets: [-1, -1, 1, 1, 1, 4], baseFret: 5 }),
      color: 'stroke-blue-700 fill-blue-700',
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots.map((dot) => dot.fret)).toEqual([5, 5, 5, 8]);
  });

  test('detects a collision even when the colliding shapes have different baseFret values', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, 0, 0, 0, 0], baseFret: 1 }),
      color: 'stroke-blue-700 fill-blue-700',
    };
    const later = {
      chord: chord({ frets: [-1, 1, 0, 0, 0, 0], baseFret: 3 }),
      color: 'stroke-red-700 fill-red-700',
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(1);
    expect(dots[0]).toMatchObject({ string: 1, fret: 3, color: 'stroke-blue-700 fill-blue-700' });
  });

  test('keeps both dots when two shapes fret the same string at different absolute frets', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, 0, 0, 0, 0], baseFret: 1 }),
      color: 'stroke-blue-700 fill-blue-700',
    };
    const later = {
      chord: chord({ frets: [-1, 2, 0, 0, 0, 0], baseFret: 5 }),
      color: 'stroke-red-700 fill-red-700',
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(2);
    expect(dots.map((dot) => dot.fret).sort((a, b) => a - b)).toEqual([3, 6]);
  });
});
