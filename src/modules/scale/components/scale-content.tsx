import type { JSX } from 'react';
import React from 'react';
import { useSettings } from 'hooks';
import { Diagram } from 'components/fretboard';
import { useGuitarScale } from '../hooks';
import { DotText, FretNumberPosition } from 'components/fretboard/options';

export const ScaleContent = (): JSX.Element => {
  const { scaleModel, printRef, printStyle, selectedKey, scale } = useGuitarScale();
  const { orientation } = useSettings();

  return (
    <div className="flex flex-col items-center" id="scale-content" ref={printRef}>
      <style type="text/css" media="print">
        {printStyle(orientation)}
      </style>
      {scale && selectedKey && (
        <div className="flex flex-row items-center">
          <p className="text-3xl pt-2">{`${selectedKey} ${scale}`}</p>
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
