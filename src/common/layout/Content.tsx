import type { JSX } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsContextProvider } from '@/hooks';
import FretboardDotsLoader from '@/components/ui/fretboard-dots-loader';

const Content = (): JSX.Element => {
  return (
    <div className="pt-24" id="content">
      <SettingsContextProvider>
        <Suspense fallback={<FretboardDotsLoader />}>
          <Outlet />
        </Suspense>
      </SettingsContextProvider>
    </div>
  );
};

export default Content;
