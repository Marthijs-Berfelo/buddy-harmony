import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { ScaleSelector } from '../scale-selector';

i18n.init({ resources: {}, lng: 'en', fallbackLng: 'en' });

const renderScaleSelector = (
  props: Partial<{ selectedKey?: string; scales: string[]; scale?: string }> = {}
) =>
  render(
    <I18nextProvider i18n={i18n}>
      <ScaleSelector
        selectedKey={props.selectedKey}
        scales={props.scales ?? ['major', 'minor']}
        scale={props.scale}
        setScale={() => {}}
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

    const trigger = screen.getByRole('button', { name: 'title' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).not.toBeDisabled();
  });

  test('shows the selected scale on the dropdown trigger', () => {
    renderScaleSelector({ selectedKey: 'C', scale: 'major' });

    expect(screen.getByRole('button', { name: 'major' })).toBeInTheDocument();
  });

  test('lists every scale option and disables the currently selected one', async () => {
    const user = userEvent.setup();
    renderScaleSelector({ selectedKey: 'C', scales: ['major', 'minor'], scale: 'major' });

    await user.click(screen.getByRole('button', { name: 'major' }));

    expect(screen.getByRole('menuitem', { name: 'major' })).toHaveAttribute('data-disabled');
    expect(screen.getByRole('menuitem', { name: 'minor' })).not.toHaveAttribute('data-disabled');
  });
});
