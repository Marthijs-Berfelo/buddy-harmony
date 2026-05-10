import type { JSX } from 'react';
import { TranslationsProvider } from '../../translations';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Layout = (): JSX.Element => (
  <div id="app" className="flex-grow flex-col items-center justify-center">
    <TranslationsProvider>
      <Header />
      <Content />
      <Footer />
    </TranslationsProvider>
  </div>
);

export default Layout;
