import { DiagramStyle } from '../utils/diagram-style';
import { DotText, Orientation } from '../options';
import React, { Fragment } from 'react';
import { ScaleFret } from '../utils/scale';
import './Shape.css';

const fill = 'white';
const dotStrokeColor = 'grey';
const textColor = 'black';

interface ShapeProps {
  className: string;
  shape: ScaleFret[][];
  strings: number;
  leftHanded: boolean;
  orientation: Orientation;
  diagramStyle: DiagramStyle;
  text: DotText;
}

const Shape = (props: ShapeProps): JSX.Element => {
  const { shape, strings, dot, dotText } = useShape(props);

  const dots = shape.flatMap(
    (string, stringIndex) =>
      string
        .filter((fret) => fret.isPartOfScale)
        .map((fret) => {
          return dot(strings - 1 - stringIndex, fret.freet, dotText(fret), fret.scalePosition);
        }) || []
  );
  return <g>{dots}</g>;
};

export default Shape;

type ShapeHook = {
  shape: ScaleFret[][];
  strings: number;
  cross: (string: number) => JSX.Element;
  dot: (string: number, fret: number, text?: string, scalePosition?: number) => JSX.Element;
  dotText: (fret: ScaleFret) => string | undefined;
};

const useShape = ({
  className,
  shape,
  strings,
  orientation,
  leftHanded,
  diagramStyle,
  text,
}: ShapeProps): ShapeHook => {
  const fretPosition = (offset: number, fret: number): number =>
    fret === 0
      ? offset - diagramStyle.dotOut + diagramStyle.fretWidth / 2
      : offset +
        (fret - 1) * diagramStyle.fretInterval +
        diagramStyle.fretInterval -
        diagramStyle.dotIn +
        diagramStyle.fretWidth / 2;

  const leftHandedFretPosition = (fret: number): number => {
    const offset = diagramStyle.paddingRight;
    return fret === 0
      ? offset + diagramStyle.dotOut - diagramStyle.fretWidth / 2
      : offset -
          (fret - 1) * diagramStyle.fretInterval -
          diagramStyle.fretInterval +
          diagramStyle.dotIn -
          diagramStyle.fretWidth / 2;
  };

  const stringPosition = (offset: number, string: number): number =>
    offset + string * diagramStyle.stringInterval + diagramStyle.stringWidth / 2;

  const x = (string: number, fret: number): number => {
    const offset = diagramStyle.paddingTop;
    if (orientation === Orientation.HORIZONTAL) {
      if (leftHanded) {
        return leftHandedFretPosition(fret);
      }
      return fretPosition(offset, fret);
    } else {
      return stringPosition(offset, string);
    }
  };

  const y = (string: number, fret: number): number => {
    const offset = diagramStyle.paddingLeft;
    if (orientation === Orientation.HORIZONTAL) {
      return stringPosition(offset, string);
    } else {
      return fretPosition(offset, fret);
    }
  };

  const getNote = (fret: ScaleFret): string => {
    if (fret.note === fret.noteEnharmonic) {
      return fret.note;
    } else {
      return `${fret.note}/${fret.noteEnharmonic}`;
    }
  };

  const dotText = (fret: ScaleFret): string | undefined => {
    switch (text) {
      case DotText.NOTE:
        return fret.note;
      case DotText.NOTE_OCTAVE:
        return getNote(fret);
      case DotText.FINGER:
        return;
    }
  };

  const cross = (string: number): JSX.Element => (
    <Fragment key={`${string}.X`}>
      <text
        x={x(string, 0)}
        y={y(string, 0)}
        alignmentBaseline={'central'}
        className={'shape-dot-text'}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
      >
        &#x2715;
      </text>
    </Fragment>
  );

  const dot = (
    string: number,
    fret: number,
    text?: string,
    scalePosition?: number
  ): JSX.Element => (
    <Fragment key={`${string}.${fret}`}>
      <circle
        cx={x(string, fret)}
        cy={y(string, fret)}
        r={diagramStyle.dotRadius}
        className={`${className} shape-dot shape-dot${scalePositionClass(scalePosition)}`}
        strokeWidth={diagramStyle.dotStroke}
        stroke={dotStrokeColor}
        fill={fill}
      />
      <text
        x={x(string, fret)}
        y={y(string, fret)}
        alignmentBaseline={'central'}
        className={`${className} shape-dot-text shape-dot-text${scalePositionClass(scalePosition)}`}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
      >
        {text}
      </text>
    </Fragment>
  );

  const scalePositionClass = (scalePosition?: number): string =>
    scalePosition !== undefined ? `-scale-${scalePosition}` : '';

  return {
    shape,
    strings,
    dot,
    cross,
    dotText,
  };
};
