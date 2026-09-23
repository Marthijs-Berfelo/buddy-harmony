import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { Dispatch, SetStateAction } from 'react';
import { ScaleSelector } from '../scale-selector';

i18n.init({
  resources: {
    en: {
      scale: {
        title: 'Select Scale',
        title_selected: 'Scale: {{scale}}',
        none: 'None',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const renderScaleSelector = (
  props: Partial<{
    selectedKey?: string;
    scales: string[];
    scale?: string;
    setScale: Dispatch<SetStateAction<string | undefined>>;
  }> = {}
) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ScaleSelector
        selectedKey={props.selectedKey}
        scales={props.scales ?? ['major', 'minor']}
        scale={props.scale}
        setScale={props.setScale ?? (() => {})}
      />
    </I18nextProvider>
  );

describe('ScaleSelector', () => {
  test('shows a disabled placeholder when no key is selected', () => {
    renderScaleSelector({ selectedKey: undefined });

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
    expect(trigger).not.toHaveAttribute('aria-haspopup');
  });

  test('shows a disabled placeholder when fewer than two scales are available', () => {
    renderScaleSelector({ selectedKey: 'C', scales: ['major'] });

    const trigger = screen.getByRole('button');
    expect(trigger).toBeDisabled();
  });

  test('shows the scale dropdown once a key is selected and two or more scales are available', () => {
    renderScaleSelector({ selectedKey: 'C' });

    const trigger = screen.getByRole('button', { name: 'Select Scale' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).not.toBeDisabled();
  });

  test('shows the selected scale on the dropdown trigger with the "Scale: " prefix', () => {
    renderScaleSelector({ selectedKey: 'C', scale: 'major' });

    expect(screen.getByRole('button', { name: 'Scale: major' })).toBeInTheDocument();
  });

  test('shows the "Select Scale" placeholder on the disabled trigger when no scale is picked', () => {
    renderScaleSelector({ selectedKey: undefined, scale: undefined });

    expect(screen.getByRole('button', { name: 'Select Scale' })).toBeInTheDocument();
  });

  test('shows the selected scale with the "Scale: " prefix on the disabled trigger', () => {
    renderScaleSelector({ selectedKey: 'C', scales: ['major'], scale: 'major' });

    const trigger = screen.getByRole('button', { name: 'Scale: major' });
    expect(trigger).toBeDisabled();
  });

  test('lists every scale option and disables the currently selected one', async () => {
    const user = userEvent.setup();
    renderScaleSelector({ selectedKey: 'C', scales: ['major', 'minor'], scale: 'major' });

    await user.click(screen.getByRole('button', { name: 'Scale: major' }));

    expect(screen.getByRole('menuitem', { name: 'major' })).toHaveAttribute('data-disabled');
    expect(screen.getByRole('menuitem', { name: 'minor' })).not.toHaveAttribute('data-disabled');
  });

  test('lists a "None" menu item that is enabled when a scale is selected', async () => {
    const user = userEvent.setup();
    renderScaleSelector({ selectedKey: 'C', scales: ['major', 'minor'], scale: 'major' });

    await user.click(screen.getByRole('button', { name: 'Scale: major' }));

    expect(screen.getByRole('menuitem', { name: 'None' })).not.toHaveAttribute('data-disabled');
  });

  test('clicking "None" calls setScale with undefined', async () => {
    const user = userEvent.setup();
    const setScale = vi.fn();
    renderScaleSelector({ selectedKey: 'C', scales: ['major', 'minor'], scale: 'major', setScale });

    await user.click(screen.getByRole('button', { name: 'Scale: major' }));
    await user.click(screen.getByRole('menuitem', { name: 'None' }));

    expect(setScale).toHaveBeenCalledWith(undefined);
  });
});
