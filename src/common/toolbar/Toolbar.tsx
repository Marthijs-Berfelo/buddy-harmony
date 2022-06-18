import { IconButton, Navbar, Tooltip, Typography } from '@material-tailwind/react';
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
    <Navbar className="flex flex-row align-self-center w-[90vw] mb-3 bg-blue-100 border-blue-100 z40">
      <div className="container flex justify-between text-blue-grey-900">
        <Typography className="flex py-1.5 mr-4 font-sans font-bold text-blue-grey-900 text-xl">
          {t('common:page.title', { context: page })}
        </Typography>
        <SettingsTools supportedGuitars={supportedGuitars} />
        <ul className="flex justify-center gap-6">
          {tools.map((tool, index) => (
            <li key={`tool-${index}`}>{tool}</li>
          ))}
        </ul>
        {printRef.current !== null && (
          <Tooltip content={t('settings:print.tool-tip', { context: page })}>
            <IconButton onClick={handlePrint} className="flex">
              <FontAwesomeIcon className="flex text-lg" icon="print" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Navbar>
  );
};

export default Toolbar;
