import { useSettings, GuitarChordHook, ChordPosition, StringTuningType } from '../../../hooks';
import {
  Diagram,
  DotText,
  FretNumberPosition,
  FretNumberType,
  Orientation,
} from '../../../common/fretboard';
import React from 'react';

const ChordContent = ({ chordModel }: GuitarChordHook): JSX.Element => {
  const { tuningType, orientation, leftHanded } = useSettings();

  return (
    <div className="flex justify-center" id="chord-content">
      {chordModel && chordModel.positions ? (
        chordModel.positions.map((chord, chordPosition) => (
          <ChordDiagram
            key={`chord-${chordPosition}`}
            orientation={orientation}
            leftHanded={leftHanded}
            tuningType={tuningType}
            chord={chord}
            chordPosition={chordPosition}
          />
        ))
      ) : (
        <ChordDiagram orientation={orientation} leftHanded={leftHanded} tuningType={tuningType} />
      )}
    </div>
  );
};

export default ChordContent;

type ChordDiagramProps = {
  chord?: ChordPosition;
  orientation: Orientation;
  leftHanded: boolean;
  tuningType: StringTuningType;
  chordPosition?: number;
};

const ChordDiagram = ({
  chord,
  orientation,
  leftHanded,
  tuningType,
  chordPosition,
}: ChordDiagramProps): JSX.Element => {
  return (
    <Diagram
      key={`chord-diagram.${chordPosition || 0}`}
      className={'max-w-screen-2xl max-h-screen'}
      orientation={orientation}
      text={DotText.NOTE}
      leftHanded={leftHanded}
      chord={chord}
      fretNumbers={FretNumberType.LATIN}
      fretNumbersPosition={FretNumberPosition.LEFT}
      tuning={tuningType.tuning}
    />
  );
};
