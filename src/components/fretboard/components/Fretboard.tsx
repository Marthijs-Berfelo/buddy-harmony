import { Orientation } from '../options';
import { DEFAULT_STYLE, DiagramStyle } from '../utils/diagram-style';
import * as svg from '../utils/svg';
import React, { Fragment } from 'react';

type FretboardProps = {
  strings: number;
  frets: number;
  orientation: Orientation;
  diagramStyle: DiagramStyle;
};

const Fretboard = (
  props: FretboardProps = {
    strings: 6,
    frets: 5,
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
  const verticalLines = (
    length: number,
    lines: number,
    interval: number,
    width: number
  ): string => {
    const paths = new Array(lines);
    for (let index = 0; index < lines; index++) {
      paths[index] = svg.verticalLine(
        diagramStyle.paddingLeft + index * interval,
        diagramStyle.paddingTop,
        length,
        width
      );
    }
    return paths.join(' ');
  };

  const horizontalLines = (
    length: number,
    lines: number,
    interval: number,
    width: number
  ): string => {
    const paths = new Array(lines);
    for (let index = 0; index < lines; index++) {
      paths[index] = svg.horizontalLine(
        diagramStyle.paddingLeft,
        diagramStyle.paddingTop + index * interval,
        length,
        width
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
          diagramStyle.stringWidth
        );
      case Orientation.HORIZONTAL:
      default:
        return horizontalLines(
          length,
          strings,
          diagramStyle.stringInterval,
          diagramStyle.stringWidth
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
          diagramStyle.fretWidth
        );
      case Orientation.HORIZONTAL:
      default:
        return verticalLines(length, frets, diagramStyle.fretInterval, diagramStyle.fretWidth);
    }
  };

  return {
    stringsPath,
    stringWidth: diagramStyle.stringWidth,
    fretsPath,
    fretWidth: diagramStyle.fretWidth,
  };
};
