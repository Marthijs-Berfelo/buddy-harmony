import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as gs from 'guitar-scales';
import guitar from 'react-fretboard-diagram';
import { Tuning } from 'fretboard-api';
const { Diagram } = guitar;

function App() {
  const guitar = gs.GuitarScale;
  const scale = guitar.get('a', 'major blues');
  const cMajor = ['2 4, 1 2 4, 1 3 4, 1 3 4, 2 4, 1 2 4'];
  console.log('SCALES', guitar.getNames());
  console.log('SCALE', scale);
  // printConsoleLog(scale);
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div style={{ height: '0.5vh', marginBottom: 32 }}>
        <Diagram
          mouseMoveHandler={undefined}
          className={''}
          mouseClickHandler={undefined}
          frets={12}
          orientation={'vertical'}
          tuning={Tuning.guitar.standard}
          shapes={cMajor}
          fretNumbers={'roman'}
          text={'note'}
          fretNumbersPosition={'left'}
          debug={true}
          diagramStyle={{
            paddingLeft: 200,
            paddingRight: 50,
            paddingTop: 100,
            paddingBottom: 100,
            stringInterval: 200,
            stringWidth: 20,
            fretInterval: 300,
            fretWidth: 30,
            dotIn: 150,
            dotOut: 100,
            dotRadius: 60,
            dotStroke: 10,
            fontSize: 50,
          }}
        />
      </div>
    </div>
  );
}

export default App;
