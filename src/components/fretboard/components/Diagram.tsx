import React, { MouseEvent } from 'react';
import { Tuning as ApiTuning } from 'fretboard-api';
import { DEFAULT_STYLE, DiagramStyle, StringAndFret } from '../utils/diagram-style';
import { DotText, FretNumberPosition, FretNumberType, Orientation } from '../options';
import Fretboard from './Fretboard';
import FretNumbers from './FretNumbers';
import Shape from './Shape';
import { ScaleFret, ScaleModel } from '../utils/scale';
import Tuning from './Tuning';

export interface DiagramProps {
  className: string;
  diagramStyle: DiagramStyle;
  orientation: Orientation;
  text: DotText;
  leftHanded: boolean;
  frets: number;
  fretNumbers: FretNumberType;
  fretNumbersPosition: FretNumberPosition;
  tuning: string[];
  scale?: ScaleModel;
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
  const { onMouseClick, onMouseMove, strings, frets, tuning, viewBox, getShapes } =
    useDiagram(props);
  const { className, leftHanded, diagramStyle, orientation, scale, fretNumbers, text } = props;

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
      <g className={'fretboard-group'}>
        <Fretboard
          strings={strings}
          frets={frets}
          orientation={orientation}
          diagramStyle={diagramStyle}
        />
        {scale && (
          <Shape
            className={className}
            shape={getShapes(scale)}
            strings={strings}
            orientation={orientation}
            leftHanded={leftHanded}
            diagramStyle={diagramStyle}
            text={text}
          />
        )}
        {fretNumbers !== FretNumberType.NONE && (
          <FretNumbers
            frets={frets}
            fretNumbers={fretNumbers}
            startAt={1}
            orientation={orientation}
            leftHanded={leftHanded}
            diagramStyle={diagramStyle}
          />
        )}
        <Tuning tuning={tuning} diagramStyle={diagramStyle} orientation={orientation} />
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
  leftHanded,
  orientation,
  clickHandler,
  moveHandler,
}: DiagramProps): DiagramHook => {
  const guitarTuning = !!scale ? scale.tuning : tuning;
  const strings = guitarTuning.length;
  const fretCount = !!scale ? scale.fretzNumber + 1 : frets;

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
        return diagramStyle.stringBoundary(frets, orientation);
    }
  };
  const getHeight = (): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return diagramStyle.stringBoundary(frets, orientation);
      case Orientation.HORIZONTAL:
      default:
        return diagramStyle.fretBoundary(strings, orientation);
    }
  };

  const viewBox = (): string => {
    return `0 0 ${getWidth()} ${getHeight()}`;
  };

  const getShapes = (scale: ScaleModel): ScaleFret[][] => {
    console.log('Get shapes from', scale);
    const models = Array.from(scale.info.values());
    if (leftHanded || orientation === Orientation.HORIZONTAL) {
      models.reverse();
    }
    console.log('Extracted shape', models);
    return models.filter((string) => !!string);
  };

  return {
    onMouseClick,
    onMouseMove,
    strings,
    frets: fretCount,
    tuning: guitarTuning,
    viewBox,
    getShapes,
    getWidth,
    getHeight,
  };
};
