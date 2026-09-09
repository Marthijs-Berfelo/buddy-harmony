import { useRef } from 'react';
import { GuitarScaleProvider } from './hooks';
import ScaleToolBar from './components/ScaleToolBar';
import ScaleContent from './components/ScaleContent';

const ScalePage = () => {
  const printRef = useRef<HTMLDivElement>(null);
  return (
    <div className="page" id="scale-page">
      <GuitarScaleProvider printRef={printRef}>
        <ScaleToolBar />
        <ScaleContent />
      </GuitarScaleProvider>
    </div>
  );
};

export default ScalePage;
