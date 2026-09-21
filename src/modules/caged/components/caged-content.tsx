import { JSX } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from 'hooks';
import { Diagram } from 'components/fretboard';
import { useCaged } from '../hooks';
import { DotText, FretNumberPosition } from 'components/fretboard/options';
import { CAGED_COLORS } from '../hooks/caged-constants';
import { sortedCagedShapes } from '../hooks/caged-utils';
import { CagedLegend } from './caged-legend';

export const CagedContent = (): JSX.Element => {
  const { t } = useTranslation(['caged']);
  const {
    selectedKey,
    cagedChords,
    cagedOrder,
    printRef,
    printStyle,
    viewMode,
    setViewMode,
    visibleShapes,
    toggleShapeVisibility,
  } = useCaged();
  const { orientation } = useSettings();

  return (
    <div className="flex flex-initial flex-col items-center" id="caged-content" ref={printRef}>
      {cagedChords && cagedOrder && (
        <div className="flex flex-col gap-4">
          <style type="text/css" media="print">
            {printStyle(orientation)}
          </style>
          <div className="flex flex-row justify-center gap-2">
            <button
              type="button"
              onClick={() => setViewMode('chord')}
              aria-pressed={viewMode === 'chord'}
              className={
                viewMode === 'chord'
                  ? 'rounded-md bg-slate-700 px-4 py-1 text-white'
                  : 'rounded-md bg-gray-200 px-4 py-1 text-slate-700'
              }
            >
              {t('caged:view-chord')}
            </button>
            <button
              type="button"
              onClick={() => setViewMode('scale')}
              aria-pressed={viewMode === 'scale'}
              className={
                viewMode === 'scale'
                  ? 'rounded-md bg-slate-700 px-4 py-1 text-white'
                  : 'rounded-md bg-gray-200 px-4 py-1 text-slate-700'
              }
            >
              {t('caged:view-scale')}
            </button>
          </div>
          <CagedLegend visibleShapes={visibleShapes} onToggleShape={toggleShapeVisibility} />
          {viewMode === 'scale' ? (
            <div className="flex flex-col items-center" id="caged-scale-view">
              <p className="text-2xl">{t('caged:positioned_selected', { key: selectedKey })}</p>
              <Diagram
                className=""
                diagramCount={1}
                text={DotText.NOTE}
                cagedShapes={sortedCagedShapes(cagedChords, cagedOrder, visibleShapes)}
                fretNumbersPosition={FretNumberPosition.LEFT}
              />
            </div>
          ) : (
            <div className="flex flex-col" id="caged-chord-view">
              {cagedOrder.map((letter) => {
                const color = CAGED_COLORS[letter];
                const cagedKey = cagedChords[letter];

                return (
                  <div
                    className={`flex flex-row border-l-4 pl-2 ${color.border}`}
                    id={`caged-${letter}`}
                    key={letter}
                  >
                    <div
                      className="flex flex-1 flex-col items-center justify-start"
                      id={`caged-chord-${letter}`}
                    >
                      <Diagram
                        key={`positioned-${letter}`}
                        className=""
                        diagramCount={1}
                        text={DotText.NOTE}
                        chord={cagedKey.positioned.chord}
                        fretNumbersPosition={FretNumberPosition.LEFT}
                        cagedColor={color.caged}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
