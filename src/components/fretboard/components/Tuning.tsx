import { Orientation } from '../options';
import { DiagramStyle } from '../utils/diagram-style';
import React from 'react';

type TuningProps = {
  tuning: string[];
  orientation: Orientation;
  leftHanded: boolean;
  diagramStyle: DiagramStyle;
};

const Tuning = (props: TuningProps): JSX.Element => {
  const { tunings } = useTuning(props);

  return <g className={'fretboard-tunings'}>{tunings()}</g>;
};

export default Tuning;

type TuningHook = {
  tunings: () => JSX.Element[];
};

const useTuning = ({ tuning, orientation, leftHanded, diagramStyle }: TuningProps): TuningHook => {
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
    const y = diagramStyle.paddingTop - diagramStyle.tuningDistance;
    let tunings = tuning;
    if (leftHanded) {
      tunings = [...tuning.reverse()];
    }
    return tunings.map((string, index) => (
      <text
        key={'tuning-' + index}
        y={y}
        x={
          diagramStyle.paddingLeft +
          diagramStyle.stringWidth +
          index * diagramStyle.stringInterval -
          diagramStyle.tuningFontSize / 2
        }
        fontSize={diagramStyle.tuningFontSize}
        stroke={diagramStyle.tuningColor}
        className={'fretboard-tuning'}
      >
        {string}
      </text>
    ));
  };

  const verticalTunings = (): JSX.Element[] => {
    const x = diagramStyle.paddingLeft - diagramStyle.tuningDistance;
    const tunings = [...tuning];
    const reverse = [...tunings.reverse()];
    return reverse.map((string, index) => (
      <text
        key={'tuning-' + index}
        y={
          diagramStyle.paddingTop +
          diagramStyle.stringWidth +
          index * diagramStyle.stringInterval +
          diagramStyle.tuningFontSize / 4
        }
        x={x}
        fontSize={diagramStyle.tuningFontSize}
        stroke={diagramStyle.tuningColor}
        className={'fretboard-tuning'}
      >
        {string}
      </text>
    ));
  };

  return { tunings };
};
