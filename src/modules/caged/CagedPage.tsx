import React, { useRef } from 'react';
import { useCaged } from './hooks';
import '../../common/Page.css';
import CagedToolBar from './components/CagedToolBar';
import CagedContent from './components/CagedContent';

const CagedPage = (): JSX.Element => {
  const printRef = useRef<HTMLDivElement>(null);
  const hook = useCaged({ printRef });

  return (
    <div className="page" id="caged-page">
      <CagedToolBar {...hook} />
      <CagedContent {...hook} />
    </div>
  );
};

export default CagedPage;
