import React, { useEffect } from 'react';
import { GuitarType, useSettings } from '../../../hooks';
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Typography,
} from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { FretNumberType, Orientation } from '../../fretboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { Pages } from '../../routing/pages';

export interface SettingsToolsProps {
  supportedGuitars?: GuitarType[];
  page: Pages;
}

const SettingsTools = ({ supportedGuitars, page }: SettingsToolsProps): JSX.Element => {
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

  useEffect(() => {
    if (page === Pages.CAGED && orientation === Orientation.HORIZONTAL) {
      toggleOrientation();
    }
  }, [page]);

  return (
    <Menu placement="bottom-start">
      <MenuHandler>
        <IconButton className="mr-1">
          <FontAwesomeIcon className="text-xl" icon={faGears} />
        </IconButton>
      </MenuHandler>
      <MenuList>
        <Menu key={'tool-guitar'} placement="right" offset={15}>
          <MenuHandler>
            <Typography className="flex flex-grow capitalize pb-3">
              {t('settings:guitar.label', { type: guitarType.name }).toLowerCase()}
            </Typography>
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
                    `${
                      type.name === guitarType.name ? ' font-extrabold bg-blue-800 text-white' : ''
                    }`
                  }
                  onClick={() => setGuitarType(type)}
                >
                  {t('settings:guitar.type', { context: type.name })}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
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
        <Menu placement="right" offset={15}>
          <MenuHandler>
            <Typography className="pt-3">
              {t('settings:layout.label', {
                orientation,
                handed: leftHanded ? 'left' : 'right',
                fretNumbers,
              })}
            </Typography>
          </MenuHandler>
          <MenuList>
            <MenuItem onClick={() => toggleOrientation()} disabled={page === Pages.CAGED}>
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
      </MenuList>
    </Menu>
  );
};

export default SettingsTools;
