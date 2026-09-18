import type { JSX } from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsProvider } from 'hooks';
import { FretboardDotsLoader } from '@/components/ui/fretboard-dots-loader';

export const Content = (): JSX.Element => {
  return (
    <main className="pt-24" id="content">
      <SettingsProvider>
        <Suspense fallback={<FretboardDotsLoader />}>
          <Outlet />
        </Suspense>
      </SettingsProvider>
    </main>
  );
};
