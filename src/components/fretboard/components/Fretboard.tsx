import { Orientation } from '../options';
import { DEFAULT_STYLE, DiagramStyle } from '../utils/diagram-style';
import * as svg from '../utils/svg';
import React, { Fragment } from 'react';

type FretboardProps = {
  strings: number;
  frets: number;
  startAt: number;
  orientation: Orientation;
  diagramStyle: DiagramStyle;
};

const Fretboard = (
  props: FretboardProps = {
    strings: 6,
    frets: 5,
    startAt: 1,
    orientation: Orientation.HORIZONTAL,
    diagramStyle: DEFAULT_STYLE,
  }
): JSX.Element => {
  const { stringsPath, stringWidth, fretsPath, fretWidth, includeNut } = useFretboard(props);
  return (
    <Fragment>
      {includeNut && (
        <path
          fill={'none'}
          strokeWidth={fretWidth}
          className={'fretboard-nut'}
          d={fretsPath(true)}
        />
      )}
      <path
        fill={'none'}
        strokeWidth={fretWidth}
        className={'fretboard-fret'}
        d={fretsPath(false)}
      />
      <path
        fill={'none'}
        strokeWidth={stringWidth}
        className={'fretboard-string'}
        d={stringsPath()}
      />
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

const useFretboard = ({
  strings,
  frets,
  startAt,
  orientation,
  diagramStyle,
}: FretboardProps): FretboardHook => {
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
          strings,
          diagramStyle.stringInterval,
          diagramStyle.stringWidth,
          false,
          false
        );
      case Orientation.HORIZONTAL:
      default:
        return horizontalLines(
          length,
          strings,
          diagramStyle.stringInterval,
          diagramStyle.stringWidth,
          false,
          false
        );
    }
  };

  const fretsPath = (nut: boolean): string => {
    const length = diagramStyle.fretLength(strings);
    switch (orientation) {
      case Orientation.VERTICAL:
        return horizontalLines(
          length,
          frets + 1,
          diagramStyle.fretInterval,
          diagramStyle.fretWidth,
          true,
          nut
        );
      case Orientation.HORIZONTAL:
      default:
        return verticalLines(
          length,
          frets + 1,
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
