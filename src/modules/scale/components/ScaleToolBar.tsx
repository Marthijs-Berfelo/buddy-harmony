import { GuitarScaleHook } from '../../../hooks';
import { KeySelector, ScaleSelector, Toolbar } from '../../../common';
import React from 'react';
import { scaleGuitarTypes } from '../../../hooks';
import { Pages } from '../../../common/routing/pages';

const context = Pages.SCALE;

const ScaleToolBar = ({
  keys,
  selectedKey,
  setSelectedKey,
  scales,
  scale,
  setScale,
  printRef,
  printDisabled,
}: GuitarScaleHook): JSX.Element => {
  return (
    <Toolbar
      page={context}
      supportedGuitars={scaleGuitarTypes}
      printRef={printRef}
      printDisabled={printDisabled}
      tools={[
        <KeySelector key={'scale-key'} {...{ keys, selectedKey, setSelectedKey }} />,
        <ScaleSelector key={'scale-scale'} {...{ selectedKey, scales, scale, setScale }} />,
      ]}
    />
  );
};

export default ScaleToolBar;
