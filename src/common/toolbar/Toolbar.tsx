import type { JSX } from 'react';
import { IconButton, Tooltip, Typography } from '@material-tailwind/react';
import SettingsTools, { SettingsToolsProps } from './components/SettingsTools';
import { PrintableProps } from '../../hooks';
import { useReactToPrint } from 'react-to-print';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Pages } from '../routing/pages';
import { useTranslation } from 'react-i18next';
import { enumKeyByValue } from '../utils';

interface ToolbarProps extends SettingsToolsProps, PrintableProps {
  tools: JSX.Element[];
  page: Pages;
}

const Toolbar = ({
  tools,
  page,
  supportedGuitars,
  printRef,
  printDisabled,
}: ToolbarProps): JSX.Element => {
  const { t } = useTranslation('settings');
  const handlePrint = useReactToPrint({ contentRef: printRef });
  return (
    <div className="flex flex-col items-center md:px-96">
      <div className="flex flex-row w-full justify-between items-center py-1.5 px-1.5 md:px-6 mb-3 bg-blue-100 border-blue-100 text-blue-grey-400 md:rounded-xl z40">
        <SettingsTools supportedGuitars={supportedGuitars} page={page} />
        <div className="flex flex-col items-center">
          <Typography className="flex pb-1.5 font-sans font-bold text-blue-grey-900 text-xl">
            {t('common:routing.page', { context: enumKeyByValue(Pages, page) })}
          </Typography>
          <div className="flex flex-row justify-center gap-1 md:gap-6">
            {tools.map((tool, index) => (
              <div key={`tool-${index}`}>{tool}</div>
            ))}
          </div>
        </div>
        <Tooltip content={t('settings:print.tool-tip', { context: enumKeyByValue(Pages, page) })}>
          <IconButton
            color="blue"
            onClick={handlePrint}
            className="flex ml-1 disabled:bg-blue-grey-300"
            disabled={printDisabled}
          >
            <FontAwesomeIcon className="flex text-lg" icon={faPrint} />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;
