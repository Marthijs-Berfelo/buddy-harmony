import type { JSX } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pages } from 'routing/pages';
import { ChordSelector, KeySelector, ScaleSelector } from 'components/toolbar';
import { Toolbar } from 'layout/toolbar';
import { useSettings } from 'hooks';
import { useCaged } from '../hooks';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const context = Pages.CAGED;

export const CagedToolBar = (): JSX.Element => {
  const {
    keys,
    selectedKey,
    setSelectedKey,
    chords,
    chord,
    setChord,
    printRef,
    viewMode,
    setViewMode,
    isStandardTuning,
    scaleName,
    setScaleName,
  } = useCaged();
  const { t } = useTranslation(['caged']);
  const { chordGuitarTypes } = useSettings();

  const targetView = viewMode === 'chord' ? 'scale' : 'chord';
  const toggleDisabled = targetView === 'scale' && !isStandardTuning;

  const toggleButton = (
    <Button
      key={'caged-view-toggle'}
      type="button"
      variant="secondary"
      disabled={toggleDisabled}
      onClick={() => setViewMode(targetView)}
    >
      {t('caged:view-toggle-label', { context: viewMode })}
    </Button>
  );

  const toggle = toggleDisabled ? (
    <Tooltip key={'caged-view-toggle'}>
      <TooltipTrigger asChild>
        <span tabIndex={0}>{toggleButton}</span>
      </TooltipTrigger>
      <TooltipContent>{t('caged:scale-view-disabled-tooltip')}</TooltipContent>
    </Tooltip>
  ) : (
    toggleButton
  );

  return (
    <Toolbar
      page={context}
      supportedGuitars={chordGuitarTypes}
      printRef={printRef}
      printDisabled={!chord}
      tools={[
        toggle,
        <KeySelector key={'caged-key'} {...{ keys, selectedKey, setSelectedKey }} />,
        <ChordSelector key={'caged-chord'} {...{ chords, chord, setChord }} />,
        <ScaleSelector
          key={'caged-scale'}
          selectedKey={selectedKey}
          scales={[]}
          scale={scaleName}
          setScale={setScaleName}
        />,
      ]}
    />
  );
};
