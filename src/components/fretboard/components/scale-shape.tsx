import type { JSX } from 'react';
import { DotText, NOTE_GLOW_FILTER_ID, ScaleFret } from '../options';
import { Fragment } from 'react';
import { ShapeProps, useShape } from '../utils';
import { useSettings } from 'hooks';
import { NoteDot } from './note-dot';

interface ScaleShapeProps extends ShapeProps {
  scale: ScaleFret[][];
  text: DotText;
}

export const ScaleShape = (props: ScaleShapeProps): JSX.Element => {
  const { scaleShape } = useScaleShape(props);

  return <g>{scaleShape}</g>;
};

type ScaleShapeHook = {
  scaleShape: JSX.Element[];
};

interface ScaleColor {
  strokeClassName: string;
  textClassName: string;
  emphasisStrokeClassName: string;
  emphasisFillClassName: string;
  emphasisTextClassName: string;
}

const TRIAD_POSITIONS = new Set([1, 3, 5]);

const SCALE_COLORS: Record<number, ScaleColor> = {
  1: {
    strokeClassName: 'stroke-red-700',
    textClassName: 'fill-red-500',
    emphasisStrokeClassName: 'stroke-red-700',
    emphasisFillClassName: 'fill-red-700',
    emphasisTextClassName: 'fill-white',
  },
  2: {
    strokeClassName: 'stroke-orange-700',
    textClassName: 'fill-orange-500',
    emphasisStrokeClassName: 'stroke-orange-700',
    emphasisFillClassName: 'fill-orange-700',
    emphasisTextClassName: 'fill-white',
  },
  3: {
    strokeClassName: 'stroke-teal-700',
    textClassName: 'fill-teal-500',
    emphasisStrokeClassName: 'stroke-teal-700',
    emphasisFillClassName: 'fill-teal-700',
    emphasisTextClassName: 'fill-white',
  },
  4: {
    strokeClassName: 'stroke-green-700',
    textClassName: 'fill-green-500',
    emphasisStrokeClassName: 'stroke-green-700',
    emphasisFillClassName: 'fill-green-700',
    emphasisTextClassName: 'fill-white',
  },
  5: {
    strokeClassName: 'stroke-pink-700',
    textClassName: 'fill-pink-500',
    emphasisStrokeClassName: 'stroke-pink-700',
    emphasisFillClassName: 'fill-pink-700',
    emphasisTextClassName: 'fill-white',
  },
  6: {
    strokeClassName: 'stroke-lime-700',
    textClassName: 'fill-lime-500',
    emphasisStrokeClassName: 'stroke-lime-700',
    emphasisFillClassName: 'fill-lime-700',
    emphasisTextClassName: 'fill-white',
  },
  7: {
    strokeClassName: 'stroke-purple-700',
    textClassName: 'fill-purple-500',
    emphasisStrokeClassName: 'stroke-purple-700',
    emphasisFillClassName: 'fill-purple-700',
    emphasisTextClassName: 'fill-white',
  },
  8: {
    strokeClassName: 'stroke-indigo-700',
    textClassName: 'fill-indigo-500',
    emphasisStrokeClassName: 'stroke-indigo-700',
    emphasisFillClassName: 'fill-indigo-700',
    emphasisTextClassName: 'fill-white',
  },
};

const DEFAULT_SCALE_COLOR: ScaleColor = {
  strokeClassName: 'stroke-black',
  textClassName: 'fill-black',
  emphasisStrokeClassName: 'stroke-black',
  emphasisFillClassName: 'fill-black',
  emphasisTextClassName: 'fill-white',
};

const useScaleShape = ({ className, scale, text }: ScaleShapeProps): ScaleShapeHook => {
  const { diagramStyle, stringCount } = useSettings();
  const { x, y } = useShape();

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

  const scaleColor = (scalePosition?: number): ScaleColor =>
    (scalePosition !== undefined && SCALE_COLORS[scalePosition]) || DEFAULT_SCALE_COLOR;

  const isTriadTone = (scalePosition?: number): boolean =>
    scalePosition !== undefined && TRIAD_POSITIONS.has(scalePosition);

  const dot = (
    string: number,
    fret: number,
    text?: string,
    scalePosition?: number
  ): JSX.Element => {
    const color = scaleColor(scalePosition);
    const emphasized = isTriadTone(scalePosition);
    const cx = x(diagramStyle.padding, string, fret, 0);
    const cy = y(diagramStyle.padding, string, fret, 0);

    return (
      <Fragment key={`${string}.${fret}`}>
        <NoteDot
          cx={cx}
          cy={cy}
          radius={diagramStyle.dotRadius}
          strokeWidth={diagramStyle.dotStroke}
          className={className}
          strokeClassName={color.strokeClassName}
          fillClassName="fill-white"
          emphasisStrokeClassName={color.emphasisStrokeClassName}
          emphasisFillClassName={color.emphasisFillClassName}
          emphasized={emphasized}
          glowFilterId={NOTE_GLOW_FILTER_ID}
        />
        <text
          x={cx}
          y={cy}
          alignmentBaseline={'central'}
          className={`${className} text-lg font-sans stroke-1 ${
            emphasized ? color.emphasisTextClassName : color.textClassName
          }`}
        >
          {text}
        </text>
      </Fragment>
    );
  };

  const scaleShape = scale.flatMap((string, stringIndex) =>
    string
      .filter((fret) => fret.isPartOfScale)
      .map((fret) => {
        return dot(stringCount - 1 - stringIndex, fret.freet, dotText(fret), fret.scalePosition);
      })
  );
  return {
    scaleShape,
  };
};
