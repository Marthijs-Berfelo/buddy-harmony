import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Content, Footer } from './common/layout';
import './App.css';
import { TranslationsProvider } from './translations';

function App() {
  return (
    <div id="app" className="flex-col justify-center align-top">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <TranslationsProvider>
          <Header />
          <Content />
          <Footer />
        </TranslationsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
