import type { JSX } from 'react';
import { TranslationsProvider } from '@/translations';
import { Content, Footer, Header } from '.';
import { HelpDrawerProvider } from '@/help/hooks/help-drawer-provider';
import { HelpDrawer } from '@/help/components/help-drawer';

export const Layout = (): JSX.Element => (
  <div id="app" className="grow flex-col items-center justify-center">
    <TranslationsProvider>
      <HelpDrawerProvider>
        <Header />
        <Content />
        <Footer />
        <HelpDrawer />
      </HelpDrawerProvider>
    </TranslationsProvider>
  </div>
);
