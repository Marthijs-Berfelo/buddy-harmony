import type { JSX } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CAGED_COLORS, CagedLetter } from '../hooks/caged-constants';

interface CagedLegendProps {
  visibleShapes: Record<CagedLetter, boolean>;
  onToggleShape: (letter: CagedLetter) => void;
}

const LETTERS: CagedLetter[] = ['C', 'A', 'G', 'E', 'D'];

export const CagedLegend = ({ visibleShapes, onToggleShape }: CagedLegendProps): JSX.Element => {
  const { t } = useTranslation(['caged']);

  return (
    <div className="flex flex-wrap items-center gap-2" id="caged-legend">
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
  );
};
