import React, { useEffect, useState } from 'react';
import { GuitarScaleHook } from '../../../hooks';
import {
  DEFAULT_STYLE,
  Diagram,
  DotText,
  FretNumberPosition,
  FretNumberType,
  Orientation,
  ScaleModel,
} from '../../../components/fretboard';
import { Tuning } from 'fretboard-api';

const ScaleContent = ({ note, scale, scaleModel }: GuitarScaleHook): JSX.Element => {
  const [shape, setShape] = useState<ScaleModel>();
  useEffect(() => {
    console.log('N', note, 'S', scale, 'M', scaleModel());
    setShape(scaleModel());
  }, [note, scale]);

  return (
    <div className="flex justify-center" id="scale-content">
      <Diagram
        className={'max-w-screen-2xl max-h-screen'}
        diagramStyle={DEFAULT_STYLE}
        orientation={Orientation.VERTICAL}
        text={DotText.NOTE}
        leftHanded={false}
        scale={shape}
        frets={12}
        fretNumbers={FretNumberType.LATIN}
        fretNumbersPosition={FretNumberPosition.LEFT}
        tuning={Tuning.guitar.standard}
        debug={false}
      />
    </div>
  );
};

export default ScaleContent;
