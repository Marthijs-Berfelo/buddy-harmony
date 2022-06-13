import { FretNumberType, Orientation } from '../options';
import { DiagramStyle } from '../utils/diagram-style';
import React from 'react';

const STANDARD_NUMBERS = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

type FretNumbersProps = {
  frets: number;
  fretNumbers: FretNumberType;
  leftHanded: boolean;
  startAt: number;
  orientation: Orientation;
  diagramStyle: DiagramStyle;
};

const FretNumbers = (props: FretNumbersProps): JSX.Element => {
  const { fretNumbers } = useFretNumbers(props);

  return <g className={'fretboard-fret-numbers'}>{fretNumbers()}</g>;
};

export default FretNumbers;

type FretNumbersHook = {
  fretNumbers: () => JSX.Element[];
};

const useFretNumbers = ({
  frets,
  startAt,
  orientation,
  diagramStyle,
  leftHanded,
}: FretNumbersProps): FretNumbersHook => {
  const fretNumbers = (): JSX.Element[] => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return verticalFretNumbers();
      case Orientation.HORIZONTAL:
      default:
        return horizontalFretNumbers();
    }
  };

  const horizontalFretNumbers = (): JSX.Element[] => {
    const y = diagramStyle.paddingTop - diagramStyle.fretNumberDistance;
    const total = Math.trunc(frets);
    const numbers = Array.from(Array(total).keys())
      .map((index) => index + startAt)
      .filter((fret) => STANDARD_NUMBERS.includes(fret));
    if (leftHanded) {
      numbers.reverse();
    }
    return numbers.map((fret) => (
      <text
        key={'fn-' + fret}
        y={y}
        x={
          diagramStyle.paddingLeft +
          (fret - 1) * diagramStyle.fretInterval +
          diagramStyle.fretInterval -
          diagramStyle.dotIn +
          diagramStyle.fretWidth
        }
        fontSize={diagramStyle.fretNumberFontSize}
        stroke={diagramStyle.fretNumberColor}
        className={'fretboard-fret-number'}
      >
        {fret}
      </text>
    ));
  };

  const verticalFretNumbers = (): JSX.Element[] => {
    const x = diagramStyle.paddingLeft - diagramStyle.fretNumberDistance;
    const total = Math.trunc(frets);
    return Array.from(Array(total).keys())
      .map((index) => index + startAt)
      .filter((fret) => STANDARD_NUMBERS.includes(fret))
      .map((fret) => (
        <text
          key={'fn-' + fret}
          y={
            diagramStyle.paddingTop +
            (fret - 1) * diagramStyle.fretInterval +
            diagramStyle.fretInterval -
            diagramStyle.dotIn +
            diagramStyle.fretWidth
          }
          x={x}
          fontSize={diagramStyle.fretNumberFontSize}
          stroke={diagramStyle.fretNumberColor}
          className={'fretboard-fret-number'}
        >
          {fret}
        </text>
      ));
  };

  return { fretNumbers };
};
