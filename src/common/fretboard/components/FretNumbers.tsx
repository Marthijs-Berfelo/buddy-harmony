import { FretNumberType, Orientation } from '../options';
import { DiagramStyle } from '../utils';
import React from 'react';

const NUMBERS = new Map([
  [3, 'III'],
  [5, 'V'],
  [7, 'VII'],
  [9, 'IX'],
  [12, 'XII'],
  [15, 'XV'],
  [17, 'XVII'],
  [19, 'XIX'],
  [21, 'XXI'],
  [24, 'XXIV'],
]);

type FretNumbersProps = {
  frets: number;
  fretNumbers: FretNumberType;
  leftHanded: boolean;
  startAt: number;
  orientation: Orientation;
  diagramStyle: DiagramStyle;
};

const FretNumbers = (props: FretNumbersProps): JSX.Element => {
  const { fretNumberElements } = useFretNumbers(props);

  return <g className={'fretboard-fret-numbers'}>{fretNumberElements()}</g>;
};

export default FretNumbers;

type FretNumbersHook = {
  fretNumberElements: () => JSX.Element[];
};

const useFretNumbers = ({
  frets,
  fretNumbers,
  startAt,
  orientation,
  diagramStyle,
  leftHanded,
}: FretNumbersProps): FretNumbersHook => {
  const fretNumberElements = (): JSX.Element[] => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return verticalFretNumbers();
      case Orientation.HORIZONTAL:
      default:
        return horizontalFretNumbers();
    }
  };

  const numberFrets = (): number[] =>
    Array.from(Array(Math.trunc(frets) - (startAt === 1 ? 0 : 1)).keys())
      .map((fret) => fret + startAt)
      .filter((fret) => NUMBERS.has(fret));

  const numberText = (fret: number): string => {
    if (fretNumbers == FretNumberType.ROMAN) {
      return NUMBERS.get(fret) || '';
    } else {
      return fret.toString();
    }
  };

  const horizontalFretNumbers = (): JSX.Element[] => {
    const y = diagramStyle.padding - diagramStyle.fretNumberDistance;
    const numbers = numberFrets();
    if (leftHanded) {
      numbers.reverse();
    }
    return numbers.map((fret) => (
      <text
        key={'fn-' + fret}
        y={y}
        x={
          diagramStyle.padding +
          (startAt > 1 ? diagramStyle.fretInterval * 1.5 : 1) +
          (fret - 1 - (startAt > 1 ? startAt : 0)) * diagramStyle.fretInterval +
          diagramStyle.fretInterval -
          diagramStyle.dotIn +
          diagramStyle.fretWidth
        }
        fontSize={diagramStyle.fretNumberFontSize}
        className="font-sans stroke-0 fill-black"
      >
        {numberText(fret)}
      </text>
    ));
  };

  const verticalFretNumbers = (): JSX.Element[] => {
    const x = diagramStyle.padding - diagramStyle.fretNumberDistance;
    return numberFrets().map((fret) => (
      <text
        key={'fn-' + fret}
        y={
          diagramStyle.padding +
          (startAt > 1 ? diagramStyle.fretInterval * 1.5 : 1) +
          (fret - 1 - (startAt > 1 ? startAt : 0)) * diagramStyle.fretInterval +
          diagramStyle.fretInterval -
          diagramStyle.dotIn +
          diagramStyle.fretWidth
        }
        x={x}
        fontSize={diagramStyle.fretNumberFontSize}
        className="font-sans stroke-0 fill-grey-800 stroke-grey-800"
      >
        {numberText(fret)}
      </text>
    ));
  };

  return { fretNumberElements };
};
