import React, { MouseEvent } from 'react';
import { Tuning as ApiTuning } from 'fretboard-api';
import { DEFAULT_STYLE, DiagramStyle, StringAndFret } from '../utils/diagram-style';
import { DotText, FretNumberPosition, FretNumberType, Orientation } from '../options';
import Fretboard from './Fretboard';
import FretNumbers from './FretNumbers';
import ScaleShape from './ScaleShape';
import { ScaleFret, ScaleModel } from '../utils/scale';
import Tuning from './Tuning';
import { ChordPosition } from '../../../hooks';
import ChordShape from './ChordShape';

export interface DiagramProps {
  className: string;
  diagramStyle: DiagramStyle;
  orientation: Orientation;
  text: DotText;
  leftHanded: boolean;
  frets: number;
  startAt?: number;
  fretNumbers: FretNumberType;
  fretNumbersPosition: FretNumberPosition;
  tuning: string[];
  scale?: ScaleModel;
  chords?: ChordPosition[];
  chord?: ChordPosition;
  debug: boolean;
  clickHandler?: (
    event: MouseEvent<SVGSVGElement>,
    stringAndFret: StringAndFret
  ) => void | Promise<void>;
  moveHandler?: (
    event: MouseEvent<SVGSVGElement>,
    stringAndFret: StringAndFret
  ) => void | Promise<void>;
}

const Diagram = (
  props: DiagramProps = {
    className: '',
    diagramStyle: DEFAULT_STYLE,
    orientation: Orientation.HORIZONTAL,
    leftHanded: false,
    frets: 5,
    fretNumbers: FretNumberType.LATIN,
    fretNumbersPosition: FretNumberPosition.TOP,
    tuning: ApiTuning.guitar.standard,
    text: DotText.NOTE,
    debug: false,
  }
): JSX.Element => {
  const { onMouseClick, onMouseMove, strings, frets, startAt, tuning, viewBox, getShapes } =
    useDiagram(props);
  const {
    className,
    leftHanded,
    diagramStyle,
    orientation,
    scale,
    chord,
    chords,
    fretNumbers,
    text,
  } = props;

  return (
    <svg
      viewBox={viewBox()}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: '#eeeeee' }}
      preserveAspectRatio="xMinYMin meet"
      className={className}
      onClick={onMouseClick}
      onMouseMove={onMouseMove}
    >
      <g className={'fretboard'}>
        <Fretboard
          strings={strings}
          frets={frets}
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
  tuning,
  frets,
  scale,
  chord,
  leftHanded,
  orientation,
  clickHandler,
  moveHandler,
}: DiagramProps): DiagramHook => {
  const guitarTuning = tuning;
  const strings = guitarTuning.length;
  const fretCount = !!scale ? scale.fretzNumber : !!chord ? 5 : frets;

  const onMouseClick = (event: MouseEvent<SVGSVGElement>): void => {
    if (!clickHandler) {
      return;
    }

    const stringFrets = diagramStyle.getStringAndFretFromMouseEvent(
      event,
      strings,
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
      strings,
      frets,
      orientation
    );

    if (!stringAndFret) {
      return;
    }

    moveHandler(event, stringAndFret);
  };

  const getWidth = (): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return diagramStyle.fretBoundary(strings, orientation);
      case Orientation.HORIZONTAL:
      default:
        return diagramStyle.stringBoundary(fretCount, orientation);
    }
  };
  const getHeight = (): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return diagramStyle.stringBoundary(fretCount, orientation);
      case Orientation.HORIZONTAL:
      default:
        return diagramStyle.fretBoundary(strings, orientation);
    }
  };

  const viewBox = (): string => {
    return `0 0 ${getWidth()} ${getHeight()}`;
  };

  const getShapes = (scale: ScaleModel): ScaleFret[][] => {
    let models = Array.from(scale.info.values());
    if (leftHanded || orientation === Orientation.HORIZONTAL) {
      models = [...models.reverse()];
    }
    return models.filter((string) => !!string);
  };

  const getStartAt = (): number => {
    if (!!chord) {
      console.log('CHORD START', chord.baseFret, 'CHRD', chord);
      return chord.baseFret;
    }
    return 1;
  };

  return {
    onMouseClick,
    onMouseMove,
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
