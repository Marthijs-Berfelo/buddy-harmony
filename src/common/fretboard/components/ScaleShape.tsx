import { DotText } from '../options';
import React, { Fragment } from 'react';
import { ShapeProps, useShape, ScaleFret } from '../utils';

interface ScaleShapeProps extends ShapeProps {
  scale: ScaleFret[][];
  text: DotText;
}

const ScaleShape = (props: ScaleShapeProps): JSX.Element => {
  const { scaleShape } = useScaleShape(props);

  return <g>{scaleShape}</g>;
};

export default ScaleShape;

type ScaleShapeHook = {
  scaleShape: JSX.Element[];
};

const useScaleShape = ({
  className,
  scale,
  strings,
  orientation,
  leftHanded,
  diagramStyle,
  text,
}: ScaleShapeProps): ScaleShapeHook => {
  const { x, y } = useShape({ className, strings, leftHanded, orientation, diagramStyle });

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

  const dot = (
    string: number,
    fret: number,
    text?: string,
    scalePosition?: number
  ): JSX.Element => (
    <Fragment key={`${string}.${fret}`}>
      <circle
        cx={x(diagramStyle.padding, string, fret, 0)}
        cy={y(diagramStyle.padding, string, fret, 0)}
        r={diagramStyle.dotRadius}
        className={`${className} fill-white ${scalePositionClass(false, scalePosition)}`}
        strokeWidth={diagramStyle.dotStroke}
      />
      <text
        x={x(diagramStyle.padding, string, fret, 0)}
        y={y(diagramStyle.padding, string, fret, 0)}
        alignmentBaseline={'central'}
        className={`${className} text-lg font-sans stroke-1 ${scalePositionClass(
          true,
          scalePosition
        )}`}
      >
        {text}
      </text>
    </Fragment>
  );

  const scalePositionClass = (isText: boolean, scalePosition?: number): string => {
    switch (scalePosition) {
      case 0:
        return isText ? 'fill-blue-500' : 'stroke-blue-500';
      case 1:
        return isText ? 'fill-red-500' : 'stroke-red-500';
      case 2:
        return isText ? 'fill-orange-500' : 'stroke-orange-500';
      case 3:
        return isText ? 'fill-teal-500' : 'stroke-teal-500';
      case 4:
        return isText ? 'fill-green-500' : 'stroke-green-500';
      case 5:
        return isText ? 'fill-pink-500' : 'stroke-pink-500';
      case 6:
        return isText ? 'fill-lime-500' : 'stroke-lime-500';
      case 7:
        return isText ? 'fill-purple-500' : 'stroke-purple-500';
      case 8:
        return isText ? 'fill-indigo-500' : 'stroke-indigo-500';
      case undefined:
      default:
        return isText ? 'fill-black' : 'stroke-black';
    }
  };

  const scaleShape = scale.flatMap((string, stringIndex) =>
    string
      .filter((fret) => fret.isPartOfScale)
      .map((fret) => {
        return dot(strings - 1 - stringIndex, fret.freet, dotText(fret), fret.scalePosition);
      })
  );
  return {
    scaleShape,
  };
};
