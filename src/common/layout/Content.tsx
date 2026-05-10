import type { JSX } from 'react';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsContextProvider } from '../../hooks';

export const ChordPage = lazy(() => import('../../modules/chord'));
export const CagedPage = lazy(() => import('../../modules/caged'));

const Content = (): JSX.Element => {
  return (
    <div className="pt-24" id="content">
      <SettingsContextProvider>
        <Suspense fallback={'Loading..'}>
          <Outlet />
        </Suspense>
      </SettingsContextProvider>
    </div>
  );
};

export default Content;
