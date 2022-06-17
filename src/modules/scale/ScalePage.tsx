import React, { useRef } from 'react';
import { useGuitarScale } from '../../hooks';
import ScaleToolBar from './components/ScaleToolBar';
import ScaleContent from './components/ScaleContent';
import '../../common/Page.css';

const ScalePage = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const hook = useGuitarScale({ printRef });
  return (
    <div className="page" id="scale-page">
      <ScaleToolBar {...hook} />
      <ScaleContent {...hook} />
    </div>
  );
};

export default ScalePage;
