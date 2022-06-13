import React from 'react';
import './App.css';
import Header from './components/layout/Header';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/layout/Content';

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
