import type { JSX } from 'react';
import { CagedProvider } from './hooks';
import { CagedToolBar } from './components/caged-tool-bar';
import { CagedContent } from './components/caged-content';

export const CagedPage = (): JSX.Element => {
  return (
    <div className="page" id="caged-page">
      <CagedProvider>
        <CagedToolBar />
        <CagedContent />
      </CagedProvider>
    </div>
  );
};
