import type { JSX } from 'react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch } from '@/components/ui/switch';

interface ScaleTriadToggleProps {
  showTriads: boolean;
  onShowTriadsChange: Dispatch<SetStateAction<boolean>>;
}

export const ScaleTriadToggle = ({
  showTriads,
  onShowTriadsChange,
}: ScaleTriadToggleProps): JSX.Element => {
  const { t } = useTranslation(['scale']);

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={showTriads}
        onCheckedChange={onShowTriadsChange}
        aria-label={t('scale:triad-toggle-label')}
      />
      <span className="text-sm text-slate-700">{t('scale:triad-toggle-label')}</span>
    </div>
  );
};
