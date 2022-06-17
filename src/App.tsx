import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Content } from './common/layout';
import './App.css';

function App() {
  return (
    <div id="app" className="flex-col justify-center align-top">
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    </div>
  );
}

export default App;
