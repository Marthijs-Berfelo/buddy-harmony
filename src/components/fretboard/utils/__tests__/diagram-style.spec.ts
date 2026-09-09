import { MouseEvent } from 'react';
import { diagramStyle } from '../diagram-style';
import { Orientation } from '../../options';

describe('diagramStyle', () => {
  const style = diagramStyle();

  describe('stringLength / fretLength', () => {
    test('computes the string length for a given number of frets', () => {
      expect(style.stringLength(12)).toBe(12 * (100 + 8) - 100 / 2);
    });

    test('computes the fret length for a given number of strings', () => {
      expect(style.fretLength(6)).toBe((6 - 1) * 60 + 4);
    });

    test('throws when frets is not greater than 0', () => {
      expect(() => style.stringLength(0)).toThrow();
    });

    test('throws when strings is not greater than 0', () => {
      expect(() => style.fretLength(0)).toThrow();
    });
  });

  describe('stringBoundary / fretBoundary', () => {
    test('adds padding on both sides for vertical orientation', () => {
      const expected = style.stringLength(12) + style.fretWidth + style.padding * 2;
      expect(style.stringBoundary(12, Orientation.VERTICAL)).toBe(expected);
    });

    test('adds padding on both sides for horizontal orientation', () => {
      const expected = style.stringLength(12) + style.fretWidth + style.padding * 2;
      expect(style.stringBoundary(12, Orientation.HORIZONTAL)).toBe(expected);
    });

    test('adds padding on both sides regardless of orientation for fretBoundary', () => {
      const expected = style.fretLength(6) + style.stringWidth + style.padding * 2;
      expect(style.fretBoundary(6, Orientation.VERTICAL)).toBe(expected);
      expect(style.fretBoundary(6, Orientation.HORIZONTAL)).toBe(expected);
    });

    test('throws when frets/strings is not greater than 0', () => {
      expect(() => style.stringBoundary(0, Orientation.HORIZONTAL)).toThrow();
      expect(() => style.fretBoundary(0, Orientation.HORIZONTAL)).toThrow();
    });
  });

  describe('getStringAndFretFromMouseEvent', () => {
    const strings = 6;
    const frets = 12;

    const makeEvent = (
      clientX: number,
      clientY: number,
      rect: Partial<DOMRect> = {}
    ): MouseEvent<SVGSVGElement> => {
      const boundingRect = {
        left: 0,
        top: 0,
        width: style.stringBoundary(frets, Orientation.HORIZONTAL),
        height: style.fretBoundary(strings, Orientation.HORIZONTAL),
        ...rect,
      } as DOMRect;

      return {
        clientX,
        clientY,
        currentTarget: {
          getBoundingClientRect: () => boundingRect,
        },
      } as unknown as MouseEvent<SVGSVGElement>;
    };

    test('returns undefined for vertical orientation (unsupported)', () => {
      const event = makeEvent(200, 200);
      expect(
        style.getStringAndFretFromMouseEvent(event, strings, frets, Orientation.VERTICAL)
      ).toBeUndefined();
    });

    test('resolves a string/fret in the middle of the horizontal fretboard', () => {
      const width = style.stringBoundary(frets, Orientation.HORIZONTAL);
      const height = style.fretBoundary(strings, Orientation.HORIZONTAL);
      const event = makeEvent(width / 2, height / 2);

      const result = style.getStringAndFretFromMouseEvent(
        event,
        strings,
        frets,
        Orientation.HORIZONTAL
      );

      expect(result).toBeDefined();
      expect(result?.string).toBeGreaterThanOrEqual(0);
      expect(result?.string).toBeLessThan(strings);
      expect(result?.fret).toBeGreaterThanOrEqual(0);
      expect(result?.fret).toBeLessThanOrEqual(frets);
    });

    test('returns undefined when the click is above the fretboard (too small deltaY)', () => {
      const event = makeEvent(200, 0);
      expect(
        style.getStringAndFretFromMouseEvent(event, strings, frets, Orientation.HORIZONTAL)
      ).toBeUndefined();
    });

    test('returns undefined when the click is below the fretboard (too large deltaY)', () => {
      const height = style.fretBoundary(strings, Orientation.HORIZONTAL);
      const event = makeEvent(200, height);
      expect(
        style.getStringAndFretFromMouseEvent(event, strings, frets, Orientation.HORIZONTAL)
      ).toBeUndefined();
    });

    test('returns undefined when the click is left of the fretboard (too small deltaX)', () => {
      const height = style.fretBoundary(strings, Orientation.HORIZONTAL);
      const event = makeEvent(0, height / 2);
      expect(
        style.getStringAndFretFromMouseEvent(event, strings, frets, Orientation.HORIZONTAL)
      ).toBeUndefined();
    });

    test('returns undefined when the click is right of the fretboard (too large deltaX)', () => {
      const width = style.stringBoundary(frets, Orientation.HORIZONTAL);
      const height = style.fretBoundary(strings, Orientation.HORIZONTAL);
      const event = makeEvent(width, height / 2);
      expect(
        style.getStringAndFretFromMouseEvent(event, strings, frets, Orientation.HORIZONTAL)
      ).toBeUndefined();
    });

    test('clamps the resolved string index within [0, strings - 1]', () => {
      const width = style.stringBoundary(frets, Orientation.HORIZONTAL);
      const height = style.fretBoundary(strings, Orientation.HORIZONTAL);
      const event = makeEvent(width / 2, style.padding);

      const result = style.getStringAndFretFromMouseEvent(
        event,
        strings,
        frets,
        Orientation.HORIZONTAL
      );

      expect(result?.string).toBeGreaterThanOrEqual(0);
      expect(result?.string).toBeLessThan(strings);
    });
  });
});
