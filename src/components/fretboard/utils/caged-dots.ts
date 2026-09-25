import { ChordPosition } from 'hooks';
import { Note } from '@tonaljs/tonal';
import type { ScaleFret } from './scale';
import type { ShapeColor } from './shape';

export interface CagedShapeInput {
  chord: ChordPosition;
  color: ShapeColor;
}

export interface CagedDot {
  string: number;
  /** Absolute, nut-relative fret — not relative to any chord's baseFret. */
  fret: number;
  color: ShapeColor;
  note?: string;
  /**
   * True for a triad tone (root/3rd/5th) that should render with the glow/halo treatment —
   * set for scale-only dots colored by their owning CAGED shape, for CAGED chord-tone dots
   * already covered by a shape (keeping that shape's own color), and for plain CAGED dots
   * in the no-scale overlay (via `dedupeCagedDots`'s root-relative detection). Falsy/absent
   * otherwise, or whenever `showTriads` is off.
   */
  emphasized?: boolean;
  /**
   * True when this dot's note shares chroma with the chord/scale root — drives NoteDot's
   * size bump only (never the halo/glow, which `emphasized` alone controls). Set
   * unconditionally of `showTriads`: the root dot stays enlarged even with triads hidden.
   */
  isRoot?: boolean;
  /**
   * True for a dot added by `mergeCagedAndScaleDots`'s scale-only pass (a scale tone not
   * already fretted by any CAGED shape) — `scale-shape.tsx` uses this to render such dots as
   * outline (colored stroke, white fill) rather than solid, regardless of `emphasized`.
   * False/absent for real CAGED chord-tone dots (from `dedupeCagedDots`, used directly or via
   * `mergeCagedAndScaleDots`'s covered-dot pass), which always keep their existing solid
   * fill+stroke rendering.
   */
  fromScale?: boolean;
}

/**
 * Semitone offsets (mod 12) from a chord's root that count as a triad tone: 0 = root,
 * 3/4 = minor/major 3rd, 6/7/8 = diminished/perfect/augmented 5th. This re-expresses the
 * scale-degree `TRIAD_POSITIONS` concept ({1, 3, 5}) as raw interval math so it works from
 * just a root note name + a dot's own note — no `ScaleModel`/`scalePosition` required —
 * and stays inclusive enough to cover major, minor, diminished, augmented and 7th chords.
 */
const TRIAD_SEMITONE_OFFSETS = new Set([0, 3, 4, 6, 7, 8]);

/**
 * True when `note` (e.g. `'C3'`) is a root/3rd/5th of `rootNote` (e.g. `'C'`), independent
 * of octave. Returns false for unresolvable input rather than throwing.
 */
const isTriadInterval = (rootNote: string, note?: string): boolean => {
  if (!note) {
    return false;
  }
  const rootChroma = Note.chroma(rootNote);
  const noteChroma = Note.chroma(note);
  if (Number.isNaN(rootChroma) || Number.isNaN(noteChroma)) {
    return false;
  }
  const offset = (((noteChroma - rootChroma) % 12) + 12) % 12;
  return TRIAD_SEMITONE_OFFSETS.has(offset);
};

/**
 * True when `note` (e.g. `'C3'`) shares chroma with `rootNote` (e.g. `'C'`), independent of
 * octave — the root-detection counterpart to `isTriadInterval`. Returns false for
 * unresolvable input rather than throwing.
 */
const isRootInterval = (rootNote: string, note?: string): boolean => {
  if (!note) {
    return false;
  }
  const rootChroma = Note.chroma(rootNote);
  const noteChroma = Note.chroma(note);
  if (Number.isNaN(rootChroma) || Number.isNaN(noteChroma)) {
    return false;
  }
  return rootChroma === noteChroma;
};

/**
 * Flattens multiple CAGED chord shapes into one deduplicated list of fretted dots.
 * Shapes must be pre-sorted by the caller (ascending baseFret / proximity to the nut) —
 * when two shapes fret the same (string, absolute fret), the earlier shape in `shapes` wins.
 *
 * When `rootNote` (the chord's own root, e.g. `'C'`) is given, each dot is flagged
 * `isRoot: true` if its own `note` shares chroma with `rootNote` — unconditionally of
 * `showTriads`, since root sizing is not gated by the triad toggle. When `rootNote` and
 * `showTriads` are both given, each dot is additionally flagged `emphasized: true` if its own
 * `note` is a root/3rd/5th of `rootNote` — this is the only triad-tone signal available when
 * no `ScaleModel` is selected, so it's derived from interval math rather than
 * `ScaleFret.scalePosition`. Omit `rootNote` to leave both flags unset (existing callers that
 * only need the flattened fret list are unaffected).
 */
export const dedupeCagedDots = (
  shapes: CagedShapeInput[],
  rootNote?: string,
  showTriads?: boolean
): CagedDot[] => {
  const seen = new Set<string>();
  const dots: CagedDot[] = [];

  shapes.forEach(({ chord, color }) => {
    chord.frets.forEach((fret, string) => {
      if (fret < 0) {
        return;
      }
      const absoluteFret = fret === 0 ? 0 : fret + chord.baseFret - 1;
      const key = `${string}:${absoluteFret}`;
      if (seen.has(key)) {
        return;
      }
      seen.add(key);
      const note = chord.notes?.[string];
      const emphasized = !!showTriads && !!rootNote && isTriadInterval(rootNote, note);
      const isRoot = !!rootNote && isRootInterval(rootNote, note);
      dots.push({
        string,
        fret: absoluteFret,
        color,
        note,
        ...(emphasized ? { emphasized: true } : {}),
        ...(isRoot ? { isRoot: true } : {}),
      });
    });
  });

  return dots;
};

