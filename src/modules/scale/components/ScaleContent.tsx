import React, { useEffect, useState } from 'react';
import { GuitarScaleHook, useSettings } from '../../../hooks';
import {
  DEFAULT_STYLE,
  Diagram,
  DotText,
  FretNumberPosition,
  FretNumberType,
  ScaleModel,
} from '../../../components/fretboard';

const ScaleContent = ({ note, scale, scaleModel }: GuitarScaleHook): JSX.Element => {
  const [shape, setShape] = useState<ScaleModel>();
  const { tuningType, orientation, leftHanded } = useSettings();

  useEffect(() => {
    console.log('TUNING:', tuningType);
  }, [tuningType]);

  useEffect(() => {
    console.log('N', note, 'S', scale, 'M', scaleModel());
    setShape(scaleModel());
  }, [note, scale]);

  return (
    <div className="flex justify-center" id="scale-content">
      <Diagram
        className={'max-w-screen-2xl max-h-screen'}
        diagramStyle={DEFAULT_STYLE}
        orientation={orientation}
        text={DotText.NOTE}
        leftHanded={leftHanded}
        scale={shape}
        frets={12}
        fretNumbers={FretNumberType.LATIN}
        fretNumbersPosition={FretNumberPosition.LEFT}
        tuning={tuningType.tuning}
        debug={false}
      />
    </div>
  );
};

export default ScaleContent;
