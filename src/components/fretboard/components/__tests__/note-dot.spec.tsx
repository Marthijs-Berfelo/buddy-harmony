import { render } from '@testing-library/react';
import { NoteDot } from '../note-dot';
import { NOTE_GLOW_FILTER_ID } from '../../options';

describe('NoteDot', () => {
  test('renders a single base circle when not emphasized', () => {
    const { container } = render(
      <svg>
        <NoteDot
          cx={10}
          cy={20}
          radius={20}
          strokeWidth={1}
          className="dot"
          strokeClassName="stroke-blue-500"
          fillClassName="fill-white"
        />
      </svg>
    );

    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(1);
    expect(circles[0]).toHaveAttribute('cx', '10');
    expect(circles[0]).toHaveAttribute('cy', '20');
    expect(circles[0]).toHaveAttribute('r', '20');
    expect(circles[0]).toHaveAttribute('stroke-width', '1');
    expect(circles[0]).toHaveAttribute('class', 'dot fill-white stroke-blue-500');
    expect(container.querySelector('g')).not.toHaveAttribute('filter');
  });

  test('renders a halo ring, enlarged saturated fill, and glow filter reference when emphasized', () => {
    const { container } = render(
      <svg>
        <NoteDot
          cx={10}
          cy={20}
          radius={20}
          strokeWidth={1}
          className="dot"
          strokeClassName="stroke-blue-500"
          fillClassName="fill-white"
          emphasisStrokeClassName="stroke-blue-700"
          emphasisFillClassName="fill-blue-700"
          emphasized
          glowFilterId={NOTE_GLOW_FILTER_ID}
        />
      </svg>
    );

    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(2);
    expect(circles[0]).toHaveAttribute('r', '27');
    expect(circles[0]).toHaveAttribute('stroke-width', '2');
    expect(circles[0]).toHaveAttribute('class', 'dot fill-none stroke-blue-700');
    expect(circles[1]).toHaveAttribute('r', '21');
    expect(circles[1]).toHaveAttribute('stroke-width', '2');
    expect(circles[1]).toHaveAttribute('class', 'dot fill-blue-700 stroke-blue-700');
    expect(container.querySelector('g')).toHaveAttribute('filter', `url(#${NOTE_GLOW_FILTER_ID})`);
  });

  test('falls back to base styling when emphasized is true but no emphasis classes are supplied', () => {
    const { container } = render(
      <svg>
        <NoteDot
          cx={10}
          cy={20}
          radius={20}
          strokeWidth={1}
          className="dot"
          strokeClassName="stroke-blue-500"
          fillClassName="fill-white"
          emphasized
          glowFilterId={NOTE_GLOW_FILTER_ID}
        />
      </svg>
    );

    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(1);
    expect(circles[0]).toHaveAttribute('r', '20');
    expect(container.querySelector('g')).not.toHaveAttribute('filter');
  });
});
