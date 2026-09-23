import { ChordPosition } from 'hooks';
import type { ScaleFret } from './scale';

export interface CagedShapeInput {
  chord: ChordPosition;
  color: string;
}

export interface CagedDot {
  string: number;
  /** Absolute, nut-relative fret — not relative to any chord's baseFret. */
  fret: number;
  color: string;
  note?: string;
  /** True for scale-only triad tones colored by their owning CAGED shape. Always falsy for plain CAGED chord-tone dots. */
  emphasized?: boolean;
}

/**
 * Flattens multiple CAGED chord shapes into one deduplicated list of fretted dots.
 * Shapes must be pre-sorted by the caller (ascending baseFret / proximity to the nut) —
 * when two shapes fret the same (string, absolute fret), the earlier shape in `shapes` wins.
 */
export const dedupeCagedDots = (shapes: CagedShapeInput[]): CagedDot[] => {
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
      dots.push({ string, fret: absoluteFret, color, note: chord.notes?.[string] });
    });
  });

  return dots;
};

export const NEUTRAL_SCALE_DOT_COLOR = 'stroke-gray-800 fill-gray-800';

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
const owningShapeColor = (shapes: CagedShapeInput[], fret: number): string | undefined =>
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
 * Any (string, fret) already covered by a CAGED shape is left untouched. Uncovered scale
 * tones are added: triad tones (scalePosition 1/3/5) are emphasized using the color of
 * whichever CAGED shape's own fret range "owns" that fret (when `showTriads` is true and
 * such a shape exists); everything else falls back to a shared neutral color.
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

      const isTriad = TRIAD_POSITIONS.has(fret.scalePosition);
      const owningColor = isTriad && showTriads ? owningShapeColor(shapes, fret.freet) : undefined;

      scaleOnlyDots.push({
        string: visualString,
        fret: fret.freet,
        color: owningColor ?? NEUTRAL_SCALE_DOT_COLOR,
        emphasized: !!owningColor,
        note: fret.note,
      });
    });
  });

  return [...cagedDots, ...scaleOnlyDots];
};
