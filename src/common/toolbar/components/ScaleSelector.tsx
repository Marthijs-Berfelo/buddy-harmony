import type { JSX } from 'react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';

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
      variant="ghost"
      disabled
      className="capitalize text-slate-500 bg-gray-200 hover:bg-gray-200 w-48"
    >
      {t('scale:title', scale ? { context: 'selected', scale } : undefined)}
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize bg-white w-48">
          {scale || t('scale:title')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {scales.map((option) => (
          <DropdownMenuItem
            key={option}
            disabled={option === scale}
            onClick={() => setScale(option)}
          >
            {option}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ScaleSelector;
