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
    visibleShapes,
    toggleShapeVisibility,
    showTriads,
    setShowTriads,
  } = useCaged();
  const { orientation } = useSettings();

  return (
    <div className="flex flex-initial flex-col items-center" id="caged-content" ref={printRef}>
      {cagedChords && cagedOrder && (
        <div className="flex flex-col gap-4">
          <style type="text/css" media="print">
            {printStyle(orientation)}
          </style>
          <CagedLegend
            visibleShapes={visibleShapes}
            onToggleShape={toggleShapeVisibility}
            showTriads={showTriads}
            onShowTriadsChange={setShowTriads}
            chordViewActive={viewMode === 'chord'}
          />
          {viewMode === 'scale' ? (
            <div className="flex flex-col items-center gap-2" id="caged-scale-view">
              <Diagram
                className=""
                diagramCount={1}
                text={DotText.NOTE}
                cagedShapes={sortedCagedShapes(cagedChords, cagedOrder, visibleShapes)}
                fretNumbersPosition={FretNumberPosition.LEFT}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2" id="caged-chord-view">
              <p className="text-2xl">{t('caged:chord_selected', { key: selectedKey })}</p>
              {cagedOrder.map((letter) => {
                const color = CAGED_COLORS[letter];
                const cagedKey = cagedChords[letter];

                return (
                  <div className="flex flex-row" id={`caged-${letter}`} key={letter}>
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
