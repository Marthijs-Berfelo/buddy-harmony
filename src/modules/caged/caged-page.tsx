import type { JSX } from 'react';
import { useRef } from 'react';
import { CagedProvider } from './hooks';
import CagedToolBar from './components/CagedToolBar';
import CagedContent from './components/CagedContent';

const CagedPage = (): JSX.Element => {
  const printRef = useRef<HTMLDivElement>(null);

  return (
    <div className="page" id="caged-page">
      <CagedProvider printRef={printRef}>
        <CagedToolBar />
        <CagedContent />
      </CagedProvider>
    </div>
  );
};

export default CagedPage;
