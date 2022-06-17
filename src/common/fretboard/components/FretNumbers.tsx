import { FretNumberType, Orientation } from '../options';
import { DiagramStyle } from '../utils';
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

  const numberFrets = (): number[] =>
    Array.from(Array(Math.trunc(frets) - (startAt === 1 ? 0 : 1)).keys())
      .map((fret) => fret + startAt)
      .filter((fret) => STANDARD_NUMBERS.includes(fret));

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
          (startAt > 1 ? diagramStyle.fretInterval * 1.5 : 0) +
          (fret - 1) * diagramStyle.fretInterval +
          diagramStyle.fretInterval -
          diagramStyle.dotIn +
          diagramStyle.fretWidth
        }
        fontSize={diagramStyle.fretNumberFontSize}
        className="font-sans stroke-0 fill-black"
      >
        {fret}
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
          (startAt > 1 ? diagramStyle.fretInterval * 1.5 : 0) +
          (fret - 1 - startAt) * diagramStyle.fretInterval +
          diagramStyle.fretInterval -
          diagramStyle.dotIn +
          diagramStyle.fretWidth
        }
        x={x}
        fontSize={diagramStyle.fretNumberFontSize}
        className="font-sans stroke-0 fill-grey-800 stroke-grey-800"
      >
        {fret}
      </text>
    ));
  };

  return { fretNumbers };
};
