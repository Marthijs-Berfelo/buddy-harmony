import type { JSX } from 'react';
import { TranslationsProvider } from '@/translations';
import { Content, Footer, Header } from '.';

const Layout = (): JSX.Element => (
  <div id="app" className="grow flex-col items-center justify-center">
    <TranslationsProvider>
      <Header />
      <Content />
      <Footer />
    </TranslationsProvider>
  </div>
);

export default Layout;
