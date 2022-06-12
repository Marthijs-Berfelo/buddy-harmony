import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Pages } from '../routing/pages';
import { ScalePage } from '../../modules/scale';

const Content = (): JSX.Element => {
  return (
    <div className="container pt-24 flex justify-center max-w-full">
      <Suspense fallback={'Loading..'}>
        <Routes>
          <Route path={Pages.SCALE} element={<ScalePage />} />
          <Route path={'*'} element={<Navigate to={Pages.SCALE} replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default Content;
