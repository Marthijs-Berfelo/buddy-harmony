import { Navbar, Typography } from '@material-tailwind/react';
import React from 'react';
import './Toolbar.css';
import SettingsTools from './components/SettingsTools';

interface ToolbarProps {
  title: string;
  tools: JSX.Element[];
}

const Toolbar = ({ title, tools }: ToolbarProps): JSX.Element => {
  return (
    <Navbar className="tool-bar mb-3 bg-blue-100 border-blue-100 z40">
      <div className="container flex justify-between text-blue-grey-900">
        <Typography className="flex py-1.5 mr-4 font-sans font-bold text-blue-grey-900 text-xl">
          {title}
        </Typography>
        <SettingsTools />
        <ul className="flex justify-center gap-6">
          {tools.map((tool, index) => (
            <li key={`tool-${index}`}>{tool}</li>
          ))}
        </ul>
      </div>
    </Navbar>
  );
};

export default Toolbar;
