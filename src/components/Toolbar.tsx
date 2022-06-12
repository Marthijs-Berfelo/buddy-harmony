import { Navbar, Typography } from '@material-tailwind/react';
import React from 'react';

interface ToolbarProps {
  title: string;
  tools: JSX.Element[];
}

const Toolbar = ({ title, tools }: ToolbarProps): JSX.Element => (
  <Navbar className="max-w-screen-2xl bg-blue-100 border-blue-100">
    <div className="container flex justify-between items-center text-blue-grey-900">
      <Typography className="py-1.5 mr-4 font-sans font-bold text-blue-grey-900 text-xl">
        {title}
      </Typography>
      <ul className="flex items-center gap-6">
        {tools.map((tool, index) => (
          <li key={`tool-${index}`}>{tool}</li>
        ))}
      </ul>
    </div>
  </Navbar>
);

export default Toolbar;
