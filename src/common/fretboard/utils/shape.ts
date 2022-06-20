import { Orientation } from '../options';
import { useSettings } from '../../../hooks';

export interface ShapeProps {
  className: string;
}

type ShapeHook = {
  x: (padding: number, string: number, fret: number, offset: number) => number;
  y: (padding: number, string: number, fret: number, offset: number) => number;
};

export const useShape = (): ShapeHook => {
  const { leftHanded, orientation, diagramStyle } = useSettings();
  const fretPosition = (padding: number, offset: number, fret: number): number =>
    fret === 0
      ? padding - diagramStyle.dotOut + diagramStyle.fretWidth / 2
      : padding +
        offset +
        (fret - 1) * diagramStyle.fretInterval +
        diagramStyle.fretInterval -
        diagramStyle.dotIn +
        diagramStyle.fretWidth / 2;

  const leftHandedFretPosition = (padding: number, offset: number, fret: number): number => {
    return fret === 0
      ? padding + diagramStyle.dotOut - diagramStyle.fretWidth / 2
      : padding -
          offset -
          (fret - 1) * diagramStyle.fretInterval -
          diagramStyle.fretInterval +
          diagramStyle.dotIn -
          diagramStyle.fretWidth / 2;
  };

  const stringPosition = (padding: number, offset: number, string: number): number =>
    padding + offset + string * diagramStyle.stringInterval + diagramStyle.stringWidth / 2;

  const x = (padding: number, string: number, fret: number, offset = 0): number => {
    if (orientation === Orientation.HORIZONTAL) {
      if (leftHanded) {
        return leftHandedFretPosition(padding, offset, fret);
      }
      return fretPosition(padding, offset, fret);
    } else {
      return stringPosition(padding, offset, string);
    }
  };

  const y = (padding: number, string: number, fret: number, offset = 0): number => {
    if (orientation === Orientation.HORIZONTAL) {
      return stringPosition(padding, offset, string);
    } else {
      return fretPosition(padding, offset, fret);
    }
  };

  return { x, y };
};
