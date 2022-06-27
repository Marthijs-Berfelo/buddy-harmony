import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Pages } from '../routing/pages';
import ScalePage from '../../modules/scale';
import { SettingsContextProvider } from '../../hooks';
const ChordPage = lazy(() => import('../../modules/chord'));
const CagedPage = lazy(() => import('../../modules/caged'));

const Content = (): JSX.Element => {
  return (
    <div className="pt-24" id="content">
      <SettingsContextProvider>
        <Suspense fallback={'Loading..'}>
          <Routes>
            <Route path={Pages.SCALE} element={<ScalePage />} />
            <Route path={Pages.CHORD} element={<ChordPage />} />
            <Route path={Pages.CAGED} element={<CagedPage />} />
            <Route path={'*'} element={<Navigate to={Pages.SCALE} replace />} />
          </Routes>
        </Suspense>
      </SettingsContextProvider>
    </div>
  );
};

export default Content;
