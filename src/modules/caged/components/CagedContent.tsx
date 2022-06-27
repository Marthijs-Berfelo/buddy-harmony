import React from 'react';
import { CagedHook, useSettings } from '../../../hooks';
import { Typography } from '@material-tailwind/react';
import { Diagram, DotText, FretNumberPosition } from '../../../common/fretboard';

const CagedContent = ({
  selectedKey,
  cagedChords,
  printRef,
  printStyle,
}: CagedHook): JSX.Element => {
  const { orientation } = useSettings();

  return (
    <div className="flex flex-initial flex-col items-center" id="caged-content" ref={printRef}>
      {cagedChords && (
        <div>
          <style type="text/css" media="print">
            {printStyle(orientation)}
          </style>
          <div className="flex flex-row" id="caged-C">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <Typography className="text-4xl font-extrabold text-blue-700">C</Typography>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Typography className="text-2xl">{`Open`}</Typography>
              </div>
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.C.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Typography className="text-2xl">{`Positioned ${selectedKey}`}</Typography>
              </div>
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.C.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-blue-700 fill-blue-700'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-A">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <Typography className="text-4xl font-extrabold text-red-700">A</Typography>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-a'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.A.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-a'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.A.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-red-700 fill-red-700'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-G">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <Typography className="text-4xl font-extrabold text-green-700">G</Typography>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.G.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-g'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.G.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-green-700 fill-green-700'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-E">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <Typography className="text-4xl font-extrabold text-orange-800">E</Typography>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-c'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.E.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-e'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.E.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-orange-800 fill-orange-800'}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row" id="caged-D">
            <div className="flex flex-col justify-evenly" id="caged-step">
              <Typography className="text-4xl font-extrabold text-deep-purple-700">D</Typography>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-open-c">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'open-d'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.D.open.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                />
              </div>
            </div>
            <div className="flex flex-col items-center justify-start" id="caged-chord">
              <div className="flex flex-row items-center">
                <Diagram
                  key={'positioned-d'}
                  className=""
                  diagramCount={1}
                  text={DotText.NOTE}
                  chord={cagedChords.D.positioned.chord}
                  fretNumbersPosition={FretNumberPosition.LEFT}
                  cagedColor={'stroke-deep-purple-700 fill-deep-purple-700'}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CagedContent;
