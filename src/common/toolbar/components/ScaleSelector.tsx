import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';

interface ScaleSelectorProps {
  selectedKey?: string;
  scales: string[];
  scale?: string;
  setScale: Dispatch<SetStateAction<string | undefined>>;
}
const ScaleSelector = ({
  selectedKey,
  scales,
  scale,
  setScale,
}: ScaleSelectorProps): JSX.Element => {
  const { t } = useTranslation(['scale']);
  return !selectedKey || scales.length < 2 ? (
    <Button
      variant="text"
      disabled
      color="blue-gray"
      className="capitalize bg-grey-200 hover:bg-grey-200 w-48"
    >
      {t('scale:title', !!scale ? { context: 'selected', scale } : undefined)}
    </Button>
  ) : (
    <Menu offset={3}>
      <MenuHandler>
        <Button variant="outlined" className="capitalize bg-white w-48">
          {scale || t('scale:title')}
        </Button>
      </MenuHandler>
      <MenuList className="max-h-96 overflow-y-auto">
        {scales.map((option) => (
          <MenuItem
            key={option}
            disabled={option === scale}
            className={'justify-items-stretch'}
            onClick={() => setScale(option)}
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ScaleSelector;
