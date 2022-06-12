import { MouseEvent } from 'react';
import assert from 'assert-ts';
import { Orientation } from '../options';

export interface DiagramStyle {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  stringInterval: number;
  stringWidth: number;
  fretInterval: number;
  fretWidth: number;
  dotIn: number;
  dotOut: number;
  dotRadius: number;
  dotStroke: number;
  fontSize: number;
  fretNumberDistance: number;
  fretNumberFontSize: number;
  fretNumberColor: string;
  stringBoundary: (frets: number, orientation: Orientation) => number;
  fretBoundary: (strings: number, orientation: Orientation) => number;
  stringLength: (frets: number) => number;
  fretLength: (strings: number) => number;
  getStringAndFretFromMouseEvent: (
    event: MouseEvent<SVGSVGElement>,
    strings: number,
    frets: number,
    orientation: Orientation
  ) => StringAndFret | undefined;
}

export interface StringAndFret {
  string: number;
  fret: number;
}

interface ClickPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function diagramStyle(
  paddingTop = 70, // make room for fret numbers
  paddingRight = 15,
  paddingBottom = 30,
  paddingLeft = 70,
  stringInterval = 60,
  stringWidth = 4,
  fretInterval = 100,
  fretWidth = 4,
  dotIn = 50,
  dotOut = 30,
  dotRadius = 20,
  dotStroke = 1,
  fontSize = 12,
  fretNumberDistance = 30,
  fretNumberFontSize = 24,
  fretNumberColor = '#999'
): DiagramStyle {
  const stringBoundary = (frets: number, orientation: Orientation): number => {
    assert(frets > 0, 'Number of frets must be an integer greater than 0');
    const length = stringLength(frets) + fretWidth;
    switch (orientation) {
      case Orientation.VERTICAL:
        return length + paddingTop + paddingBottom;
      case Orientation.HORIZONTAL:
      default:
        return length + paddingLeft + paddingRight;
    }
  };
  const fretBoundary = (strings: number, orientation: Orientation): number => {
    assert(strings > 0, 'Number of strings must be an integer greater than 0');
    const length = fretLength(strings) + stringWidth;
    switch (orientation) {
      case Orientation.VERTICAL:
        return length + paddingLeft + paddingRight;
      case Orientation.HORIZONTAL:
      default:
        return length + paddingTop + paddingBottom;
    }
  };
  const stringLength = (frets: number): number => {
    assert(frets > 0, 'Number of frets must be an integer greater than 0');
    return frets * (fretInterval + fretWidth) - fretWidth / 2;
  };
  const fretLength = (strings: number): number => {
    assert(strings > 0, 'Number of strings must be an integer greater than 0');
    return (strings - 1) * stringInterval + stringWidth;
  };
  const getStringAndFretFromMouseEvent = (
    event: MouseEvent<SVGSVGElement>,
    strings: number,
    frets: number,
    orientation: Orientation
  ): StringAndFret | undefined => {
    const clickPosition = calculateClickPosition(event);
    switch (orientation) {
      case Orientation.VERTICAL:
        return undefined;
      case Orientation.HORIZONTAL:
      default:
        return getStringAndFretFromHorizontalFretboard(clickPosition, strings, frets);
    }
  };

  const calculateClickPosition = (event: MouseEvent<SVGSVGElement>): ClickPosition => {
    const svg = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - svg.left;
    const y = event.clientY - svg.top;
    return { x, y, width: svg.width, height: svg.height };
  };

  const getStringAndFretFromHorizontalFretboard = (
    clickPosition: ClickPosition,
    strings: number,
    frets: number
  ): StringAndFret | undefined => {
    const width = stringBoundary(frets, Orientation.HORIZONTAL);
    const scale = clickPosition.width / width;
    const deltaY = clickPosition.y / scale;

    if (deltaY < paddingTop - stringInterval / 2) {
      return undefined;
    }

    if (deltaY > clickPosition.height / scale - paddingBottom + stringInterval / 2) {
      return undefined;
    }
    let string = Math.floor((deltaY - paddingTop - stringWidth / 2) / stringInterval + 0.5);

    if (string < 0) {
      string = 0;
    }

    if (string >= strings) {
      string = strings - 1;
    }

    const deltaX = clickPosition.x / scale;
    if (deltaX < paddingLeft - fretInterval + fretWidth / 2) {
      return undefined;
    }

    if (deltaX > clickPosition.width / scale - paddingRight) {
      return undefined;
    }
    let fret = Math.floor((deltaX - paddingLeft - fretWidth) / fretInterval + 1);
    if (fret < 0) {
      fret = 0;
    }
    if (fret > frets) {
      return undefined;
    }
    return {
      string: strings - string - 1,
      fret,
    };
  };

  return {
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    stringInterval,
    stringWidth,
    fretInterval,
    fretWidth,
    dotIn,
    dotOut,
    dotRadius,
    dotStroke,
    fontSize,
    fretNumberDistance,
    fretNumberFontSize,
    fretNumberColor,
    stringBoundary,
    fretBoundary,
    stringLength,
    fretLength,
    getStringAndFretFromMouseEvent,
  };
}

export const DEFAULT_STYLE = diagramStyle();
