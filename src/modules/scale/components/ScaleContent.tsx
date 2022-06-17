import React from 'react';
import { GuitarScaleHook, useSettings } from '../../../hooks';
import { Diagram, DotText, FretNumberPosition, FretNumberType } from '../../../common/fretboard';
import { Typography } from '@material-tailwind/react';

const ScaleContent = ({
  scaleModel,
  printRef,
  printStyle,
  selectedKey,
  scale,
}: GuitarScaleHook): JSX.Element => {
  const { tuningType, orientation, leftHanded } = useSettings();

  return (
    <div className="flex justify-center" id="scale-content" ref={printRef}>
      <style type="text/css" media="print">
        {printStyle(orientation)}
      </style>
      {scale && selectedKey && (
        <Typography className="text-xl overflow-hidden h-0">{`${selectedKey} ${scale}`}</Typography>
      )}
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
