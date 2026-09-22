import { ChordPosition } from 'hooks';

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
