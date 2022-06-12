import React from 'react';
import './App.css';
import * as gs from 'guitar-scales';
import Header from './components/layout/Header';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/layout/Content';

function App() {
  const guitar = gs.GuitarScale;
  const scale = guitar.get('a', 'major blues');
  const cMajor = ['2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4'];
  console.log('SCALE', scale);
  // printConsoleLog(scale);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Content />
        {/*<div style={{ marginBottom: 32 }}>*/}
        {/*  <Diagram*/}
        {/*    className={''}*/}
        {/*    frets={12}*/}
        {/*    orientation={Orientation.VERTICAL}*/}
        {/*    tuning={Tuning.guitar.standard}*/}
        {/*    shapes={cMajor}*/}
        {/*    fretNumbers={FretNumberType.LATIN}*/}
        {/*    text={DotText.NOTE}*/}
        {/*    fretNumbersPosition={FretNumberPosition.LEFT}*/}
        {/*    debug={true}*/}
        {/*    leftHanded={false}*/}
        {/*    diagramStyle={DEFAULT_STYLE}*/}
        {/*  />*/}
        {/*</div>*/}
      </BrowserRouter>
    </div>
  );
}

export default App;
