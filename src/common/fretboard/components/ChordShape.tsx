import React, { Fragment } from 'react';
import { ChordPosition } from '../../../hooks';
import { ShapeProps, useShape, svg } from '../utils';
import { Orientation } from '../options';

interface ChordShapeProps extends ShapeProps {
  chords?: ChordPosition[];
  chord?: ChordPosition;
}

const ChordShape = (props: ChordShapeProps): JSX.Element => {
  const { chordShapes } = useChordShape(props);

  return <g>{chordShapes}</g>;
};

export default ChordShape;

type ChordShapeHook = {
  chordShapes: JSX.Element[];
};

const useChordShape = ({
  className,
  diagramStyle,
  orientation,
  leftHanded,
  strings,
  chords,
  chord,
}: ChordShapeProps): ChordShapeHook => {
  const { x, y } = useShape({ className, strings, leftHanded, orientation, diagramStyle });

  const cross = (string: number, position: number): JSX.Element => (
    <Fragment key={`${position}.${string}.X`}>
      <text
        x={x(diagramStyle.padding, string, 0, 0)}
        y={y(diagramStyle.padding, string, 0, 0)}
        alignmentBaseline={'central'}
        className={'font-sans stroke-1 text-4xl fill-black chord-dot-text'}
      >
        &#x2715;
      </text>
    </Fragment>
  );

  const open = (string: number, position: number): JSX.Element => (
    <Fragment key={`${position}.${string}.O`}>
      <text
        x={x(diagramStyle.padding, string, 0, 0)}
        y={y(diagramStyle.padding, string, 0, 0)}
        alignmentBaseline={'central'}
        className={'font-sans stroke-1 text-4xl fill-black chord-dot-text'}
      >
        O
      </text>
    </Fragment>
  );

  const blank = (string: number, position: number): JSX.Element => (
    <Fragment key={`${position}.${string}.none`} />
  );

  const finger = (string: number, finger: number, position: number): JSX.Element =>
    finger < 1 ? (
      blank(string, position)
    ) : (
      <Fragment key={`${position}.${string}.F`}>
        <text
          x={x(diagramStyle.padding, string, 0, 0)}
          y={y(diagramStyle.padding, string, 0, 0)}
          alignmentBaseline={'central'}
          className={'font-sans stroke-1 text-4xl fill-black chord-dot-text'}
        >
          {finger}
        </text>
      </Fragment>
    );

  const barre = (barreFret: number, startAt: number, strings: number[]): JSX.Element => {
    const barreStrings: number[] = [];
    strings.forEach((fret, string) => {
      if (fret === barreFret) {
        barreStrings.push(string);
      }
    });
    const barreStart = Math.min(...barreStrings);
    const barreEnd = Math.max(...barreStrings);
    const barreLength =
      diagramStyle.fretLength(barreEnd - barreStart + 1) + diagramStyle.stringInterval / 2;
    let barreLine: string;
    switch (orientation) {
      case Orientation.VERTICAL:
        barreLine = svg.horizontalLine(
          x(diagramStyle.padding, barreStart, barreFret, 0) - diagramStyle.stringInterval / 4,
          y(
            diagramStyle.padding,
            barreStart,
            barreFret,
            startAt > 1 ? diagramStyle.stringInterval / 2 : 0
          ),
          barreLength,
          diagramStyle.dotRadius
        );
        break;
      case Orientation.HORIZONTAL:
      default:
        barreLine = svg.verticalLine(
          x(
            diagramStyle.padding,
            barreStart,
            barreFret,
            startAt > 1 ? diagramStyle.stringInterval / 2 : 0
          ),
          y(diagramStyle.padding, strings.length - barreEnd - 1, barreFret, 0) -
            diagramStyle.stringInterval / 4,
          barreLength,
          diagramStyle.dotRadius
        );
    }

    return <path fill={'none'} className="stroke-[12px] stroke-black fill-black" d={barreLine} />;
  };

  const dot = (
    string: number,
    fret: number,
    startAt: number,
    chordPosition: number
  ): JSX.Element => (
    <Fragment key={`${chordPosition}.${string}.${fret}`}>
      <circle
        cx={x(diagramStyle.padding, string, fret, xOffset(startAt === 0))}
        cy={y(diagramStyle.padding, string, fret, yOffset(startAt === 0))}
        r={diagramStyle.dotRadius}
        className={`${className} stroke-black fill-black`}
      />
    </Fragment>
  );

  const xOffset = (withNut: boolean): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return 0;
      case Orientation.HORIZONTAL:
      default:
        return withNut ? 0 : diagramStyle.stringInterval * 0.75;
    }
  };
  const yOffset = (withNut: boolean): number => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return withNut ? 0 : diagramStyle.stringInterval * 0.75;
      case Orientation.HORIZONTAL:
      default:
        return 0;
    }
  };

  const renderChord = (
    chord: ChordPosition,
    chordPosition: number,
    includeFingers: boolean
  ): JSX.Element[] => {
    const baseFret = chord.baseFret - 1;
    const fingerNumbersOriginal = [...chord.fingers];
    const fingerNumbers =
      orientation === Orientation.HORIZONTAL || leftHanded
        ? [...fingerNumbersOriginal.reverse()]
        : [...chord.fingers];
    const fingers = includeFingers
      ? fingerNumbers.map((fingerNumber, string) => finger(string, fingerNumber, chordPosition))
      : [];
    const originalFrets = [...chord.frets];
    const frets =
      orientation === Orientation.HORIZONTAL || leftHanded
        ? [...originalFrets.reverse()]
        : [...chord.frets];
    const dots = frets.map((fret, string) => {
      if (fret < 0) {
        return cross(string, chordPosition);
      } else if (fret === 0) {
        return open(string, chordPosition);
      } else if (chord.barres?.includes(fret)) {
        return blank(string, chordPosition);
      } else {
        return dot(string, fret, baseFret, chordPosition);
      }
    });
    const barres =
      (chord.barres || []).map((barreFret) => barre(barreFret, baseFret, chord.frets)) || [];

    return [...fingers, ...dots, ...barres];
  };

  const chordShapes = (chords || [chord]).flatMap((chordModel, chordPosition) => {
    if (!!chordModel) {
      return renderChord(chordModel, chordPosition, chords === undefined);
    } else {
      return <></>;
    }
  });

  return {
    chordShapes,
  };
};
