import React, { MouseEvent } from 'react';
import { Fretboard as F, Shape as S, ShapeType, Tuning } from 'fretboard-api';
import { DEFAULT_STYLE, DiagramStyle, StringAndFret } from '../utils/diagram-style';
import { DotText, FretNumberPosition, FretNumberType, Orientation } from '../options';
import Fretboard from './Fretboard';
import FretNumbers from './FretNumbers';
import Shape from './Shape';

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
  shapes?: any[];
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
    tuning: Tuning.guitar.standard,
    text: DotText.NOTE,
    debug: false,
  }
): JSX.Element => {
  const { onMouseClick, onMouseMove, strings, viewBox, getShapes } = useDiagram(props);
  const { className, diagramStyle, orientation, frets, shapes, fretNumbers, text } = props;

  return (
    <svg
      viewBox={viewBox()}
      xmlns="http://www.w3.org/2000/svg"
      style={{ backgroundColor: '#eeeeee' }}
      preserveAspectRatio="xMinYMin meet"
      width="100%"
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
        {shapes &&
          getShapes(shapes).map((shape, index) => (
            <Shape
              key={index}
              className={className}
              shape={shape}
              strings={strings}
              orientation={orientation}
              diagramStyle={diagramStyle}
              text={text}
            />
          ))}
        {fretNumbers !== FretNumberType.NONE && (
          <FretNumbers
            frets={frets}
            fretNumbers={fretNumbers}
            startAt={1}
            orientation={orientation}
            diagramStyle={diagramStyle}
          />
        )}
      </g>
    </svg>
  );
};

export default Diagram;

type DiagramHook = {
  onMouseClick: (event: MouseEvent<SVGSVGElement>) => void;
  onMouseMove: (event: MouseEvent<SVGSVGElement>) => void;
  strings: number;
  viewBox: () => string;
  getShapes: (shapes: object[]) => ShapeType[];
};

const useDiagram = ({
  diagramStyle,
  tuning,
  frets,
  orientation,
  clickHandler,
  moveHandler,
}: DiagramProps): DiagramHook => {
  const strings = tuning.length;

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

  const viewBox = (): string => {
    const stringBound = diagramStyle.stringBoundary(frets, orientation);
    const fretBound = diagramStyle.fretBoundary(strings, orientation);

    switch (orientation) {
      case Orientation.VERTICAL:
        return `0 0 ${fretBound} ${stringBound}`;
      case Orientation.HORIZONTAL:
      default:
        return `0 0 ${stringBound} ${fretBound}`;
    }
  };

  const getShapes = (shapes: object[]): ShapeType[] =>
    shapes.map((shape) => F.play(S.create(shape)));

  return {
    onMouseClick,
    onMouseMove,
    strings,
    viewBox,
    getShapes,
  };
};
