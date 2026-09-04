import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import SettingsTools, { SettingsToolsProps } from './components/SettingsTools';
import { PrintableProps } from '@/hooks';
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
      <div className="flex flex-row w-full justify-between items-center py-1.5 px-1.5 md:px-6 mb-3 bg-blue-100 border-blue-100 text-slate-400 md:rounded-xl z40">
        <SettingsTools supportedGuitars={supportedGuitars} page={page} />
        <div className="flex flex-col items-center">
          <p className="flex pb-1.5 font-sans font-bold text-slate-900 text-xl">
            {t('common:routing.page', { context: enumKeyByValue(Pages, page) })}
          </p>
          <div className="flex flex-row justify-center gap-1 md:gap-6">
            {tools.map((tool, index) => (
              <div key={`tool-${index}`}>{tool}</div>
            ))}
          </div>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              onClick={handlePrint}
              className="flex ml-1 bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40"
              disabled={printDisabled}
            >
              <FontAwesomeIcon className="flex size-4.5" icon={faPrint} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t('settings:print.tool-tip', { context: enumKeyByValue(Pages, page) })}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Toolbar;
