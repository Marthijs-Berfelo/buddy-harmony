import { JSX } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from 'hooks';
import { Diagram } from 'components/fretboard';
import { useCaged } from '../hooks';
import { DotText, FretNumberPosition } from 'components/fretboard/options';
import { CAGED_COLORS } from '../hooks/caged-constants';

export const CagedContent = (): JSX.Element => {
  const { t } = useTranslation(['caged']);
  const { selectedKey, cagedChords, cagedOrder, printRef, printStyle } = useCaged();
  const { orientation } = useSettings();

  return (
    <div className="flex flex-initial flex-col items-center" id="caged-content" ref={printRef}>
      {cagedChords && cagedOrder && (
        <div className="flex flex-col gap-2">
          <style type="text/css" media="print">
            {printStyle(orientation)}
          </style>
          <div className="flex flex-row" id="caged-column-headers">
            <div className="w-16 shrink-0" />
            <p className="flex-1 text-2xl text-center">{t('caged:open')}</p>
            <p className="flex-1 text-2xl text-center">
              {t('caged:positioned', { context: 'selected', key: selectedKey })}
            </p>
          </div>
          <div className="flex flex-col">
            {cagedOrder.map((letter) => {
              const color = CAGED_COLORS[letter];
              const cagedKey = cagedChords[letter];

              return (
                <div className="flex flex-row" id={`caged-${letter}`} key={letter}>
                  <div
                    className="flex w-16 shrink-0 flex-col justify-evenly"
                    id={`caged-step-${letter}`}
                  >
                    <p className={`text-4xl font-extrabold ${color.text}`}>{letter}</p>
                  </div>
                  <div
                    className="flex flex-1 flex-col items-center justify-start"
                    id={`caged-open-${letter}`}
                  >
                    <Diagram
                      key={`open-${letter}`}
                      className=""
                      diagramCount={1}
                      text={DotText.NOTE}
                      chord={cagedKey.open.chord}
                      fretNumbersPosition={FretNumberPosition.LEFT}
                    />
                  </div>
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
        </div>
      )}
    </div>
  );
};
