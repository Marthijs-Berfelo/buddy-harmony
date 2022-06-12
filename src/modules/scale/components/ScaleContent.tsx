import React, { useEffect } from 'react';
import { GuitarScaleHook } from '../../../hooks';

const ScaleContent = ({ note, scale, scaleModel }: GuitarScaleHook): JSX.Element => {
  useEffect(() => {
    console.log('N', note, 'S', scale, 'M', scaleModel());
  }, [note, scale]);

  return <></>;
};

export default ScaleContent;
