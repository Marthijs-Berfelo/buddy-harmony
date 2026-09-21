import { render, screen } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { createElement } from 'react';
import { CagedLegend } from '../caged-legend';
import { CAGED_COLORS } from '../../hooks/caged-constants';

i18n.init({
  resources: {
    en: {
      caged: {
        'legend-shape-label': '{{letter}} chord',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

const renderLegend = (
  visibleShapes: Record<'C' | 'A' | 'G' | 'E' | 'D', boolean>,
  onToggle = vi.fn()
) =>
  render(
    createElement(
      I18nextProvider,
      { i18n },
      createElement(CagedLegend, { visibleShapes, onToggleShape: onToggle })
    )
  );

describe('CagedLegend', () => {
  test('renders one chip per CAGED letter, lit when visible', () => {
    renderLegend({ C: true, A: true, G: false, E: true, D: true });

    (['C', 'A', 'G', 'E', 'D'] as const).forEach((letter) => {
      expect(screen.getByRole('button', { name: `${letter} chord` })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'C chord' })).toHaveClass(
      ...CAGED_COLORS.C.bg.split(' ')
    );
    expect(screen.getByRole('button', { name: 'G chord' })).not.toHaveClass(
      ...CAGED_COLORS.G.bg.split(' ')
    );
    expect(screen.getByRole('button', { name: 'C chord' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'G chord' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  test('calls onToggleShape with the clicked letter', async () => {
    const onToggle = vi.fn();
    renderLegend({ C: true, A: true, G: true, E: true, D: true }, onToggle);

    screen.getByRole('button', { name: 'G chord' }).click();

    expect(onToggle).toHaveBeenCalledWith('G');
  });

  test('toggles aria-pressed on click', () => {
    const { rerender } = renderLegend({ C: true, A: true, G: true, E: true, D: true });

    expect(screen.getByRole('button', { name: 'G chord' })).toHaveAttribute(
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
        })
      )
    );

    expect(screen.getByRole('button', { name: 'G chord' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
});
