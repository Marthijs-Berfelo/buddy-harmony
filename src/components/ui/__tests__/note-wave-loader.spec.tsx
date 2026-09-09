import { render } from '@testing-library/react';
import { NoteWaveLoader } from '../note-wave-loader';

describe('NoteWaveLoader', () => {
  test('renders three note glyphs', () => {
    const { container } = render(<NoteWaveLoader />);

    const notes = container.querySelectorAll('[data-testid="note-wave-glyph"]');
    expect(notes).toHaveLength(3);
    expect(notes[0]).toHaveTextContent('♪');
    expect(notes[1]).toHaveTextContent('♫');
    expect(notes[2]).toHaveTextContent('♪');
  });
});
