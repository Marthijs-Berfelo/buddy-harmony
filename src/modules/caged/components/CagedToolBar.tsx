import React from 'react';
import { Pages } from 'common/routing/pages';
import { useTranslation } from 'react-i18next';
import { Toolbar } from '../../../common';
import { CagedHook, chordGuitarTypes } from '../../../hooks';
import { Option, Select } from '@material-tailwind/react';

const context = Pages.CAGED;

const CagedToolBar = ({ keys, selectedKey, setSelectedKey, printRef }: CagedHook): JSX.Element => {
  const { t } = useTranslation('caged');
  return (
    <Toolbar
      page={context}
      supportedGuitars={chordGuitarTypes}
      printRef={printRef}
      tools={[
        <Select
          key={'chord-note'}
          label={t('common:key')}
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
      ]}
    />
  );
};

export default CagedToolBar;
