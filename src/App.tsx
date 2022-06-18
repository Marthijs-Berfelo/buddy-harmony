import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Content } from './common/layout';
import './App.css';
import { TranslationsProvider } from './translations';

function App() {
  return (
    <div id="app" className="flex-col justify-center align-top">
      <BrowserRouter>
        <TranslationsProvider>
          <Header />
          <Content />
        </TranslationsProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
