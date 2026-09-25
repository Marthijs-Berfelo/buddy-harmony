import type { JSX } from 'react';
import React, { MouseEvent } from 'react';
import {
  DotText,
  FretNumberPosition,
  FretNumberType,
  NOTE_GLOW_FILTER_ID,
  Orientation,
  ScaleFret,
  ScaleModel,
  StringAndFret,
} from '../options';
import { Fretboard } from './fretboard';
import { FretNumbers } from './fret-numbers';
import { ScaleShape } from './scale-shape';
import { Tuning } from './tuning';
import { ChordPosition, useSettings } from 'hooks';
import { ChordShape } from './chord-shape';
import { useDirectional } from '../utils/directional';
import { CagedShapeInput, dedupeCagedDots, ShapeColor } from '../utils';

const MIN_CAGED_FRETS = 12;
const MAX_CAGED_FRETS = 15;

export interface DiagramProps {
  className: string;
  diagramCount?: number;
  text: DotText;
  startAt?: number;
  fretNumbersPosition: FretNumberPosition;
  scale?: ScaleModel;
  chord?: ChordPosition;
  cagedShapes?: CagedShapeInput[];
  cagedColor?: ShapeColor;
  scaleModel?: ScaleModel;
  showTriads?: boolean;
  rootNote?: string;
  debug?: boolean;
  clickHandler?: (
    event: MouseEvent<SVGSVGElement>,
    stringAndFret: StringAndFret
  ) => void | Promise<void>;
  moveHandler?: (
    event: MouseEvent<SVGSVGElement>,
    stringAndFret: StringAndFret
  ) => void | Promise<void>;
}

export const Diagram = (props: DiagramProps): JSX.Element => {
  const { onMouseClick, onMouseMove, frets, startAt, viewBox, getHeight, getWidth, getShapes } =
    useDiagram(props);
  const { fretNumbers } = useSettings();
  const {
    className,
    scale,
    chord,
    cagedShapes,
    cagedColor,
    scaleModel,
    showTriads,
    rootNote,
    text,
  } = props;

  return (
    <svg
      viewBox={viewBox()}
      width={getWidth()}
      height={getHeight()}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      className={`${className} bg-white`}
      onClick={onMouseClick}
      onMouseMove={onMouseMove}
    >
      <defs>
        <filter id={NOTE_GLOW_FILTER_ID} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g className={'fretboard'}>
        <Fretboard
          frets={frets}
          chord={!!chord || !!cagedShapes?.length}
          startAt={startAt}
          cagedOverlay={!!cagedShapes?.length}
        />
        {scale && <ScaleShape className={className} scale={getShapes(scale)} text={text} />}
        {/* scale, chord and cagedShapes are mutually exclusive — callers pass exactly
            one. scale and cagedShapes both render via ScaleShape, chord via ChordShape. */}
        {chord && <ChordShape className={className} chord={chord} cagedColor={cagedColor} />}
        {!!cagedShapes?.length && !scaleModel && (
          <ScaleShape
            className={className}
            cagedShapes={cagedShapes}
            showTriads={showTriads}
            rootNote={rootNote}
          />
        )}
        {!!cagedShapes?.length && scaleModel && (
          <ScaleShape
            className={className}
            cagedShapes={cagedShapes}
            scale={getShapes(scaleModel)}
            text={text}
            showTriads={showTriads}
          />
        )}
        {fretNumbers !== FretNumberType.NONE && <FretNumbers frets={frets} startAt={startAt} />}
        <Tuning />
      </g>
    </svg>
  );
};

type DiagramHook = {
  onMouseClick: (event: MouseEvent<SVGSVGElement>) => void;
  onMouseMove: (event: MouseEvent<SVGSVGElement>) => void;
  frets: number;
  startAt: number;
  viewBox: () => string;
  getShapes: (scale: ScaleModel) => ScaleFret[][];
  getWidth: () => number;
  getHeight: () => number;
};

const useDiagram = ({
  scale,
  chord,
  cagedShapes,
  clickHandler,
  moveHandler,
}: DiagramProps): DiagramHook => {
  const { orientation, leftHanded, diagramStyle, stringCount, fretCount } = useSettings();
  const { onStrings } = useDirectional<ScaleFret[], unknown>({ orientation, leftHanded });
  const cagedFrets = cagedShapes?.length
    ? Math.max(...dedupeCagedDots(cagedShapes).map((dot) => dot.fret), 1) + 1
    : undefined;
  const frets = cagedFrets
    ? Math.min(Math.max(cagedFrets, MIN_CAGED_FRETS), MAX_CAGED_FRETS)
    : fretCount(scale, chord);

  const onMouseClick = (event: MouseEvent<SVGSVGElement>): void => {
    if (!clickHandler) {
      return;
    }

    const stringFrets = diagramStyle.getStringAndFretFromMouseEvent(
      event,
      stringCount,
      frets,
      orientation
    );

    if (!stringFrets) {
      return;
    }
    clickHandler(event, stringFrets);
  };

  const onMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
    if (!moveHandler) {
      return;
    }

    const stringAndFret = diagramStyle.getStringAndFretFromMouseEvent(
      event,
      stringCount,
      frets,
      orientation
    );

    if (!stringAndFret) {
      return;
    }

    moveHandler(event, stringAndFret);
  };

  const width = (): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return diagramStyle.fretBoundary(stringCount, orientation);
      case Orientation.HORIZONTAL:
      default:
        return diagramStyle.stringBoundary(frets, orientation);
    }
  };

  const getWidth = (): number => {
    return (width() / height()) * getHeight();
  };

  const height = (): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return diagramStyle.stringBoundary(frets, orientation);
      case Orientation.HORIZONTAL:
      default:
        return diagramStyle.fretBoundary(stringCount, orientation);
    }
  };

  const getHeight = (): number => {
    const factor = chord || cagedShapes?.length ? 2 : 1.5;
    return height() / factor;
  };

  const viewBox = (): string => {
    return `0 0 ${width()} ${height()}`;
  };

  const getShapes = (scale: ScaleModel): ScaleFret[][] =>
    onStrings(Array.from(scale.info.values())).filter((string) => !!string);

  const getStartAt = (): number => (cagedShapes?.length ? 1 : chord?.baseFret || 1);

  return {
    onMouseClick,
    onMouseMove,
    frets: frets,
    startAt: getStartAt(),
    viewBox,
    getShapes,
    getWidth,
    getHeight,
  };
};
