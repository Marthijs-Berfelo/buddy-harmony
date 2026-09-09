import type { JSX } from 'react';
import { KeySelector, ScaleSelector } from 'components/toolbar';
import Toolbar from 'layout/toolbar/Toolbar';
import React from 'react';
import { scaleGuitarTypes } from 'hooks';
import { Pages } from 'routing/pages.ts';
import { useGuitarScaleContext } from '../hooks';

const context = Pages.SCALE;

const ScaleToolBar = (): JSX.Element => {
  const { keys, selectedKey, setSelectedKey, scales, scale, setScale, printRef, printDisabled } =
    useGuitarScaleContext();
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
