import React from 'react';
import { useSettings } from '../../../hooks';
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
} from '@material-tailwind/react';
import { GuitarType } from '../../../hooks/constants';

export interface SettingsToolsProps {
  supportedGuitars?: GuitarType[];
}

const SettingsTools = ({ supportedGuitars }: SettingsToolsProps): JSX.Element => {
  const {
    guitarTypes,
    guitarType,
    onlySupportedGuitars,
    setGuitarType,
    tuningTypes,
    tuningType,
    orientation,
    toggleOrientation,
    orientationLabel,
    leftHanded,
    setLeftHanded,
  } = useSettings();

  return (
    <ul className="flex justify-center gap-6">
      <Menu key={'tool-guitar'}>
        <MenuHandler>
          <Button variant="gradient">{`Type: ${guitarType.name}`}</Button>
        </MenuHandler>
        <MenuList className="flex flex-col flex-grow">
          {Array.from(guitarTypes)
            .filter(onlySupportedGuitars(supportedGuitars))
            .map((type) => (
              <MenuItem
                key={type.name}
                disabled={type.name === guitarType.name}
                className={
                  'justify-items-stretch' +
                  `${type.name === guitarType.name ? ' font-extrabold bg-blue-800 text-white' : ''}`
                }
                onClick={() => setGuitarType(type)}
              >
                {type.name}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
      <li key={'tool-tuning'}>
        <Select
          label="Tuning"
          className="flex items-center bg-white z-40"
          value={tuningType.name}
          disabled
        >
          {tuningTypes.map((tuning) => (
            <Option key={tuning.name} value={tuning.name}>
              {tuning.name}
            </Option>
          ))}
        </Select>
      </li>
      <li key={'tool-orientation'}>
        <Menu>
          <MenuHandler>
            <Button variant="gradient">{`${orientation.toString()} / ${
              leftHanded ? 'LH' : 'RH'
            }`}</Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => toggleOrientation()}>{orientationLabel}</MenuItem>
            <MenuItem onClick={() => setLeftHanded((value) => !value)}>
              {leftHanded ? 'Right handed' : 'Left handed'}
            </MenuItem>
          </MenuList>
        </Menu>
      </li>
    </ul>
  );
};

export default SettingsTools;
