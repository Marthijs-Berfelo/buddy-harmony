import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createElement } from 'react';
import { CagedLegend } from '../caged-legend';
import { CAGED_COLORS } from '../../hooks/caged-constants';

i18n.init({
  resources: {
    en: {
      caged: {
        'legend-title': 'Legend',
        'legend-shape-label': '{{letter}} shape',
        'legend-triad-label': 'Show triads',
        'legend-symbol-triad': 'Triad',
        'legend-symbol-scale': 'Scale tone',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const renderLegend = (
  visibleShapes: Record<'C' | 'A' | 'G' | 'E' | 'D', boolean>,
  showTriads = true,
  onToggleShape = vi.fn(),
  onShowTriadsChange = vi.fn(),
  chordViewActive = false
) =>
  render(
    createElement(
      I18nextProvider,
      { i18n },
      createElement(CagedLegend, {
        visibleShapes,
        onToggleShape,
        showTriads,
        onShowTriadsChange,
        chordViewActive,
      })
    )
  );

describe('CagedLegend', () => {
  test('renders one chip per CAGED letter, lit when visible', () => {
    renderLegend({ C: true, A: true, G: false, E: true, D: true });

    (['C', 'A', 'G', 'E', 'D'] as const).forEach((letter) => {
      expect(screen.getByRole('button', { name: `${letter} shape` })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'C shape' })).toHaveClass(
      ...CAGED_COLORS.C.bg.split(' ')
    );
    expect(screen.getByRole('button', { name: 'G shape' })).not.toHaveClass(
      ...CAGED_COLORS.G.bg.split(' ')
    );
    expect(screen.getByRole('button', { name: 'C shape' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'G shape' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('calls onToggleShape with the clicked letter', () => {
    const onToggle = vi.fn();
    renderLegend({ C: true, A: true, G: true, E: true, D: true }, true, onToggle);

    screen.getByRole('button', { name: 'G shape' }).click();

    expect(onToggle).toHaveBeenCalledWith('G');
  });

  test('toggles aria-pressed on click', () => {
    const { rerender } = renderLegend({ C: true, A: true, G: true, E: true, D: true });

    expect(screen.getByRole('button', { name: 'G shape' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );

    rerender(
      createElement(
        I18nextProvider,
        { i18n },
        createElement(CagedLegend, {
          visibleShapes: { C: true, A: true, G: false, E: true, D: true },
          onToggleShape: vi.fn(),
          showTriads: true,
          onShowTriadsChange: vi.fn(),
        })
      )
    );

    expect(screen.getByRole('button', { name: 'G shape' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('renders the triad switch reflecting showTriads', () => {
    renderLegend({ C: true, A: true, G: true, E: true, D: true }, true);

    expect(screen.getByRole('switch', { name: 'Show triads' })).toBeChecked();
  });

  test('calls onShowTriadsChange with the flipped value when the triad switch is toggled', async () => {
    const user = userEvent.setup();
    const onShowTriadsChange = vi.fn();
    renderLegend(
      { C: true, A: true, G: true, E: true, D: true },
      false,
      vi.fn(),
      onShowTriadsChange
    );

    await user.click(screen.getByRole('switch', { name: 'Show triads' }));

    expect(onShowTriadsChange).toHaveBeenCalledWith(true);
  });

  test('renders the 2-entry scale-note symbol key', () => {
    renderLegend({ C: true, A: true, G: true, E: true, D: true });

    expect(screen.getByText('Triad')).toBeInTheDocument();
    expect(screen.getByText('Scale tone')).toBeInTheDocument();
  });

  test('renders inside a card with a "Legend" header, expanded by default', () => {
    renderLegend({ C: true, A: true, G: true, E: true, D: true });

    const header = screen.getByRole('button', { name: 'Legend' });
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('switch', { name: 'Show triads' })).toBeVisible();
  });

  test('clicking the "Legend" header collapses and re-expands the card', async () => {
    const user = userEvent.setup();
    renderLegend({ C: true, A: true, G: true, E: true, D: true });

    const header = screen.getByRole('button', { name: 'Legend' });
    await user.click(header);

    expect(screen.queryByRole('switch', { name: 'Show triads' })).not.toBeInTheDocument();

    await user.click(header);

    expect(screen.getByRole('switch', { name: 'Show triads' })).toBeVisible();
  });

  test('disables only the shape chips when chordViewActive is true', () => {
    renderLegend({ C: true, A: true, G: true, E: true, D: true }, true, vi.fn(), vi.fn(), true);

    expect(screen.getByRole('button', { name: 'C shape' })).toBeDisabled();
    expect(screen.getByRole('switch', { name: 'Show triads' })).not.toBeDisabled();
    expect(screen.getByRole('button', { name: 'Legend' })).not.toBeDisabled();
  });

  test('keeps shape chips enabled when chordViewActive is false', () => {
    renderLegend({ C: true, A: true, G: true, E: true, D: true }, true, vi.fn(), vi.fn(), false);

    expect(screen.getByRole('button', { name: 'C shape' })).not.toBeDisabled();
  });
});
