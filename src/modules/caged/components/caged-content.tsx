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
import { ScaleSelector } from 'components/toolbar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    scaleName,
    setScaleName,
    showTriads,
    setShowTriads,
    isStandardTuning,
  } = useCaged();
  const { orientation } = useSettings();

  const scaleViewButton = (
    <Button
      type="button"
      variant={viewMode === 'scale' ? 'default' : 'secondary'}
      aria-pressed={viewMode === 'scale'}
      disabled={!isStandardTuning}
      onClick={() => setViewMode('scale')}
    >
      {t('caged:view-scale')}
    </Button>
  );

  return (
    <div className="flex flex-initial flex-col items-center" id="caged-content" ref={printRef}>
      {cagedChords && cagedOrder && (
        <div className="flex flex-col gap-4">
          <style type="text/css" media="print">
            {printStyle(orientation)}
          </style>
          <div className="flex flex-row justify-center gap-2">
            <Button
              type="button"
              variant={viewMode === 'chord' ? 'default' : 'secondary'}
              aria-pressed={viewMode === 'chord'}
              onClick={() => setViewMode('chord')}
            >
              {t('caged:view-chord')}
            </Button>
            {isStandardTuning ? (
              scaleViewButton
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span tabIndex={0}>{scaleViewButton}</span>
                </TooltipTrigger>
                <TooltipContent>{t('caged:scale-view-disabled-tooltip')}</TooltipContent>
              </Tooltip>
            )}
          </div>
          <CagedLegend
            visibleShapes={visibleShapes}
            onToggleShape={toggleShapeVisibility}
            showTriads={showTriads}
            onShowTriadsChange={setShowTriads}
          />
          {viewMode === 'scale' ? (
            <div className="flex flex-col items-center gap-2" id="caged-scale-view">
              <p className="text-2xl">{t('caged:positioned_selected', { key: selectedKey })}</p>
              <ScaleSelector
                selectedKey={selectedKey}
                scales={[]}
                scale={scaleName}
                setScale={setScaleName}
              />
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
