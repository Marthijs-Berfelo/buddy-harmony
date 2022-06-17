import React from 'react';
import { GuitarScaleHook, useSettings } from '../../../hooks';
import { Diagram, DotText, FretNumberPosition, FretNumberType } from '../../../common/fretboard';

const ScaleContent = ({ scaleModel }: GuitarScaleHook): JSX.Element => {
  const { tuningType, orientation, leftHanded } = useSettings();

  return (
    <div className="flex justify-center" id="scale-content">
      <Diagram
        className={'max-w-screen-2xl max-h-screen'}
        orientation={orientation}
        text={DotText.NOTE}
        leftHanded={leftHanded}
        scale={scaleModel}
        fretNumbers={FretNumberType.LATIN}
        fretNumbersPosition={FretNumberPosition.LEFT}
        tuning={tuningType.tuning}
      />
    </div>
  );
};

export default ScaleContent;
