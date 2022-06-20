import React, { MouseEvent } from 'react';
import { ScaleFret, ScaleModel, StringAndFret } from '../utils';
import { DotText, FretNumberPosition, FretNumberType, Orientation } from '../options';
import Fretboard from './Fretboard';
import FretNumbers from './FretNumbers';
import ScaleShape from './ScaleShape';
import Tuning from './Tuning';
import { ChordPosition, useSettings } from '../../../hooks';
import ChordShape from './ChordShape';
import { useDirectional } from '../utils/directional';

export interface DiagramProps {
  className: string;
  diagramCount?: number;
  text: DotText;
  startAt?: number;
  fretNumbersPosition: FretNumberPosition;
  scale?: ScaleModel;
  chords?: ChordPosition[];
  chord?: ChordPosition;
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

const Diagram = (props: DiagramProps): JSX.Element => {
  const { onMouseClick, onMouseMove, frets, startAt, viewBox, getHeight, getWidth, getShapes } =
    useDiagram(props);
  const { fretNumbers } = useSettings();
  const { className, scale, chord, chords, text } = props;

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
      <g className={'fretboard'}>
        <Fretboard frets={frets} chord={!!chord} startAt={startAt} />
        {scale && <ScaleShape className={className} scale={getShapes(scale)} text={text} />}
        {chord && <ChordShape className={className} chord={chord} />}
        {chords && <ChordShape className={className} chords={chords} />}
        {fretNumbers !== FretNumberType.NONE && <FretNumbers frets={frets} startAt={startAt} />}
        <Tuning />
      </g>
    </svg>
  );
};

export default Diagram;

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
  diagramCount,
  scale,
  chord,
  chords,
  clickHandler,
  moveHandler,
}: DiagramProps): DiagramHook => {
  const { orientation, leftHanded, diagramStyle, stringCount, fretCount } = useSettings();
  const { onStrings } = useDirectional<ScaleFret[], unknown>({ orientation, leftHanded });
  const frets = fretCount(scale, chord);

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
    return width() / ((diagramCount || 1) > 1 ? (diagramCount || 1) / 2 : 1.5);
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
    const factor = !!chord || !!chords ? 2 : 1.5;
    return height() / factor;
  };

  const viewBox = (): string => {
    return `0 0 ${width()} ${height()}`;
  };

  const getShapes = (scale: ScaleModel): ScaleFret[][] =>
    onStrings(Array.from(scale.info.values())).filter((string) => !!string);

  const getStartAt = (): number => chord?.baseFret || 1;

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
