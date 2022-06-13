import React from 'react';
import { useGuitarScale } from '../../hooks';
import ScaleToolBar from './components/ScaleToolBar';
import ScaleContent from './components/ScaleContent';
import '../../components/Page.css';

const ScalePage = () => {
  const hook = useGuitarScale();
  return (
    <div className="page" id="scale-page">
      <ScaleToolBar {...hook} />
      <ScaleContent {...hook} />
    </div>
  );
};

export default ScalePage;
