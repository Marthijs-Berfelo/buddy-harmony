import type { JSX } from 'react';
import { KeySelector, ScaleSelector } from 'components/toolbar';
import { Toolbar } from 'layout/toolbar';
import React from 'react';
import { scaleGuitarTypes } from 'hooks';
import { Pages } from 'routing/pages';
import { useGuitarScale } from '../hooks';

const context = Pages.SCALE;

export const ScaleToolBar = (): JSX.Element => {
  const { keys, selectedKey, setSelectedKey, scales, scale, setScale, printRef, printDisabled } =
    useGuitarScale();
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
