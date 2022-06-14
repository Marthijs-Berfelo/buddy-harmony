import { useSettings, GuitarChordHook } from '../../../hooks';
import {
  DEFAULT_STYLE,
  Diagram,
  DotText,
  FretNumberPosition,
  FretNumberType,
} from '../../../components/fretboard';
import React, { useEffect } from 'react';

const ChordContent = ({ chordModel }: GuitarChordHook): JSX.Element => {
  const { tuningType, orientation, leftHanded } = useSettings();

  useEffect(() => {
    console.log('CHORD', chordModel);
  }, [chordModel]);

  return (
    <div className="flex justify-center" id="chord-content">
      <Diagram
        className={'max-w-screen-2xl max-h-screen'}
        diagramStyle={DEFAULT_STYLE}
        orientation={orientation}
        text={DotText.NOTE}
        leftHanded={leftHanded}
        frets={12}
        chords={chordModel?.positions}
        fretNumbers={FretNumberType.LATIN}
        fretNumbersPosition={FretNumberPosition.LEFT}
        tuning={tuningType.tuning}
        debug={false}
      />
    </div>
  );
};

export default ChordContent;
