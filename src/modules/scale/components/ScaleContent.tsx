import React from 'react';
import { GuitarScaleHook, useSettings } from '../../../hooks';
import { Diagram, DotText, FretNumberPosition } from '../../../common/fretboard';
import { Typography } from '@material-tailwind/react';

const ScaleContent = ({
  scaleModel,
  printRef,
  printStyle,
  selectedKey,
  scale,
}: GuitarScaleHook): JSX.Element => {
  const { orientation } = useSettings();

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
      <div className="flex flex-row items-center">
        <Diagram
          className="flex"
          text={DotText.NOTE}
          scale={scaleModel}
          fretNumbersPosition={FretNumberPosition.LEFT}
        />
      </div>
    </div>
  );
};

export default ScaleContent;
