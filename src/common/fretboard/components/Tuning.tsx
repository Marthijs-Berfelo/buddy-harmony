import { Orientation } from '../options';
import React from 'react';
import { useSettings } from '../../../hooks';

const Tuning = (): JSX.Element => {
  const { tunings } = useTuning();

  return <g className={'fretboard-tunings'}>{tunings()}</g>;
};

export default Tuning;

type TuningHook = {
  tunings: () => JSX.Element[];
};

const useTuning = (): TuningHook => {
  const { tuningType, orientation, leftHanded, diagramStyle } = useSettings();

  const tunings = (): JSX.Element[] => {
    switch (orientation) {
      case Orientation.VERTICAL:
        return horizontalTunings();
      case Orientation.HORIZONTAL:
      default:
        return verticalTunings();
    }
  };

  const horizontalTunings = (): JSX.Element[] => {
    const y = diagramStyle.padding - diagramStyle.tuningDistance;
    let tunings = [...tuningType.tuning];
    if (leftHanded) {
      tunings = [...tunings.reverse()];
    }
    return tunings.map((string, index) => (
      <text
        key={'tuning-' + index}
        y={y}
        x={diagramStyle.padding + diagramStyle.stringWidth + index * diagramStyle.stringInterval}
        fontSize={diagramStyle.tuningFontSize}
        className="font-sans stroke-0 fill-black"
      >
        {string}
      </text>
    ));
  };

  const verticalTunings = (): JSX.Element[] => {
    const x = diagramStyle.padding - diagramStyle.tuningDistance;
    const tunings = [...tuningType.tuning];
    const reverse = [...tunings.reverse()];
    return reverse.map((string, index) => (
      <text
        key={'tuning-' + index}
        y={
          diagramStyle.padding +
          diagramStyle.stringWidth +
          index * diagramStyle.stringInterval +
          diagramStyle.tuningFontSize / 4
        }
        x={x}
        fontSize={diagramStyle.tuningFontSize}
        className="font-sans stroke-0 fill-black"
      >
        {string}
      </text>
    ));
  };

  return { tunings };
};
