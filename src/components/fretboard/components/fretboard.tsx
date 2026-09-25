import type { JSX } from 'react';
import { Orientation } from '../options';
import { svg } from '../utils';
import { Fragment } from 'react';
import { useSettings } from 'hooks';

type FretboardProps = {
  frets: number;
  chord: boolean;
  startAt: number;
  // CAGED overlays use the nut/chord-box visuals but, unlike a fixed-size chord box,
  // must size the string length like a full fretboard (scale diagram): `frets` is the
  // number of intervals from the nut, not a literal marker count.
  cagedOverlay?: boolean;
};

export const Fretboard = (props: FretboardProps): JSX.Element => {
  const { stringsPath, stringWidth, fretsPath, fretWidth, includeNut } = useFretboard(props);
  return (
    <Fragment>
      {includeNut && (
        <path strokeWidth={fretWidth} className="fill-none stroke-black" d={fretsPath(true)} />
      )}
      <path strokeWidth={fretWidth} className="fill-none stroke-gray-400" d={fretsPath(false)} />
      <path strokeWidth={stringWidth} className="fill-none stroke-black" d={stringsPath()} />
    </Fragment>
  );
};

type FretboardHook = {
  stringsPath: () => string;
  stringWidth: number;
  fretsPath: (nut: boolean) => string;
  fretWidth: number;
  includeNut: boolean;
};

const useFretboard = ({ frets, chord, startAt, cagedOverlay }: FretboardProps): FretboardHook => {
  const { stringCount, orientation, diagramStyle } = useSettings();
  const includeNut = startAt === 1;
  const isFirstFret = (frets: boolean, index: number): boolean => frets && index === 0;
  const fretOverhang = diagramStyle.stringWidth * 2;

  const verticalLines = (
    length: number,
    lines: number,
    interval: number,
    width: number,
    frets: boolean,
    nut: boolean,
    overhang = 0
  ): string => {
    const paths = new Array(nut ? 1 : lines);
    for (let index = nut || !frets ? 0 : 1; index < lines; index++) {
      paths[index] = svg.verticalLine(
        diagramStyle.padding +
          (!frets && !includeNut ? interval / 2 : 0) +
          (includeNut ? 0 : interval / 2) +
          (includeNut || nut ? index : index - 1) * interval -
          (isFirstFret(frets, index) ? width : 0),
        diagramStyle.padding - overhang,
        length + overhang * 2,
        isFirstFret(frets, index) ? width * 2 : width
      );
    }
    return paths.join(' ');
  };

  const horizontalLines = (
    length: number,
    lines: number,
    interval: number,
    width: number,
    frets: boolean,
    nut: boolean,
    overhang = 0
  ): string => {
    const paths = new Array(nut ? 1 : lines);
    for (let index = nut || !frets ? 0 : 1; index < lines; index++) {
      paths[index] = svg.horizontalLine(
        diagramStyle.padding - overhang,
        diagramStyle.padding +
          (!frets && !includeNut ? interval / 2 : 0) +
          (includeNut ? 0 : interval / 2) +
          (includeNut || nut ? index : index - 1) * interval -
          (isFirstFret(frets, index) ? width : 0),
        length + overhang * 2,
        isFirstFret(frets, index) ? width * 2 : width
      );
    }
    return paths.join(' ');
  };

  const stringsPath = (): string => {
    // For CAGED overlays, `frets` is the marker count (nut + explicit chord-box markers),
    // whereas `stringLength` expects an interval count — matching how the scale diagram
    // sizes its string length. Subtracting 1 aligns the two so the overhang matches scale.
    const length = diagramStyle.stringLength(cagedOverlay ? frets - 1 : frets);
    switch (orientation) {
      case Orientation.VERTICAL:
        return verticalLines(
          length,
          stringCount,
          diagramStyle.stringInterval,
          diagramStyle.stringWidth,
          false,
          false
        );
      case Orientation.HORIZONTAL:
      default:
        return horizontalLines(
          length,
          stringCount,
          diagramStyle.stringInterval,
          diagramStyle.stringWidth,
          false,
          false
        );
    }
  };

  const fretsPath = (nut: boolean): string => {
    const length = diagramStyle.fretLength(stringCount);
    switch (orientation) {
      case Orientation.VERTICAL:
        return horizontalLines(
          length,
          includeNut && chord ? frets : frets + 1,
          diagramStyle.fretInterval,
          diagramStyle.fretWidth,
          true,
          nut,
          fretOverhang
        );
      case Orientation.HORIZONTAL:
      default:
        return verticalLines(
          length,
          includeNut && chord ? frets : frets + 1,
          diagramStyle.fretInterval,
          diagramStyle.fretWidth,
          true,
          nut,
          fretOverhang
        );
    }
  };

  return {
    stringsPath,
    stringWidth: diagramStyle.stringWidth,
    fretsPath,
    fretWidth: diagramStyle.fretWidth,
    includeNut,
  };
};
