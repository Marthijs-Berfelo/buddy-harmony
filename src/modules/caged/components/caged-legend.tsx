import type { JSX } from 'react';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { CAGED_COLORS, CagedLetter } from '../hooks/caged-constants';
import { Switch } from '@/components/ui/switch';

interface CagedLegendProps {
  visibleShapes: Record<CagedLetter, boolean>;
  onToggleShape: (letter: CagedLetter) => void;
  showTriads: boolean;
  onShowTriadsChange: Dispatch<SetStateAction<boolean>>;
}

const LETTERS: CagedLetter[] = ['C', 'A', 'G', 'E', 'D'];

export const CagedLegend = ({
  visibleShapes,
  onToggleShape,
  showTriads,
  onShowTriadsChange,
}: CagedLegendProps): JSX.Element => {
  const { t } = useTranslation(['caged']);

  return (
    <div className="flex flex-wrap items-center gap-4" id="caged-legend">
      <div className="flex flex-wrap items-center gap-2">
        {LETTERS.map((letter) => {
          const on = visibleShapes[letter];
          const color = CAGED_COLORS[letter];
          return (
            <button
              key={letter}
              type="button"
              aria-label={t('caged:legend-shape-label', { letter })}
              aria-pressed={on}
              onClick={() => onToggleShape(letter)}
              className={
                on
                  ? `flex h-9 w-9 items-center justify-center rounded-md font-bold text-white shadow-inner ${color.bg}`
                  : 'flex h-9 w-9 items-center justify-center rounded-md bg-gray-200 font-bold text-gray-400 shadow'
              }
            >
              {letter}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <Switch
          checked={showTriads}
          onCheckedChange={onShowTriadsChange}
          aria-label={t('caged:legend-triad-label')}
        />
        <span className="text-sm text-slate-700">{t('caged:legend-triad-label')}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-slate-700 shadow-[0_0_0_2px_rgba(0,0,0,0.15)]" />
          {t('caged:legend-symbol-triad')}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-3 w-3 rounded-full border-2 border-slate-700" />
          {t('caged:legend-symbol-scale')}
        </span>
      </div>
    </div>
  );
};
