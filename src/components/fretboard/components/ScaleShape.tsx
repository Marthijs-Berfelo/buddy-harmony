import { DotText } from '../options';
import React, { Fragment } from 'react';
import { ScaleFret } from '../utils/scale';
import './ScaleShape.css';
import { ShapeProps, useShape } from '../utils/shape';

const fill = 'white';
const dotStrokeColor = 'grey';
const textColor = 'black';

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
        className={`${className} scale-dot scale-dot${scalePositionClass(scalePosition)}`}
        strokeWidth={diagramStyle.dotStroke}
        stroke={dotStrokeColor}
        fill={fill}
      />
      <text
        x={x(diagramStyle.padding, string, fret, 0)}
        y={y(diagramStyle.padding, string, fret, 0)}
        alignmentBaseline={'central'}
        className={`${className} scale-dot-text scale-dot-text${scalePositionClass(scalePosition)}`}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
      >
        {text}
      </text>
    </Fragment>
  );

  const scalePositionClass = (scalePosition?: number): string =>
    scalePosition !== undefined ? `-${scalePosition}` : '';

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
