import type { JSX } from 'react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChordSelectorProps {
  keys: string[];
  selectedKey?: string;
  setSelectedKey: Dispatch<SetStateAction<string | undefined>>;
}
const KeySelector = ({ keys, selectedKey, setSelectedKey }: ChordSelectorProps): JSX.Element => {
  const { t } = useTranslation();
  return keys.length < 2 ? (
    <Button
      variant="ghost"
      disabled
      className="capitalize text-slate-500 bg-gray-200 hover:bg-gray-200 w-48"
    >
      {t('common:key', selectedKey ? { context: 'selected', key: selectedKey } : undefined)}
    </Button>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="capitalize bg-white w-48">
          {t('common:key', selectedKey ? { context: 'selected', key: selectedKey } : undefined)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {keys.map((key) => (
          <DropdownMenuItem
            key={`key-${key}`}
            disabled={key === selectedKey}
            onClick={() => setSelectedKey(key)}
          >
            {key}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default KeySelector;
