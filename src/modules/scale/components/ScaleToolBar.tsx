import { GuitarScaleHook } from '../../../hooks';
import { Toolbar } from '../../../common';
import { Option, Select } from '@material-tailwind/react';
import React from 'react';
import { scaleGuitarTypes } from '../../../hooks';

const ScaleToolBar = ({
  keys,
  selectedKey,
  setSelectedKey,
  scales,
  scale,
  setScale,
  printRef,
}: GuitarScaleHook): JSX.Element => {
  return (
    <Toolbar
      title={'Scale'}
      supportedGuitars={scaleGuitarTypes}
      printRef={printRef}
      tools={[
        <Select
          key={'scale-note'}
          label="Key"
          className="flex items-center bg-white z-40"
          selected={(value) => {
            if (value?.key && value?.key !== selectedKey) {
              setSelectedKey(value?.key?.toString());
            }
            return value;
          }}
        >
          {keys.map((noteOption) => (
            <Option key={noteOption}>{noteOption}</Option>
          ))}
        </Select>,
        <Select
          key={'scale-scale'}
          label="Scale"
          className="flex items-center bg-white"
          selected={(value) => {
            if (value?.key && value?.key !== scale) {
              setScale(value?.key?.toString());
            }
            return value;
          }}
        >
          {scales.map((scaleOption) => (
            <Option key={scaleOption}>{scaleOption}</Option>
          ))}
        </Select>,
      ]}
    />
  );
};

export default ScaleToolBar;
