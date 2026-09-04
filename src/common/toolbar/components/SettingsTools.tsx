import type { JSX } from 'react';
import React, { useEffect } from 'react';
import { GuitarType, useSettings } from '@/hooks';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from 'react-i18next';
import { FretNumberType, Orientation } from '@/common/fretboard/options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import { Pages } from '../../routing/pages';

export interface SettingsToolsProps {
  supportedGuitars?: GuitarType[];
  page: Pages;
}

const SettingsTools = ({ supportedGuitars, page }: SettingsToolsProps): JSX.Element => {
  const { t } = useTranslation('settings');
  const {
    guitarTypes,
    guitarType,
    onlySupportedGuitars,
    setGuitarType,
    tuningTypes,
    tuningType,
    orientation,
    toggleOrientation,
    orientationLabel,
    leftHanded,
    setLeftHanded,
    fretNumbers,
    onSelectFretNumber,
  } = useSettings();

  useEffect(() => {
    if (page === Pages.CAGED && orientation === Orientation.HORIZONTAL) {
      toggleOrientation();
    }
  }, [page, orientation, toggleOrientation]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          className="mr-1 bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/40"
        >
          <FontAwesomeIcon className="text-xl" icon={faGears} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex capitalize pb-3">
            {t('settings:guitar.label', { type: guitarType.name }).toLowerCase()}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="flex flex-col">
            {Array.from(guitarTypes)
              .filter(onlySupportedGuitars(supportedGuitars))
              .map((type) => (
                <DropdownMenuItem
                  key={type.name}
                  disabled={type.name === guitarType.name}
                  className={
                    type.name === guitarType.name ? 'font-extrabold bg-blue-800 text-white' : ''
                  }
                  onClick={() => setGuitarType(type)}
                >
                  {t('settings:guitar.type', { context: type.name })}
                </DropdownMenuItem>
              ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <Select value={tuningType.name} disabled>
          <SelectTrigger className="flex items-center">
            <SelectValue>{t('settings:tuning', { context: tuningType.name })}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tuningTypes.map((tuning) => (
              <SelectItem key={tuning.name} value={tuning.name}>
                {t('settings:tuning', { context: tuning.name })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="pt-3">
            {t('settings:layout.label', {
              orientation,
              handed: leftHanded ? 'left' : 'right',
              fretNumbers,
            })}
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => toggleOrientation()} disabled={page === Pages.CAGED}>
              {t('settings:layout.orientation', { context: orientationLabel })}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLeftHanded((value) => !value)}>
              {t('settings:layout.handed.label', { context: leftHanded ? 'right' : 'left' })}
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                {t('settings:layout.fret-numbers', { context: fretNumbers })}
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {Object.keys(FretNumberType)
                  .filter((fretNumber) => fretNumber !== fretNumbers.valueOf())
                  .map((fretNumber) => (
                    <DropdownMenuItem
                      key={fretNumber}
                      onClick={() => onSelectFretNumber(fretNumber)}
                    >
                      {t('settings:layout.fret-numbers', { context: fretNumber })}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SettingsTools;
