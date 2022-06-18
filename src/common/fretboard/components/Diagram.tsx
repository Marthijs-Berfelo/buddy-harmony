import React, { MouseEvent } from 'react';
import { DEFAULT_STYLE, DiagramStyle, ScaleFret, ScaleModel, StringAndFret } from '../utils';
import { DotText, FretNumberPosition, FretNumberType, Orientation } from '../options';
import Fretboard from './Fretboard';
import FretNumbers from './FretNumbers';
import ScaleShape from './ScaleShape';
import Tuning from './Tuning';
import { ChordPosition } from '../../../hooks';
import ChordShape from './ChordShape';

const CHORD_FRETS = 5;
const DEFAULT_FRETS = 12;

export interface DiagramProps {
  className: string;
  diagramStyle?: DiagramStyle;
  diagramCount: number;
  orientation: Orientation;
  text: DotText;
  leftHanded: boolean;
  startAt?: number;
  fretNumbers: FretNumberType;
  fretNumbersPosition: FretNumberPosition;
  tuning: string[];
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
  const {
    onMouseClick,
    onMouseMove,
    diagramStyle,
    strings,
    frets,
    startAt,
    tuning,
    viewBox,
    getHeight,
    getWidth,
    getShapes,
  } = useDiagram(props);
  const { className, leftHanded, orientation, scale, chord, chords, fretNumbers, text } = props;

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
        <Fretboard
          strings={strings}
          frets={frets}
          chord={!!chord}
          startAt={startAt}
          orientation={orientation}
          diagramStyle={diagramStyle}
        />
        {scale && (
          <ScaleShape
            className={className}
            scale={getShapes(scale)}
            strings={strings}
            orientation={orientation}
            leftHanded={leftHanded}
            diagramStyle={diagramStyle}
            text={text}
          />
        )}
        {chord && (
          <ChordShape
            className={className}
            strings={strings}
            chord={chord}
            leftHanded={leftHanded}
            orientation={orientation}
            diagramStyle={diagramStyle}
          />
        )}
        {chords && (
          <ChordShape
            className={className}
            strings={strings}
            chords={chords}
            leftHanded={leftHanded}
            orientation={orientation}
            diagramStyle={diagramStyle}
          />
        )}
        {fretNumbers !== FretNumberType.NONE && (
          <FretNumbers
            frets={frets}
            fretNumbers={fretNumbers}
            startAt={startAt}
            orientation={orientation}
            leftHanded={leftHanded}
            diagramStyle={diagramStyle}
          />
        )}
        <Tuning
          tuning={tuning}
          leftHanded={leftHanded}
          orientation={orientation}
          diagramStyle={diagramStyle}
        />
      </g>
    </svg>
  );
};

export default Diagram;

type DiagramHook = {
  onMouseClick: (event: MouseEvent<SVGSVGElement>) => void;
  onMouseMove: (event: MouseEvent<SVGSVGElement>) => void;
  diagramStyle: DiagramStyle;
  strings: number;
  frets: number;
  startAt: number;
  viewBox: () => string;
  tuning: string[];
  getShapes: (scale: ScaleModel) => ScaleFret[][];
  getWidth: () => number;
  getHeight: () => number;
};

const useDiagram = ({
  diagramStyle,
  diagramCount,
  tuning,
  scale,
  chord,
  chords,
  leftHanded,
  orientation,
  clickHandler,
  moveHandler,
}: DiagramProps): DiagramHook => {
  const guitarTuning = tuning;
  const strings = guitarTuning.length;
  const fretCount = !!scale ? scale.fretzNumber : !!chord ? CHORD_FRETS : DEFAULT_FRETS;
  const style = diagramStyle || DEFAULT_STYLE;

  const onMouseClick = (event: MouseEvent<SVGSVGElement>): void => {
    if (!clickHandler) {
      return;
    }

    const stringFrets = style.getStringAndFretFromMouseEvent(
      event,
      strings,
      fretCount,
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

    const stringAndFret = style.getStringAndFretFromMouseEvent(
      event,
      strings,
      fretCount,
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
        return style.fretBoundary(strings, orientation);
      case Orientation.HORIZONTAL:
      default:
        return style.stringBoundary(fretCount, orientation);
    }
  };

  const getWidth = (): number => {
    return width() / (diagramCount > 1 ? diagramCount / 2 : 1.5);
  };

  const height = (): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return style.stringBoundary(fretCount, orientation);
      case Orientation.HORIZONTAL:
      default:
        return style.fretBoundary(strings, orientation);
    }
  };

  const getHeight = (): number => {
    const factor = !!chord || !!chords ? 2 : 1;
    return height() / factor;
  };

  const viewBox = (): string => {
    return `0 0 ${width()} ${height()}`;
  };

  const getShapes = (scale: ScaleModel): ScaleFret[][] => {
    let models = Array.from(scale.info.values());
    if (leftHanded || orientation === Orientation.HORIZONTAL) {
      models = [...models.reverse()];
    }
    return models.filter((string) => !!string);
  };

  const getStartAt = (): number => chord?.baseFret || 1;

  return {
    onMouseClick,
    onMouseMove,
    diagramStyle: style,
    strings,
    frets: fretCount,
    startAt: getStartAt(),
    tuning: guitarTuning,
    viewBox,
    getShapes,
    getWidth,
    getHeight,
  };
};
