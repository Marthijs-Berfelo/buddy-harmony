import { render } from '@testing-library/react';
import FretboardDotsLoader from '../fretboard-dots-loader';

describe('FretboardDotsLoader', () => {
  test('renders four pulsing fret dots', () => {
    const { container } = render(<FretboardDotsLoader />);

    const dots = container.querySelectorAll('[data-testid="fret-dot"]');
    expect(dots).toHaveLength(4);
  });
});
