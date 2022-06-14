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
        className={'chord-dot-mute'}
        fontSize={diagramStyle.fontSize * 1.5}
        fill={textColor}
      >
        &#x2715;
      </text>
    </Fragment>
  );

  const finger = (string: number, finger: number): JSX.Element => (
    <Fragment key={`${string}.X`}>
      <text
        x={x(diagramStyle.padding, string, 0, 0)}
        y={y(diagramStyle.padding, string, 0, 0)}
        alignmentBaseline={'central'}
        className={'chord-dot-mute'}
        fontSize={diagramStyle.fontSize * 2}
        fill={textColor}
      >
        {finger}
      </text>
    </Fragment>
  );

  const barre = (barreFret: number, strings: number[], chordPosition?: number): JSX.Element => {
    const barreStrings: number[] = [];
    strings.forEach((fret, string) => {
      if (fret === barreFret) {
        barreStrings.push(string);
      }
    });
    const barreStart = Math.min(...barreStrings);
    const barreEnd = Math.max(...barreStrings);
    const barreLength =
      diagramStyle.fretLength(barreEnd - barreStart) + diagramStyle.stringInterval / 2;
    let barreLine = '';
    switch (orientation) {
      case Orientation.VERTICAL:
        barreLine = svg.horizontalLine(
          x(diagramStyle.padding, barreStart, barreFret, 0) - diagramStyle.stringInterval / 4,
          y(diagramStyle.padding, barreStart, barreFret, 0),
          barreLength,
          diagramStyle.dotRadius
        );
        break;
      case Orientation.HORIZONTAL:
      default:
        barreLine = svg.verticalLine(
          x(diagramStyle.padding, barreStart, barreFret, 0),
          y(diagramStyle.padding, barreStart, barreFret, 0) - diagramStyle.stringInterval / 4,
          barreLength,
          diagramStyle.dotRadius
        );
    }

    return (
      <path
        fill={'none'}
        className={`chord-barre chord-dot${chordPositionClass(chordPosition)}`}
        d={barreLine}
      />
    );
  };

  const dot = (string: number, fret: number, chordPosition?: number): JSX.Element => (
    <Fragment key={`${string}.${fret}`}>
      <circle
        cx={x(diagramStyle.padding, string, fret, 0)}
        cy={y(diagramStyle.padding, string, fret, 0)}
        r={diagramStyle.dotRadius}
        className={`${className} chord-dot chord-dot${chordPositionClass(chordPosition)}`}
        strokeWidth={diagramStyle.dotStroke}
        stroke={textColor}
        fill={textColor}
      />
    </Fragment>
  );

  const chordPositionClass = (chordPosition?: number): string =>
    chordPosition !== undefined ? `-${chordPosition}` : '';

  const renderChord = (
    chord: ChordPosition,
    chordPosition: number,
    includeFingers: boolean
  ): JSX.Element[] => {
    const baseFret = chord.baseFret - 1;
    const fingers = includeFingers
      ? chord.fingers
          .filter((value) => value > 0)
          .map((fingerNumber, string) => finger(string, fingerNumber))
      : [];
    const dots = chord.frets
      .filter((fret) => !(chord.barres?.includes(fret) || false))
      .map((fret) => (fret > -1 ? fret + baseFret : fret))
      .map((fret, string) => {
        if (fret < 0) {
          return cross(string);
        } else {
          return dot(string, fret, chordPosition);
        }
      });
    const barres =
      (chord.barres || [])
        // .map((fret) => (fret > -1 ? fret + baseFret : fret))
        .map((barreFret) => barre(barreFret, chord.frets, chordPosition)) || [];

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
