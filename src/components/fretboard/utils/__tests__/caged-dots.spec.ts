import { dedupeCagedDots, mergeCagedAndScaleDots, NEUTRAL_SCALE_DOT_COLOR } from '../caged-dots';
import { ChordPosition } from 'hooks';
import type { ScaleFret } from '../scale';

const chord = (overrides: Partial<ChordPosition>): ChordPosition => ({
  frets: [-1, 0, 0, 0, 0, 0],
  fingers: [0, 0, 0, 0, 0, 0],
  baseFret: 1,
  midi: [],
  ...overrides,
});

describe('dedupeCagedDots', () => {
  test('emits one dot per fretted or open string, converting fretted notes to an absolute fret', () => {
    const shape = {
      chord: chord({
        frets: [-1, 3, 2, 0, 1, 0],
        baseFret: 1,
        notes: ['', 'C3', 'E3', 'G3', 'C4', 'E4'],
      }),
      color: 'stroke-blue-700 fill-blue-700',
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots).toEqual([
      { string: 1, fret: 3, color: 'stroke-blue-700 fill-blue-700', note: 'C3' },
      { string: 2, fret: 2, color: 'stroke-blue-700 fill-blue-700', note: 'E3' },
      { string: 3, fret: 0, color: 'stroke-blue-700 fill-blue-700', note: 'G3' },
      { string: 4, fret: 1, color: 'stroke-blue-700 fill-blue-700', note: 'C4' },
      { string: 5, fret: 0, color: 'stroke-blue-700 fill-blue-700', note: 'E4' },
    ]);
  });

  test('an earlier shape wins when two shapes share a (string, absoluteFret) position', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, 2, -1, 1, -1], baseFret: 1 }),
      color: 'stroke-blue-700 fill-blue-700',
    };
    const later = {
      chord: chord({ frets: [-1, 3, 2, -1, 1, -1], baseFret: 1 }),
      color: 'stroke-red-700 fill-red-700',
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(3);
    expect(dots.every((dot) => dot.color === 'stroke-blue-700 fill-blue-700')).toBe(true);
  });

  test('skips muted (-1) strings but includes open (0) strings', () => {
    const shape = {
      chord: chord({ frets: [-1, 0, 2, 0, 1, 0], baseFret: 1 }),
      color: 'stroke-green-700 fill-green-700',
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots.map((dot) => dot.string)).toEqual([1, 2, 3, 4, 5]);
  });

  test('converts a fretted note to its true absolute fret using baseFret', () => {
    const shape = {
      chord: chord({ frets: [-1, -1, 1, 1, 1, 4], baseFret: 5 }),
      color: 'stroke-blue-700 fill-blue-700',
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots.map((dot) => dot.fret)).toEqual([5, 5, 5, 8]);
  });

  test('gives an open string absolute fret 0 regardless of baseFret', () => {
    const shape = {
      chord: chord({ frets: [-1, -1, 0, 1, 1, 4], baseFret: 5 }),
      color: 'stroke-blue-700 fill-blue-700',
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots).toEqual([
      { string: 2, fret: 0, color: 'stroke-blue-700 fill-blue-700', note: undefined },
      { string: 3, fret: 5, color: 'stroke-blue-700 fill-blue-700', note: undefined },
      { string: 4, fret: 5, color: 'stroke-blue-700 fill-blue-700', note: undefined },
      { string: 5, fret: 8, color: 'stroke-blue-700 fill-blue-700', note: undefined },
    ]);
  });

  test('detects a collision even when the colliding shapes have different baseFret values', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, -1, -1, -1, -1], baseFret: 1 }),
      color: 'stroke-blue-700 fill-blue-700',
    };
    const later = {
      chord: chord({ frets: [-1, 1, -1, -1, -1, -1], baseFret: 3 }),
      color: 'stroke-red-700 fill-red-700',
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(1);
    expect(dots[0]).toMatchObject({ string: 1, fret: 3, color: 'stroke-blue-700 fill-blue-700' });
  });

  test('keeps both dots when two shapes fret the same string at different absolute frets', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, -1, -1, -1, -1], baseFret: 1 }),
      color: 'stroke-blue-700 fill-blue-700',
    };
    const later = {
      chord: chord({ frets: [-1, 2, -1, -1, -1, -1], baseFret: 5 }),
      color: 'stroke-red-700 fill-red-700',
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(2);
    expect(dots.map((dot) => dot.fret).sort((a, b) => a - b)).toEqual([3, 6]);
  });
});

