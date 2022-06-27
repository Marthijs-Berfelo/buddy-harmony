import { IconButton, Tooltip, Typography } from '@material-tailwind/react';
import React from 'react';
import SettingsTools, { SettingsToolsProps } from './components/SettingsTools';
import { PrintableProps } from '../../hooks';
import { useReactToPrint } from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pages } from '../routing/pages';
import { useTranslation } from 'react-i18next';

interface ToolbarProps extends SettingsToolsProps, PrintableProps {
  tools: JSX.Element[];
  page: Pages;
}

const Toolbar = ({ tools, page, supportedGuitars, printRef }: ToolbarProps): JSX.Element => {
  const { t } = useTranslation('settings');
  const handlePrint = useReactToPrint({ content: () => printRef.current });
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-full justify-between items-center w-full md:w-2xl py-1.5 px-1.5 md:px-6 mb-3 bg-blue-100 border-blue-100 text-blue-grey-900 md:rounded-xl z40">
        <SettingsTools supportedGuitars={supportedGuitars} page={page} />
        <div className="flex flex-col items-center">
          <Typography className="flex pb-1.5 font-sans font-bold text-blue-grey-900 text-xl">
            {t('common:page.title', { context: page })}
          </Typography>
          <ul className="flex flex-row justify-center gap-1 md:gap-6">
            {tools.map((tool, index) => (
              <li key={`tool-${index}`}>{tool}</li>
            ))}
          </ul>
        </div>
        {printRef.current !== null ? (
          <Tooltip content={t('settings:print.tool-tip', { context: page })}>
            <IconButton onClick={handlePrint} className="flex ml-1">
              <FontAwesomeIcon className="flex text-lg" icon="print" />
            </IconButton>
          </Tooltip>
        ) : (
          <div className="flex" />
        )}
      </div>
    </div>
  );
};

export default Toolbar;