export const NEUTRAL_SCALE_DOT_COLOR: ShapeColor = {
  strokeClassName: 'stroke-black',
  fillClassName: 'fill-black',
};

const TRIAD_POSITIONS = new Set([1, 3, 5]);

/**
 * Derives a single shape's own isolated absolute-fret range (independent of any other
 * shape it might be merged with), used to decide which shape "owns" a given fret for
 * triad-tone coloring purposes.
 */
const shapeRange = (shape: CagedShapeInput): { min: number; max: number } | undefined => {
  const dots = dedupeCagedDots([shape]);
  if (dots.length === 0) {
    return undefined;
  }
  const frets = dots.map((dot) => dot.fret);
  return { min: Math.min(...frets), max: Math.max(...frets) };
};

/**
 * Finds the color of the first shape (by array order) whose own isolated fret range
 * contains the given fret. Earlier entries in `shapes` win ties.
 */
const owningShapeColor = (shapes: CagedShapeInput[], fret: number): ShapeColor | undefined =>
  shapes.find((shape) => {
    const range = shapeRange(shape);
    return range !== undefined && fret >= range.min && fret <= range.max;
  })?.color;

/**
 * Overlays scale tones on top of an existing CAGED chord-shape overlay.
 *
 * `shapes` must already be `onStrings`/`onStringNotes`-reordered by the caller (the same
 * transform `cagedDots()` in `scale-shape.tsx` applies before calling `dedupeCagedDots`),
 * and `scaleFrets` must already be `getShapes(scaleModel)`'s output (never a raw
 * `ScaleModel`) — both sides must be in the same normalized, orientation-corrected
 * coordinate space for the merge to align.
 *
 * Triad tones (scalePosition 1/3/5) are emphasized wherever they occur — both on CAGED
 * chord-tone dots that already cover that (string, fret) (keeping that shape's own color)
 * and on uncovered scale-only dots (colored via whichever CAGED shape's own fret range
 * "owns" that fret, when such a shape exists); everything else falls back to a shared
 * neutral color. A single `(visualString, fret) -> scalePosition` map is built once and
 * consulted for both passes so "is this a triad tone" is decided identically regardless of
 * whether the fret happens to already be covered by a shape.
 *
 * Root tones (chroma-equal to the chord/scale root) are additionally flagged `isRoot: true`,
 * unconditionally of `showTriads` — the root dot's size bump must persist even when the triad
 * halo/glow is toggled off. Root detection here uses `scalePosition === 1` (the scale data's
 * own tonic marker) rather than chroma comparison, since `scaleFrets`/`positionLookup` are
 * already available and authoritative for this call site.
 */
export const mergeCagedAndScaleDots = (
  shapes: CagedShapeInput[],
  scaleFrets: ScaleFret[][],
  stringCount: number,
  showTriads: boolean
): CagedDot[] => {
  const cagedDots = dedupeCagedDots(shapes);
  const maxCagedFret = Math.max(...cagedDots.map((dot) => dot.fret), 1);
  const covered = new Set(cagedDots.map((dot) => `${dot.string}:${dot.fret}`));

  const positionLookup = new Map<string, number>();
  scaleFrets.forEach((string, stringIndex) => {
    const visualString = stringCount - 1 - stringIndex;
    string.forEach((fret) => {
      if (fret.isPartOfScale) {
        positionLookup.set(`${visualString}:${fret.freet}`, fret.scalePosition);
      }
    });
  });

  const isTriadPosition = (string: number, fret: number): boolean => {
    const scalePosition = positionLookup.get(`${string}:${fret}`);
    return scalePosition !== undefined && TRIAD_POSITIONS.has(scalePosition);
  };

  const isRootPosition = (string: number, fret: number): boolean =>
    positionLookup.get(`${string}:${fret}`) === 1;

  const emphasizedCagedDots = cagedDots.map((dot) => {
    const isRoot = isRootPosition(dot.string, dot.fret);
    const emphasized = showTriads && isTriadPosition(dot.string, dot.fret);
    if (!isRoot && !emphasized) {
      return dot;
    }
    // A covered dot is already "owned" by the shape that frets it — keep its own color,
    // never NEUTRAL_SCALE_DOT_COLOR or a different shape's owningShapeColor.
    return {
      ...dot,
      ...(emphasized ? { emphasized: true } : {}),
      ...(isRoot ? { isRoot: true } : {}),
    };
  });

  const scaleOnlyDots: CagedDot[] = [];

  scaleFrets.forEach((string, stringIndex) => {
    const visualString = stringCount - 1 - stringIndex;
    string.forEach((fret) => {
      if (!fret.isPartOfScale) {
        return;
      }
      if (fret.freet > maxCagedFret) {
        return;
      }
      const key = `${visualString}:${fret.freet}`;
      if (covered.has(key)) {
        return;
      }

      const isRoot = isRootPosition(visualString, fret.freet);
      const isTriad = isTriadPosition(visualString, fret.freet);
      const owningColor = isTriad && showTriads ? owningShapeColor(shapes, fret.freet) : undefined;

      scaleOnlyDots.push({
        string: visualString,
        fret: fret.freet,
        color: owningColor ?? NEUTRAL_SCALE_DOT_COLOR,
        emphasized: !!owningColor,
        ...(isRoot ? { isRoot: true } : {}),
        note: fret.note,
        fromScale: true,
      });
    });
  });

  return [...emphasizedCagedDots, ...scaleOnlyDots];
};