describe('mergeCagedAndScaleDots', () => {
  const scaleFret = (overrides: Partial<ScaleFret>): ScaleFret => ({
    note: 'C',
    noteEnharmonic: 'C',
    freet: 0,
    isPartOfScale: true,
    scalePosition: 1,
    ...overrides,
  });

  const cShape = {
    chord: chord({ frets: [-1, 3, 2, 0, 1, 0], baseFret: 1 }),
    color: 'stroke-blue-700 fill-blue-700',
  };
  const aShape = {
    chord: chord({ frets: [1, 3, 3, 2, 1, 1], baseFret: 5 }),
    color: 'stroke-red-700 fill-red-700',
  };

  // mergeCagedAndScaleDots flips scaleFrets' outer index into CagedDot's `string` space via
  // visualString = stringCount - 1 - stringIndex. With stringCount 6, to target visual
  // string N, the ScaleFret content must live at scaleFrets[5 - N].

  test('skips a scale tone that coincides with an existing CAGED dot', () => {
    // cShape frets string 1 at absolute fret 3. Targeting visual string 1 means putting
    // the ScaleFret at index 5 - 1 = 4.
    const scaleFrets: ScaleFret[][] = [
      [],
      [],
      [],
      [],
      [scaleFret({ freet: 3, scalePosition: 3 })],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    // string 1 fret 3 is already a CAGED dot (from dedupeCagedDots) — merge must not add a second dot there.
    expect(dots.filter((dot) => dot.string === 1 && dot.fret === 3)).toHaveLength(1);
    expect(dots.find((dot) => dot.string === 1 && dot.fret === 3)?.emphasized).toBeUndefined();
  });

  test('colors an uncovered triad tone using the owning shape range, with showTriads on', () => {
    // string 5 fret 3 (scalePosition 5) is not fretted by either shape, and falls inside
    // cShape's isolated range [0,3] (from its own dedupeCagedDots output, which includes
    // its open strings). Targeting visual string 5 means index 5 - 5 = 0.
    const scaleFrets: ScaleFret[][] = [
      [scaleFret({ freet: 3, scalePosition: 5, note: 'G' })],
      [],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    const merged = dots.find((dot) => dot.string === 5 && dot.fret === 3);
    expect(merged).toMatchObject({
      color: 'stroke-blue-700 fill-blue-700',
      emphasized: true,
      note: 'G',
    });
  });

  test('renders a triad tone as neutral when showTriads is false', () => {
    const scaleFrets: ScaleFret[][] = [
      [scaleFret({ freet: 3, scalePosition: 5, note: 'G' })],
      [],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, false);

    expect(dots.find((dot) => dot.string === 5 && dot.fret === 3)).toMatchObject({
      color: NEUTRAL_SCALE_DOT_COLOR,
      emphasized: false,
      note: 'G',
    });
  });

  test('renders a non-triad scale tone as neutral even when showTriads is true', () => {
    const scaleFrets: ScaleFret[][] = [
      [scaleFret({ freet: 2, scalePosition: 2, note: 'D' })],
      [],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    expect(dots.find((dot) => dot.string === 5 && dot.fret === 2)).toMatchObject({
      color: NEUTRAL_SCALE_DOT_COLOR,
      emphasized: false,
      note: 'D',
    });
  });

  test('renders a triad tone as neutral when its fret falls outside every shape range', () => {
    // cShape's own range is [0,3] (its open strings put fret 0 in range) and aShape's own
    // range is [5,7] — fret 4 sits in the gap between them, outside both.
    const scaleFrets: ScaleFret[][] = [
      [scaleFret({ freet: 4, scalePosition: 5, note: 'G' })],
      [],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    expect(dots.find((dot) => dot.string === 5 && dot.fret === 4)).toMatchObject({
      color: NEUTRAL_SCALE_DOT_COLOR,
      emphasized: false,
    });
  });

  test('gives an earlier shape (by array order) precedence when both shapes cover a fret', () => {
    // shapeA's own range is [0,3] (open string0 + fretted string1 at fret3) and shapeB's own
    // range is [1,4] (fretted string0 at fret1 + fretted string1 at fret4) — both genuinely
    // cover fret 2, and neither shape frets a dot at visual string 5.
    const shapeA = {
      chord: chord({ frets: [0, 3, -1, -1, -1, -1], baseFret: 1 }),
      color: 'stroke-blue-700 fill-blue-700',
    };
    const shapeB = {
      chord: chord({ frets: [1, 4, -1, -1, -1, -1], baseFret: 1 }),
      color: 'stroke-red-700 fill-red-700',
    };
    const scaleFrets: ScaleFret[][] = [
      [scaleFret({ freet: 2, scalePosition: 5, note: 'G' })],
      [],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([shapeA, shapeB], scaleFrets, 6, true);

    expect(dots.find((dot) => dot.string === 5 && dot.fret === 2)).toMatchObject({
      color: 'stroke-blue-700 fill-blue-700',
    });
  });

  test('ignores frets that are not part of the scale', () => {
    const scaleFrets: ScaleFret[][] = [
      [scaleFret({ freet: 2, isPartOfScale: false, scalePosition: null as unknown as number })],
      [],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    expect(dots.find((dot) => dot.string === 5 && dot.fret === 2)).toBeUndefined();
  });

  test('ignores scale frets beyond the max CAGED fret', () => {
    // aShape's highest dot is fret 7 — a scale tone at fret 8 must be excluded.
    const scaleFrets: ScaleFret[][] = [
      [scaleFret({ freet: 8, scalePosition: 1, note: 'C' })],
      [],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    expect(dots.find((dot) => dot.string === 5 && dot.fret === 8)).toBeUndefined();
  });
});
