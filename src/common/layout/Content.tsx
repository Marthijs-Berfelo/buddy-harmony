import type { JSX } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsContextProvider } from '@/hooks';

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
