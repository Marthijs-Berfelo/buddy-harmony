import { useSettings, ChordPosition } from '../../../hooks';
import { Diagram, DotText, FretNumberPosition } from '../../../common/fretboard';
import React from 'react';
import { Typography } from '@material-tailwind/react';
import { GuitarChordHook } from '../hooks';

const ChordContent = ({ chord, printRef, printStyle }: GuitarChordHook): JSX.Element => {
  const { orientation } = useSettings();

  return (
    <div className="flex flex-col items-center" id="chord-content" ref={printRef}>
      <style type="text/css" media="print">
        {printStyle(orientation)}
      </style>
      {chord && (
        <div className="flex flex-row items-center">
          <Typography className="text-3xl pt-2">{`${chord.key} ${chord.suffix}`}</Typography>
        </div>
      )}
      <div className="flex flex-row items-center">
        {chord &&
          chord.positions &&
          chord.positions.map((position, chordPosition) => (
            <ChordDiagram
              key={`chord-${chordPosition}`}
              chord={position}
              chordPosition={chordPosition}
              diagramCount={chord?.positions?.length}
            />
          ))}
      </div>
    </div>
  );
};

export default ChordContent;

type ChordDiagramProps = {
  chord?: ChordPosition;
  chordPosition?: number;
  diagramCount?: number;
};

const ChordDiagram = ({ chord, chordPosition, diagramCount }: ChordDiagramProps): JSX.Element => {
  return (
    <Diagram
      key={`chord-diagram.${chordPosition || 0}`}
      className=""
      diagramCount={diagramCount}
      text={DotText.NOTE}
      chord={chord}
      fretNumbersPosition={FretNumberPosition.LEFT}
    />
  );
};
