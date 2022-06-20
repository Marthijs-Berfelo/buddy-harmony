import React, { Fragment } from 'react';
import { ChordPosition, useSettings } from '../../../hooks';
import { ShapeProps, useShape, svg } from '../utils';
import { Orientation } from '../options';
import { useDirectional } from '../utils/directional';

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

const useChordShape = ({ className, chords, chord }: ChordShapeProps): ChordShapeHook => {
  const { orientation, leftHanded, diagramStyle } = useSettings();
  const { onStrings } = useDirectional<number, unknown>({ orientation, leftHanded });

  const { x, y } = useShape();

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

  const barreText = (string: number, fingers: number[]): string | undefined =>
    fingers[string]?.toString();

  const barre = (
    barreFret: number,
    startAt: number,
    strings: number[],
    fingers: number[],
    chordPosition: number
  ): JSX.Element => {
    const barreStrings: number[] = [];
    strings.forEach((fret, string) => {
      if (fret === barreFret) {
        barreStrings.push(string);
      }
    });
    const finger = barreText(barreStrings[0], fingers);
    const barreStart = Math.min(...barreStrings);
    const barreEnd = Math.max(...barreStrings);
    const barreLength =
      diagramStyle.fretLength(barreEnd - barreStart + 1) + diagramStyle.stringInterval / 2;
    let barreLine: string;
    let fingerX: number;
    let fingerY: number;
    switch (orientation) {
      case Orientation.VERTICAL:
        fingerX = x(diagramStyle.padding, barreStart, barreFret, barreLength / 2);
        fingerY = y(
          diagramStyle.padding,
          barreStart,
          barreFret,
          (startAt > 1 ? diagramStyle.stringInterval / 2 : 0) + diagramStyle.dotRadius / 2
        );
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
        fingerX = x(
          diagramStyle.padding,
          barreStart,
          barreFret,
          (startAt > 1 ? diagramStyle.stringInterval / 2 : 0) - diagramStyle.dotIn
        );
        fingerY = y(
          diagramStyle.padding,
          strings.length - barreEnd - 1,
          barreFret,
          barreLength / 2
        );
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

    return (
      <Fragment>
        <path
          key={`${chordPosition}.barre`}
          fill={'none'}
          className="stroke-[12px] stroke-black fill-black"
          d={barreLine}
        />
        <circle
          key={`${chordPosition}.finger-bg`}
          cx={fingerX}
          cy={fingerY}
          r={diagramStyle.dotRadius / 2}
          className={`${className} stroke-white fill-white`}
        />
        <text
          key={`${chordPosition}.finger`}
          x={fingerX}
          y={fingerY}
          alignmentBaseline={'central'}
          className={`${className} text-xl font-sans stroke-1 stroke-black`}
        >
          {finger}
        </text>
      </Fragment>
    );
  };

  const dotText = (string: number, fingers: number[]): string | undefined =>
    fingers[string]?.toString();

  const dot = (
    string: number,
    fret: number,
    startAt: number,
    chordPosition: number,
    text?: string
  ): JSX.Element => (
    <Fragment key={`${chordPosition}.${string}.${fret}`}>
      <circle
        key={`${chordPosition}.${string}.${fret}.dot`}
        cx={x(diagramStyle.padding, string, fret, xOffset(startAt === 0))}
        cy={y(diagramStyle.padding, string, fret, yOffset(startAt === 0))}
        r={diagramStyle.dotRadius}
        className={`${className} stroke-black fill-black`}
      />
      <text
        key={`${chordPosition}.${string}.${fret}.finger`}
        x={x(diagramStyle.padding, string, fret, xOffset(startAt === 0))}
        y={y(diagramStyle.padding, string, fret, yOffset(startAt === 0))}
        alignmentBaseline={'central'}
        className={`${className} text-xl font-sans stroke-1 stroke-white`}
      >
        {text}
      </text>
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
    hideFingers?: boolean
  ): JSX.Element[] => {
    const baseFret = chord.baseFret - 1;
    const fingerNumbers = !hideFingers ? onStrings(chord.fingers) : [];
    const frets = onStrings(chord.frets);
    const dots = frets.map((fret, string) => {
      if (fret < 0) {
        return cross(string, chordPosition);
      } else if (fret === 0) {
        return open(string, chordPosition);
      } else if (chord.barres?.includes(fret)) {
        return blank(string, chordPosition);
      } else {
        return dot(string, fret, baseFret, chordPosition, dotText(string, fingerNumbers));
      }
    });
    const barres =
      (chord.barres || []).map((barreFret) =>
        barre(barreFret, baseFret, chord.frets, fingerNumbers, chordPosition)
      ) || [];

    return [...dots, ...barres];
  };

  const chordShapes = (chords || [chord]).flatMap((chordModel, chordPosition) => {
    if (!!chordModel) {
      return renderChord(chordModel, chordPosition);
    } else {
      return <></>;
    }
  });

  return {
    chordShapes,
  };
};
