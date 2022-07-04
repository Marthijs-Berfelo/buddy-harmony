import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';

interface ChordSelectorProps {
  keys: string[];
  selectedKey?: string;
  setSelectedKey: Dispatch<SetStateAction<string | undefined>>;
}
const KeySelector = ({ keys, selectedKey, setSelectedKey }: ChordSelectorProps): JSX.Element => {
  const { t } = useTranslation();
  return keys.length < 2 ? (
    <Button
      variant="text"
      disabled
      color="blue-grey"
      className="capitalize bg-grey-200 hover:bg-grey-200 w-48"
    >
      {t('common:key', !!selectedKey ? { context: 'selected', key: selectedKey } : undefined)}
    </Button>
  ) : (
    <Menu offset={3}>
      <MenuHandler>
        <Button variant="outlined" className="capitalize bg-white w-48">
          {t('common:key', !!selectedKey ? { context: 'selected', key: selectedKey } : undefined)}
        </Button>
      </MenuHandler>
      <MenuList className="max-h-96 overflow-y-auto">
        {keys.map((key) => (
          <MenuItem
            key={`key-${key}`}
            disabled={key === selectedKey}
            className={'justify-items-stretch'}
            onClick={() => setSelectedKey(key)}
          >
            {key}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default KeySelector;
