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
import { GuitarType } from '../../../hooks';
import { useTranslation } from 'react-i18next';
import { FretNumberType } from '../../fretboard';

export interface SettingsToolsProps {
  supportedGuitars?: GuitarType[];
}

const SettingsTools = ({ supportedGuitars }: SettingsToolsProps): JSX.Element => {
  const { t } = useTranslation('settings');
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
    fretNumbers,
    onSelectFretNumber,
  } = useSettings();

  return (
    <ul className="flex justify-center gap-4 mx-12">
      <Menu key={'tool-guitar'}>
        <MenuHandler>
          <Button variant="gradient" className="capitalize">
            {t('settings:guitar.label', { type: guitarType.name }).toLowerCase()}
          </Button>
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
                {t('settings:guitar.type', { context: type.name })}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
      <li key={'tool-tuning'}>
        <Select
          label={t('settings:tuning')}
          className="flex items-center bg-white z-40"
          value={t('settings:tuning', { context: tuningType.name })}
          disabled
        >
          {tuningTypes.map((tuning) => (
            <Option key={tuning.name} value={tuning.name}>
              {t('settings:tuning', { context: tuning.name })}
            </Option>
          ))}
        </Select>
      </li>
      <li key={'tool-orientation'}>
        <Menu>
          <MenuHandler>
            <Button variant="gradient">
              {t('settings:layout.label', {
                orientation,
                handed: leftHanded ? 'left' : 'right',
                fretNumbers,
              })}
            </Button>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => toggleOrientation()}>
              {t('settings:layout.orientation', { context: orientationLabel })}
            </MenuItem>
            <MenuItem onClick={() => setLeftHanded((value) => !value)}>
              {t('settings:layout.handed.label', { context: leftHanded ? 'right' : 'left' })}
            </MenuItem>
            <Menu placement="right-start" offset={15}>
              <MenuHandler>
                <MenuItem>{t('settings:layout.fret-numbers', { context: fretNumbers })}</MenuItem>
              </MenuHandler>
              <MenuList>
                {Object.keys(FretNumberType)
                  .filter((fretNumber) => fretNumber !== fretNumbers.valueOf())
                  .map((fretNumber) => (
                    <MenuItem key={fretNumber} onClick={() => onSelectFretNumber(fretNumber)}>
                      {t('settings:layout.fret-numbers', { context: fretNumber })}
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </MenuList>
        </Menu>
      </li>
    </ul>
  );
};

export default SettingsTools;
