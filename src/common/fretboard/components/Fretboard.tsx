import { Orientation } from '../options';
import { svg } from '../utils';
import React, { Fragment } from 'react';
import { useSettings } from '../../../hooks';

type FretboardProps = {
  frets: number;
  chord: boolean;
  startAt: number;
};

const Fretboard = (props: FretboardProps): JSX.Element => {
  const { stringsPath, stringWidth, fretsPath, fretWidth, includeNut } = useFretboard(props);
  return (
    <Fragment>
      {includeNut && (
        <path strokeWidth={fretWidth} className="fill-none stroke-black" d={fretsPath(true)} />
      )}
      <path strokeWidth={fretWidth} className="fill-none stroke-grey-600" d={fretsPath(false)} />
      <path strokeWidth={stringWidth} className="fill-none stroke-black" d={stringsPath()} />
    </Fragment>
  );
};

export default Fretboard;

type FretboardHook = {
  stringsPath: () => string;
  stringWidth: number;
  fretsPath: (nut: boolean) => string;
  fretWidth: number;
  includeNut: boolean;
};

const useFretboard = ({ frets, chord, startAt }: FretboardProps): FretboardHook => {
  const { stringCount, orientation, diagramStyle } = useSettings();
  const includeNut = startAt === 1;
  const isFirstFret = (frets: boolean, index: number): boolean => frets && index === 0;

  const verticalLines = (
    length: number,
    lines: number,
    interval: number,
    width: number,
    frets: boolean,
    nut: boolean
  ): string => {
    const paths = new Array(nut ? 1 : lines);
    for (let index = nut || !frets ? 0 : 1; index < lines; index++) {
      paths[index] = svg.verticalLine(
        diagramStyle.padding +
          (!frets && !includeNut ? interval / 2 : 0) +
          (includeNut ? 0 : interval / 2) +
          (includeNut || nut ? index : index - 1) * interval -
          (isFirstFret(frets, index) ? width : 0),
        diagramStyle.padding,
        length,
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
    nut: boolean
  ): string => {
    const paths = new Array(nut ? 1 : lines);
    for (let index = nut || !frets ? 0 : 1; index < lines; index++) {
      paths[index] = svg.horizontalLine(
        diagramStyle.padding,
        diagramStyle.padding +
          (!frets && !includeNut ? interval / 2 : 0) +
          (includeNut ? 0 : interval / 2) +
          (includeNut || nut ? index : index - 1) * interval -
          (isFirstFret(frets, index) ? width : 0),
        length,
        isFirstFret(frets, index) ? width * 2 : width
      );
    }
    return paths.join(' ');
  };

  const stringsPath = (): string => {
    const length = diagramStyle.stringLength(frets);
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
          nut
        );
      case Orientation.HORIZONTAL:
      default:
        return verticalLines(
          length,
          includeNut && chord ? frets : frets + 1,
          diagramStyle.fretInterval,
          diagramStyle.fretWidth,
          true,
          nut
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
