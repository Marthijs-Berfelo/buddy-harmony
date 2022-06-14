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
  const { stringsPath, stringWidth, fretsPath, fretWidth } = useFretboard(props);
  return (
    <Fragment>
      <path fill={'none'} strokeWidth={fretWidth} className={'fretboard-fret'} d={fretsPath()} />
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
  fretsPath: () => string;
  fretWidth: number;
};

const useFretboard = ({
  strings,
  frets,
  orientation,
  diagramStyle,
}: FretboardProps): FretboardHook => {
  const isFirstFret = (frets: boolean, index: number): boolean => frets && index === 0;

  const verticalLines = (
    length: number,
    lines: number,
    interval: number,
    width: number,
    frets: boolean
  ): string => {
    const paths = new Array(lines);
    for (let index = 0; index < lines; index++) {
      paths[index] = svg.verticalLine(
        diagramStyle.paddingLeft + index * interval - (isFirstFret(frets, index) ? width : 0),
        diagramStyle.paddingTop,
        length,
        isFirstFret(frets, width) ? width * 2.5 : width
      );
    }
    return paths.join(' ');
  };

  const horizontalLines = (
    length: number,
    lines: number,
    interval: number,
    width: number,
    frets: boolean
  ): string => {
    const paths = new Array(lines);
    for (let index = 0; index < lines; index++) {
      paths[index] = svg.horizontalLine(
        diagramStyle.paddingLeft,
        diagramStyle.paddingTop + index * interval - (isFirstFret(frets, index) ? width : 0),
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
          false
        );
      case Orientation.HORIZONTAL:
      default:
        return horizontalLines(
          length,
          strings,
          diagramStyle.stringInterval,
          diagramStyle.stringWidth,
          false
        );
    }
  };

  const fretsPath = (): string => {
    const length = diagramStyle.fretLength(strings);
    switch (orientation) {
      case Orientation.VERTICAL:
        return horizontalLines(
          length,
          frets + 1,
          diagramStyle.fretInterval,
          diagramStyle.fretWidth,
          true
        );
      case Orientation.HORIZONTAL:
      default:
        return verticalLines(
          length,
          frets + 1,
          diagramStyle.fretInterval,
          diagramStyle.fretWidth,
          true
        );
    }
  };

  return {
    stringsPath,
    stringWidth: diagramStyle.stringWidth,
    fretsPath,
    fretWidth: diagramStyle.fretWidth,
  };
};
