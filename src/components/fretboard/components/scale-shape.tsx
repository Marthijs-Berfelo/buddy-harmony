import type { JSX } from 'react';
import { DotText, NOTE_GLOW_FILTER_ID, ScaleFret } from '../options';
import { Fragment } from 'react';
import {
  CagedDot,
  CagedShapeInput,
  dedupeCagedDots,
  mergeCagedAndScaleDots,
  ShapeProps,
  useShape,
} from '../utils';
import { useSettings } from 'hooks';
import { NoteDot } from './note-dot';
import { useDirectional } from '../utils/directional';

type ScaleShapeProps = ShapeProps &
  (
    | {
        scale: ScaleFret[][];
        text: DotText;
        cagedShapes?: never;
        showTriads?: never;
        rootNote?: never;
      }
    | {
        cagedShapes: CagedShapeInput[];
        scale?: never;
        text?: never;
        showTriads?: boolean;
        rootNote?: string;
      }
    | {
        cagedShapes: CagedShapeInput[];
        scale: ScaleFret[][];
        text: DotText;
        showTriads?: boolean;
        rootNote?: never;
      }
  );

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

/**
 * Extracts just the `stroke-*` token from a combined `stroke-* fill-*` color class string
 * (the convention every CAGED shape/neutral color constant follows, e.g.
 * `NEUTRAL_SCALE_DOT_COLOR` or `CAGED_COLORS.C.caged`) — used, paired with `fill-white`, to
 * render scale-only dots as outline (colored stroke, white fill) rather than solid.
 */
const strokeToken = (color: string): string =>
  color.split(/\s+/).find((token) => token.startsWith('stroke-')) ?? color;

const DEFAULT_SCALE_COLOR: ScaleColor = {
  strokeClassName: 'stroke-black',
  textClassName: 'fill-black',
  emphasisStrokeClassName: 'stroke-black',
  emphasisFillClassName: 'fill-black',
  emphasisTextClassName: 'fill-white',
};

const useScaleShape = ({
  className,
  scale,
  text,
  cagedShapes,
  showTriads,
  rootNote,
}: ScaleShapeProps): ScaleShapeHook => {
  const { orientation, leftHanded, diagramStyle, stringCount } = useSettings();
  const { x, y } = useShape();
  const { onStrings } = useDirectional<number, unknown>({ orientation, leftHanded });
  const { onStrings: onStringNotes } = useDirectional<string, unknown>({
    orientation,
    leftHanded,
  });

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

  const isRootTone = (scalePosition?: number): boolean => scalePosition === 1;

  const dot = (
    string: number,
    fret: number,
    text?: string,
    scalePosition?: number
  ): JSX.Element => {
    const color = scaleColor(scalePosition);
    const isTriad = isTriadTone(scalePosition);
    const isRoot = isRootTone(scalePosition);
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
          isRoot={isRoot}
          isTriad={isTriad}
          glowFilterId={NOTE_GLOW_FILTER_ID}
        />
        <text
          x={cx}
          y={cy}
          alignmentBaseline={'central'}
          className={`${className} text-lg font-sans stroke-1 ${
            isTriad || isRoot ? color.emphasisTextClassName : color.textClassName
          }`}
        >
          {text}
        </text>
      </Fragment>
    );
  };

  const cagedDot = ({ string, fret, color, note, fromScale }: CagedDot): JSX.Element => (
    <Fragment key={`caged.${string}.${fret}`}>
      <circle
        key={`caged.${string}.${fret}.dot`}
        cx={x(diagramStyle.padding, string, fret, 0)}
        cy={y(diagramStyle.padding, string, fret, 0)}
        r={diagramStyle.dotRadius}
        className={`${className} ${fromScale ? `${strokeToken(color)} fill-white` : color}`}
      />
      <text
        key={`caged.${string}.${fret}.note`}
        x={x(diagramStyle.padding, string, fret, 0)}
        y={y(diagramStyle.padding, string, fret, 0)}
        alignmentBaseline={'central'}
        className={`${className} text-2xl font-sans stroke-2 ${
          fromScale ? 'stroke-black' : 'stroke-white'
        }`}
      >
        {note}
      </text>
    </Fragment>
  );

  const reorderShapes = (shapes: CagedShapeInput[]): CagedShapeInput[] =>
    shapes.map(({ chord: shapeChord, color }) => ({
      chord: {
        ...shapeChord,
        frets: onStrings(shapeChord.frets),
        notes: shapeChord.notes && onStringNotes(shapeChord.notes),
      },
      color,
    }));

  const cagedDots = (shapes: CagedShapeInput[]): JSX.Element[] =>
    dedupeCagedDots(reorderShapes(shapes), rootNote, showTriads).map(mergedDot);

  const mergedDot = (dot: CagedDot): JSX.Element => {
    if (!dot.emphasized && !dot.isRoot) {
      return cagedDot(dot);
    }

    const { string, fret, color, note, fromScale, emphasized, isRoot } = dot;
    const cx = x(diagramStyle.padding, string, fret, 0);
    const cy = y(diagramStyle.padding, string, fret, 0);
    // Scale-only dots stand out via the halo/thicker-stroke glow alone, never a solid fill —
    // real CAGED chord-tone dots keep their existing solid look even when emphasized.
    const strokeClass = fromScale ? strokeToken(color) : color;
    const fillClass = fromScale ? 'fill-white' : color;

    return (
      <Fragment key={`merged.${string}.${fret}`}>
        <NoteDot
          cx={cx}
          cy={cy}
          radius={diagramStyle.dotRadius}
          strokeWidth={diagramStyle.dotStroke}
          className={className}
          strokeClassName={strokeClass}
          fillClassName={fillClass}
          emphasisStrokeClassName={strokeClass}
          emphasisFillClassName={fillClass}
          isRoot={isRoot}
          isTriad={emphasized}
          glowFilterId={NOTE_GLOW_FILTER_ID}
        />
        <text
          key={`merged.${string}.${fret}.note`}
          x={cx}
          y={cy}
          alignmentBaseline={'central'}
          className={`${className} text-2xl font-sans stroke-2 ${
            fromScale ? 'stroke-black' : 'stroke-white'
          }`}
        >
          {note}
        </text>
      </Fragment>
    );
  };

  const mergedShape = (shapes: CagedShapeInput[], scaleFrets: ScaleFret[][]): JSX.Element[] =>
    mergeCagedAndScaleDots(reorderShapes(shapes), scaleFrets, stringCount, showTriads ?? true).map(
      mergedDot
    );

  const scaleShape =
    cagedShapes?.length && scale
      ? mergedShape(cagedShapes, scale)
      : scale
        ? scale.flatMap((string, stringIndex) =>
            string
              .filter((fret) => fret.isPartOfScale)
              .map((fret) => {
                return dot(
                  stringCount - 1 - stringIndex,
                  fret.freet,
                  dotText(fret),
                  fret.scalePosition
                );
              })
          )
        : cagedShapes?.length
          ? cagedDots(cagedShapes)
          : [];

  return {
    scaleShape,
  };
};
