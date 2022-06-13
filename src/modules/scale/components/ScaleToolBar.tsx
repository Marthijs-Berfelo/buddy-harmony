import { GuitarScaleHook } from '../../../hooks';
import { Toolbar } from '../../../components';
import { Option, Select } from '@material-tailwind/react';
import React from 'react';

const ScaleToolBar = ({
  notes,
  note,
  setNote,
  scales,
  scale,
  setScale,
}: GuitarScaleHook): JSX.Element => {
  return (
    <Toolbar
      title={'Scale'}
      tools={[
        <Select
          key={'scale-note'}
          label="Note"
          className="flex items-center bg-white z-40"
          selected={(value) => {
            if (value?.key && value?.key !== note) {
              setNote(value?.key?.toString());
            }
            return value;
          }}
        >
          {notes.map((noteOption) => (
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
