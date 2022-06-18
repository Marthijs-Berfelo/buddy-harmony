import React from 'react';
import { GuitarScaleHook, useSettings } from '../../../hooks';
import {
  Diagram,
  DotText,
  FretNumberPosition,
  FretNumberType,
  Orientation,
} from '../../../common/fretboard';
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
    <div className="flex flex-col items-center" id="scale-content" ref={printRef}>
      <style type="text/css" media="print">
        {printStyle(orientation)}
      </style>
      {scale && selectedKey && (
        <div className="flex flex-row items-center">
          <Typography className="text-3xl pt-2">{`${selectedKey} ${scale}`}</Typography>
        </div>
      )}
      <div
        className={`flex flex-row ${
          orientation === Orientation.HORIZONTAL ? 'w-full' : 'h-full'
        } items-center`}
      >
        <Diagram
          className={'flex'}
          orientation={orientation}
          diagramCount={1}
          text={DotText.NOTE}
          leftHanded={leftHanded}
          scale={scaleModel}
          fretNumbers={FretNumberType.LATIN}
          fretNumbersPosition={FretNumberPosition.LEFT}
          tuning={tuningType.tuning}
        />
      </div>
    </div>
  );
};

export default ScaleContent;
