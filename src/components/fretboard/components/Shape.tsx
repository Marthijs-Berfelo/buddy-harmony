import { ShapeType } from 'fretboard-api';
import { DiagramStyle } from '../utils/diagram-style';
import { DotText, Orientation } from '../options';
import { Note } from 'tonal';
import React, { Fragment } from 'react';

const fill = 'white';
const stroke = 'black';
const dotStrokeColor = 'grey';
const textColor = 'black';

interface ShapeProps {
  className: string;
  shape: ShapeType;
  strings: number;
  orientation: Orientation;
  diagramStyle: DiagramStyle;
  text: DotText;
}

const Shape = (props: ShapeProps): JSX.Element => {
  const { shape, strings, cross, dot, dotText } = useShape(props);

  const dots = shape.frets
    .filter((string) => !!string && Array.isArray(string))
    .flatMap(
      (string, stringIndex) =>
        string?.map((fret, fretIndex) => {
          if (!fret) {
            return cross(strings - 1 - stringIndex);
          } else {
            return dot(strings - 1 - stringIndex, fret, dotText(stringIndex, fretIndex));
          }
        }) || []
    );
  return <g>{dots}</g>;
};

export default Shape;

type ShapeHook = {
  shape: ShapeType;
  strings: number;
  cross: (string: number) => JSX.Element;
  dot: (string: number, fret: number, text?: string) => JSX.Element;
  dotText: (string: number, fretIndex: number) => string | undefined;
};

const useShape = ({
  className,
  shape,
  strings,
  orientation,
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

  const stringPosition = (offset: number, string: number): number =>
    offset + string * diagramStyle.stringInterval + diagramStyle.stringWidth / 2;

  const x = (string: number, fret: number): number => {
    const offset = diagramStyle.paddingTop;
    if (orientation === Orientation.HORIZONTAL) {
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

  const getNote = (string: number, fretIndex: number): string | undefined => {
    const notes = shape.notes[string];
    if (notes === null) {
      return;
    } else {
      const note = notes[fretIndex];
      return note !== null ? note : undefined;
    }
  };

  const dotText = (string: number, fretIndex: number): string | undefined => {
    if (!getNote(string, fretIndex)) {
      return;
    }
    switch (text) {
      case DotText.NOTE:
        return Note.pc(getNote(string, fretIndex) || '') || undefined;
      case DotText.NOTE_OCTAVE:
        return getNote(string, fretIndex);
      case DotText.FINGER:
        if (shape.fingers) {
          return (shape.fingers[string] || [])[fretIndex]?.toString();
        } else {
          return;
        }
    }
  };

  const cross = (string: number): JSX.Element => (
    <Fragment key={`${string}.X`}>
      <text
        x={x(string, 0)}
        y={y(string, 0)}
        alignmentBaseline={'central'}
        className={'fretboard-dot-number'}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
      >
        &#x2715;
      </text>
    </Fragment>
  );

  const dot = (string: number, fret: number, text?: string): JSX.Element => (
    <Fragment key={`${string}.${fret}`}>
      <circle
        cx={x(string, fret)}
        cy={y(string, fret)}
        r={diagramStyle.dotRadius}
        className={`${className} fretboard-dot`}
        strokeWidth={diagramStyle.dotStroke}
        stroke={dotStrokeColor}
        fill={fill}
      />
      <text
        x={x(string, fret)}
        y={y(string, fret)}
        alignmentBaseline={'central'}
        className={`${className} fretboard-dot-number`}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
      >
        {text}
      </text>
    </Fragment>
  );

  return {
    shape,
    strings,
    dot,
    cross,
    dotText,
  };
};
