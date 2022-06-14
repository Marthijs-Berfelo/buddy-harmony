import { Dispatch, SetStateAction, useState } from 'react';
import { keys } from './constants';

export interface KeysHook {
  keys: string[];
  selectedKey?: string;
  setSelectedKey: Dispatch<SetStateAction<string | undefined>>;
}

export const useKeys = (): KeysHook => {
  const [selectedKey, setSelectedKey] = useState<string>();

  return {
    keys,
    selectedKey,
    setSelectedKey,
  };
};
