import { render } from '@testing-library/react';
import { ChordShape } from '../chord-shape';
import { SettingsProvider } from 'hooks';
import type { ChordPosition } from 'hooks';

const renderChordShape = (props: Parameters<typeof ChordShape>[0]) =>
  render(
    <SettingsProvider>
      <svg>
        <ChordShape {...props} />
      </svg>
    </SettingsProvider>
  );

const openChord: ChordPosition = {
  frets: [0, 2, 2, 1, 0, 0],
  fingers: [0, 2, 3, 1, 0, 0],
  baseFret: 1,
  midi: [],
  notes: ['E2', 'B2', 'E3', 'G#3', 'B3', 'E4'],
};

describe('ChordShape', () => {
  describe('without cagedColor (plain chord)', () => {
    test('renders a plain "O" glyph for open strings, not a colored dot', () => {
      const { container } = renderChordShape({ className: 'some-class', chord: openChord });

      const texts = Array.from(container.querySelectorAll('text')).map((el) => el.textContent);
      // String indices 0, 4, 5 are open ('O'); strings 1, 2, 3 are fretted (finger numbers).
      expect(texts.filter((text) => text === 'O')).toHaveLength(3);
      expect(container.querySelectorAll('circle')).toHaveLength(3);
    });
  });

  describe('with cagedColor (CAGED chord row)', () => {
    test('renders a colored dot with the note text for open strings, not an "O" glyph', () => {
      const { container } = renderChordShape({
        className: 'some-class',
        chord: openChord,
        cagedColor: 'stroke-blue-700 fill-blue-700',
      });

      const texts = Array.from(container.querySelectorAll('text')).map((el) => el.textContent);
      expect(texts).not.toContain('O');
      // All 6 strings now render as dots: 3 open + 3 fretted.
      expect(container.querySelectorAll('circle')).toHaveLength(6);
    });

    test('gives open-string dots the same cagedColor as fretted dots', () => {
      const { container } = renderChordShape({
        className: 'some-class',
        chord: openChord,
        cagedColor: 'stroke-blue-700 fill-blue-700',
      });

      const circles = Array.from(container.querySelectorAll('circle'));
      expect(circles.every((circle) => circle.classList.contains('stroke-blue-700'))).toBe(true);
    });

    test('renders the note text for an open string from chord.notes', () => {
      const { container } = renderChordShape({
        className: 'some-class',
        chord: openChord,
        cagedColor: 'stroke-blue-700 fill-blue-700',
      });

      const texts = Array.from(container.querySelectorAll('text')).map((el) => el.textContent);
      // Notes at open string indices 0, 4, 5 are 'E2', 'B3', 'E4'.
      expect(texts).toEqual(expect.arrayContaining(['E2', 'B3', 'E4']));
    });
  });
});
