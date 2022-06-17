import { IconButton, Navbar, Typography } from '@material-tailwind/react';
import React from 'react';
import SettingsTools, { SettingsToolsProps } from './components/SettingsTools';
import { PrintableProps } from '../../hooks';
import ReactToPrint from 'react-to-print';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ToolbarProps extends SettingsToolsProps, PrintableProps {
  title: string;
  tools: JSX.Element[];
}

const Toolbar = ({ title, tools, supportedGuitars, printRef }: ToolbarProps): JSX.Element => {
  return (
    <Navbar className="flex flex-row align-self-center w-[90vw] mb-3 bg-blue-100 border-blue-100 z40">
      <div className="container flex justify-between text-blue-grey-900">
        <Typography className="flex py-1.5 mr-4 font-sans font-bold text-blue-grey-900 text-xl">
          {title}
        </Typography>
        <SettingsTools supportedGuitars={supportedGuitars} />
        <ul className="flex justify-center gap-6">
          {tools.map((tool, index) => (
            <li key={`tool-${index}`}>{tool}</li>
          ))}
        </ul>
        {printRef.current !== null && (
          <ReactToPrint
            trigger={() => (
              <IconButton className="flex">
                <FontAwesomeIcon className="flex text-lg" icon="print" />
              </IconButton>
            )}
            content={() => printRef.current}
          />
        )}
      </div>
    </Navbar>
  );
};

export default Toolbar;
