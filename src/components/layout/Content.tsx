import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Pages } from '../routing/pages';
import { ScalePage } from '../../modules/scale';
import { SettingsContextProvider } from '../../hooks';

const Content = (): JSX.Element => {
  return (
    <div className="flex justify-center pt-24" id="content" style={{ width: '100vw' }}>
      <SettingsContextProvider>
        <Suspense fallback={'Loading..'}>
          <Routes>
            <Route path={Pages.SCALE} element={<ScalePage />} />
            <Route path={'*'} element={<Navigate to={Pages.SCALE} replace />} />
          </Routes>
        </Suspense>
      </SettingsContextProvider>
    </div>
  );
};

export default Content;
