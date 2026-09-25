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
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots).toEqual([
      { string: 1, fret: 3, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: 'C3' },
      { string: 2, fret: 2, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: 'E3' },
      { string: 3, fret: 0, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: 'G3' },
      { string: 4, fret: 1, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: 'C4' },
      { string: 5, fret: 0, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: 'E4' },
    ]);
  });

  test('an earlier shape wins when two shapes share a (string, absoluteFret) position', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, 2, -1, 1, -1], baseFret: 1 }),
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };
    const later = {
      chord: chord({ frets: [-1, 3, 2, -1, 1, -1], baseFret: 1 }),
      color: { strokeClassName: 'stroke-red-700', fillClassName: 'fill-red-700' },
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(3);
    dots.forEach((dot) => {
      expect(dot.color).toEqual({ strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' });
    });
  });

  test('skips muted (-1) strings but includes open (0) strings', () => {
    const shape = {
      chord: chord({ frets: [-1, 0, 2, 0, 1, 0], baseFret: 1 }),
      color: { strokeClassName: 'stroke-green-700', fillClassName: 'fill-green-700' },
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots.map((dot) => dot.string)).toEqual([1, 2, 3, 4, 5]);
  });

  test('converts a fretted note to its true absolute fret using baseFret', () => {
    const shape = {
      chord: chord({ frets: [-1, -1, 1, 1, 1, 4], baseFret: 5 }),
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots.map((dot) => dot.fret)).toEqual([5, 5, 5, 8]);
  });

  test('gives an open string absolute fret 0 regardless of baseFret', () => {
    const shape = {
      chord: chord({ frets: [-1, -1, 0, 1, 1, 4], baseFret: 5 }),
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };

    const dots = dedupeCagedDots([shape]);

    expect(dots).toEqual([
      { string: 2, fret: 0, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: undefined },
      { string: 3, fret: 5, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: undefined },
      { string: 4, fret: 5, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: undefined },
      { string: 5, fret: 8, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' }, note: undefined },
    ]);
  });

  test('detects a collision even when the colliding shapes have different baseFret values', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, -1, -1, -1, -1], baseFret: 1 }),
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };
    const later = {
      chord: chord({ frets: [-1, 1, -1, -1, -1, -1], baseFret: 3 }),
      color: { strokeClassName: 'stroke-red-700', fillClassName: 'fill-red-700' },
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(1);
    expect(dots[0]).toMatchObject({ string: 1, fret: 3, color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' } });
  });

  test('keeps both dots when two shapes fret the same string at different absolute frets', () => {
    const earlier = {
      chord: chord({ frets: [-1, 3, -1, -1, -1, -1], baseFret: 1 }),
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };
    const later = {
      chord: chord({ frets: [-1, 2, -1, -1, -1, -1], baseFret: 5 }),
      color: { strokeClassName: 'stroke-red-700', fillClassName: 'fill-red-700' },
    };

    const dots = dedupeCagedDots([earlier, later]);

    expect(dots).toHaveLength(2);
    expect(dots.map((dot) => dot.fret).sort((a, b) => a - b)).toEqual([3, 6]);
  });

  describe('root-relative triad detection (no scale selected)', () => {
    const shape = {
      chord: chord({
        frets: [-1, 3, 2, 0, 1, 0],
        baseFret: 1,
        notes: ['', 'C3', 'E3', 'G3', 'C4', 'E4'],
      }),
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };

    test('flags root/3rd/5th dots as emphasized when a root note and showTriads are given', () => {
      const dots = dedupeCagedDots([shape], 'C', true);

      // C3 (root), E3 (3rd), G3 (5th), C4 (root) are triad tones; E4 (3rd) also is.
      expect(dots.every((dot) => dot.emphasized)).toBe(true);
    });

    test('leaves a non-triad dot unemphasized even when showTriads is true', () => {
      // E is a 2nd above root D (semitone offset 2) — not in the triad-tone set.
      const nonTriadShape = {
        chord: chord({ frets: [-1, -1, 1, -1, -1, -1], baseFret: 1, notes: ['', '', 'E3', '', '', ''] }),
        color: { strokeClassName: 'stroke-violet-800', fillClassName: 'fill-violet-800' },
      };

      const dots = dedupeCagedDots([nonTriadShape], 'D', true);

      expect(dots).toHaveLength(1);
      expect(dots[0]).toMatchObject({ note: 'E3' });
      expect(dots[0].emphasized).toBeFalsy();
    });

    test('does not emphasize anything when showTriads is false', () => {
      const dots = dedupeCagedDots([shape], 'C', false);

      expect(dots.every((dot) => !dot.emphasized)).toBe(true);
    });

    test('does not emphasize anything when rootNote is omitted', () => {
      const dots = dedupeCagedDots([shape]);

      expect(dots.every((dot) => !dot.emphasized)).toBe(true);
      expect(dots[0]).toEqual({
        string: 1,
        fret: 3,
        color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
        note: 'C3',
      });
    });

    test('never marks a dot as fromScale — every dedupeCagedDots dot is a real chord tone', () => {
      const dots = dedupeCagedDots([shape], 'C', true);

      expect(dots.every((dot) => !dot.fromScale)).toBe(true);
    });
  });

  describe('root-relative root detection (no scale selected)', () => {
    const shape = {
      chord: chord({
        frets: [-1, 3, 2, 0, 1, 0],
        baseFret: 1,
        notes: ['', 'C3', 'E3', 'G3', 'C4', 'E4'],
      }),
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };

    test('flags only the root-chroma dots as isRoot when a rootNote is given, regardless of showTriads', () => {
      const dots = dedupeCagedDots([shape], 'C', false);

      // C3 and C4 share chroma with root C; E3/G3/E4 do not.
      const rootDots = dots.filter((dot) => dot.isRoot);
      expect(rootDots.map((dot) => dot.note).sort()).toEqual(['C3', 'C4']);
      expect(dots.every((dot) => !dot.emphasized)).toBe(true);
    });

    test('does not flag isRoot when rootNote is omitted', () => {
      const dots = dedupeCagedDots([shape]);

      expect(dots.every((dot) => !dot.isRoot)).toBe(true);
    });

    test('flags an enharmonic-equivalent root note as isRoot via chroma comparison', () => {
      const dots = dedupeCagedDots([shape], 'B#', false);

      // C3/C4 share chroma with B# (both chroma 0), so they count as root here too —
      // this only exercises the chroma-equality helper; real callers pass the true root.
      const rootDots = dots.filter((dot) => dot.isRoot);
      expect(rootDots.map((dot) => dot.note).sort()).toEqual(['C3', 'C4']);
    });
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
    color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
  };
  const aShape = {
    chord: chord({ frets: [1, 3, 3, 2, 1, 1], baseFret: 5 }),
    color: { strokeClassName: 'stroke-red-700', fillClassName: 'fill-red-700' },
  };

  // mergeCagedAndScaleDots flips scaleFrets' outer index into CagedDot's `string` space via
  // visualString = stringCount - 1 - stringIndex. With stringCount 6, to target visual
  // string N, the ScaleFret content must live at scaleFrets[5 - N].

  test('skips a scale tone that coincides with an existing CAGED dot, but still emphasizes it as a covered triad tone', () => {
    // cShape frets string 1 at absolute fret 3. Targeting visual string 1 means putting
    // the ScaleFret at index 5 - 1 = 4. scalePosition 3 is a triad tone, so the existing
    // (covered) CAGED dot must gain emphasis rather than a second dot being added.
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
    expect(dots.find((dot) => dot.string === 1 && dot.fret === 3)).toMatchObject({
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
      emphasized: true,
    });
  });

  test('emphasizes a covered CAGED dot at a root/3rd/5th position, keeping its own shape color (not NEUTRAL_SCALE_DOT_COLOR)', () => {
    // cShape frets string 2 at absolute fret 2 (its own dedupeCagedDots output). Targeting
    // visual string 2 means putting the ScaleFret at index 5 - 2 = 3.
    const scaleFrets: ScaleFret[][] = [
      [],
      [],
      [],
      [scaleFret({ freet: 2, scalePosition: 5, note: 'G' })],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    expect(dots.filter((dot) => dot.string === 2 && dot.fret === 2)).toHaveLength(1);
    expect(dots.find((dot) => dot.string === 2 && dot.fret === 2)).toMatchObject({
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
      emphasized: true,
    });
  });

  test('leaves a covered CAGED dot at a non-triad position not emphasized', () => {
    // cShape frets string 4 at absolute fret 1. Targeting visual string 4 means putting
    // the ScaleFret at index 5 - 4 = 1. scalePosition 2 is not a triad tone.
    const scaleFrets: ScaleFret[][] = [
      [],
      [scaleFret({ freet: 1, scalePosition: 2, note: 'D' })],
      [],
      [],
      [],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

    expect(dots.filter((dot) => dot.string === 4 && dot.fret === 1)).toHaveLength(1);
    const dot = dots.find((dot) => dot.string === 4 && dot.fret === 1);
    expect(dot?.emphasized).toBeFalsy();
    expect(dot?.color).toEqual({ strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' });
  });

  test('does not emphasize a covered CAGED dot at a triad position when showTriads is false', () => {
    const scaleFrets: ScaleFret[][] = [
      [],
      [],
      [],
      [],
      [scaleFret({ freet: 3, scalePosition: 3 })],
      [],
    ];

    const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, false);

    const dot = dots.find((dot) => dot.string === 1 && dot.fret === 3);
    expect(dot?.emphasized).toBeFalsy();
    expect(dot?.color).toEqual({ strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' });
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
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
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
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
    };
    const shapeB = {
      chord: chord({ frets: [1, 4, -1, -1, -1, -1], baseFret: 1 }),
      color: { strokeClassName: 'stroke-red-700', fillClassName: 'fill-red-700' },
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
      color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
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

  describe('fromScale origin flag', () => {
    test('never marks a covered (real chord-tone) dot as fromScale, emphasized or not', () => {
      // string 1 fret 3 (covered, becomes emphasized) and string 4 fret 1 (covered, stays
      // unemphasized) are both real CAGED chord-tone dots — neither should carry fromScale.
      const scaleFrets: ScaleFret[][] = [
        [],
        [scaleFret({ freet: 1, scalePosition: 2, note: 'D' })],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 3 })],
        [],
      ];

      const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

      const coveredEmphasized = dots.find((dot) => dot.string === 1 && dot.fret === 3);
      expect(coveredEmphasized?.emphasized).toBe(true);
      expect(coveredEmphasized?.fromScale).toBeFalsy();

      const coveredPlain = dots.find((dot) => dot.string === 4 && dot.fret === 1);
      expect(coveredPlain?.emphasized).toBeFalsy();
      expect(coveredPlain?.fromScale).toBeFalsy();
    });

    test('marks every scale-only dot as fromScale: true, both neutral and emphasized/triad', () => {
      // string 5 fret 3 (triad, owned by cShape's range) is emphasized; string 5 fret 2
      // (non-triad) is neutral. Neither is fretted by any shape, so both are scale-only.
      const scaleFrets: ScaleFret[][] = [
        [
          scaleFret({ freet: 3, scalePosition: 5, note: 'G' }),
          scaleFret({ freet: 2, scalePosition: 2, note: 'D' }),
        ],
        [],
        [],
        [],
        [],
        [],
      ];

      const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, true);

      expect(dots.find((dot) => dot.string === 5 && dot.fret === 3)).toMatchObject({
        emphasized: true,
        fromScale: true,
      });
      expect(dots.find((dot) => dot.string === 5 && dot.fret === 2)).toMatchObject({
        emphasized: false,
        fromScale: true,
      });
    });
  });

  describe('isRoot detection, independent of showTriads', () => {
    test('flags a covered root dot as isRoot even when showTriads is false', () => {
      const rootAwareCShape = {
        chord: chord({
          frets: [-1, 3, 2, 0, 1, 0],
          baseFret: 1,
          notes: ['', 'C3', 'E3', 'G3', 'C4', 'E4'],
        }),
        color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
      };
      const scaleFrets: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 1, note: 'C' })],
        [],
      ];

      const dots = mergeCagedAndScaleDots([rootAwareCShape, aShape], scaleFrets, 6, false);

      const dot = dots.find((dot) => dot.string === 1 && dot.fret === 3);
      expect(dot?.isRoot).toBe(true);
      expect(dot?.emphasized).toBeFalsy();
    });

    test('flags an uncovered scale-only root dot as isRoot even when showTriads is false', () => {
      const scaleFrets: ScaleFret[][] = [
        [scaleFret({ freet: 3, scalePosition: 1, note: 'C' })],
        [],
        [],
        [],
        [],
        [],
      ];

      const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, false);

      const dot = dots.find((dot) => dot.string === 5 && dot.fret === 3);
      expect(dot?.isRoot).toBe(true);
      expect(dot?.emphasized).toBeFalsy();
      expect(dot?.color).toBe(NEUTRAL_SCALE_DOT_COLOR);
    });

    test('does not flag a non-root scale-only dot as isRoot', () => {
      const scaleFrets: ScaleFret[][] = [
        [scaleFret({ freet: 3, scalePosition: 5, note: 'G' })],
        [],
        [],
        [],
        [],
        [],
      ];

      const dots = mergeCagedAndScaleDots([cShape, aShape], scaleFrets, 6, false);

      const dot = dots.find((dot) => dot.string === 5 && dot.fret === 3);
      expect(dot?.isRoot).toBeFalsy();
    });
  });
});
