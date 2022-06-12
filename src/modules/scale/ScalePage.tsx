import React from 'react';
import { useGuitarScale } from '../../hooks';
import ScaleToolBar from './components/ScaleToolBar';
import ScaleContent from './components/ScaleContent';

const ScalePage = () => {
  const hook = useGuitarScale();
  return (
    <>
      <ScaleToolBar {...hook} />
      <ScaleContent {...hook} />
    </>
  );
};

export default ScalePage;
