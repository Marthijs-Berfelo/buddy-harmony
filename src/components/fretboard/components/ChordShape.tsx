import React, { Fragment } from 'react';
import { ChordPosition } from '../../../hooks';
import { ShapeProps, useShape } from '../utils/shape';
import { Orientation } from '../options';
import * as svg from '../utils/svg';
import './ChordShape.css';

const textColor = 'black';

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

  const cross = (string: number): JSX.Element => (
    <Fragment key={`${string}.X`}>
      <text
        x={x(diagramStyle.padding, string, 0, 0)}
        y={y(diagramStyle.padding, string, 0, 0)}
        alignmentBaseline={'central'}
        className={'font-sans stroke-1 chord-dot-text'}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
      >
        &#x2715;
      </text>
    </Fragment>
  );

  const open = (string: number, position: number): JSX.Element => (
    <Fragment key={`${position}.${string}.X`}>
      <text
        x={x(diagramStyle.padding, string, 0, 0)}
        y={y(diagramStyle.padding, string, 0, 0)}
        alignmentBaseline={'central'}
        className={'font-sans stroke-0 chord-dot-text'}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
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
          className={'font-sans stroke-1 chord-dot-text'}
          fontSize={diagramStyle.fontSize * 2}
          fill={textColor}
        >
          {finger}
        </text>
      </Fragment>
    );

  const barre = (
    barreFret: number,
    baseFret: number,
    strings: number[],
    chordPosition?: number
  ): JSX.Element => {
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
          y(diagramStyle.padding, barreStart, barreFret + baseFret, 0),
          barreLength,
          diagramStyle.dotRadius
        );
        break;
      case Orientation.HORIZONTAL:
      default:
        barreLine = svg.verticalLine(
          x(diagramStyle.padding, barreStart, barreFret + baseFret, 0),
          y(diagramStyle.padding, barreStart, barreFret, 0) - diagramStyle.stringInterval / 4,
          barreLength,
          diagramStyle.dotRadius
        );
    }

    return (
      <path
        fill={'none'}
        className={`stroke-[12px] ${chordPositionClass(chordPosition)}`}
        d={barreLine}
      />
    );
  };

  const dot = (string: number, fret: number, chordPosition: number): JSX.Element => (
    <Fragment key={`${chordPosition}.${string}.${fret}`}>
      <circle
        cx={x(diagramStyle.padding, string, fret, 0)}
        cy={y(diagramStyle.padding, string, fret, 0)}
        r={diagramStyle.dotRadius}
        className={`${className} ${chordPositionClass(chordPosition)}`}
        strokeWidth={diagramStyle.dotStroke}
        stroke={textColor}
        fill={textColor}
      />
    </Fragment>
  );

  const chordPositionClass = (chordPosition?: number): string => {
    switch (chordPosition) {
      case undefined:
        return '';
      case 1:
        return 'stroke-blue-500 fill-blue-500';
      case 2:
        return 'stroke-orange-500 fill-orange-500';
      case 3:
        return 'stroke-red-500 fill-red-500';
      case 4:
        return 'stroke-teal-500 fill-teal-500';
      case 5:
        return 'stroke-green-500 fill-green-500';
      case 6:
        return 'stroke-pink-500 fill-pink-500';
      case 7:
        return 'stroke-lime-500 fill-lime-500';
      case 8:
        return 'stroke-purple-500 fill-purple-500';
      case 0:
      default:
        return 'stroke-black fill-black';
    }
  };

  const renderChord = (
    chord: ChordPosition,
    chordPosition: number,
    includeFingers: boolean
  ): JSX.Element[] => {
    const baseFret = chord.baseFret - 1;
    const fingers = includeFingers
      ? chord.fingers.map((fingerNumber, string) => finger(string, fingerNumber, chordPosition))
      : [];
    const dots = chord.frets
      .map((fret) => (fret > 0 ? fret + baseFret : fret))
      .map((fret, string) => {
        if (fret < 0) {
          return cross(string);
        } else if (fret === 0) {
          return open(string, chordPosition);
        } else if (chord.barres?.includes(fret - baseFret)) {
          return blank(string, chordPosition);
        } else {
          return dot(string, fret, chordPosition);
        }
      });
    const barres =
      (chord.barres || [])
        // .map((fret) => (fret > -1 ? fret + baseFret : fret))
        .map((barreFret) => barre(barreFret, baseFret, chord.frets, chordPosition)) || [];

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
