import { act, renderHook } from '@testing-library/react';
import { createElement, PropsWithChildren } from 'react';
import { useShape } from '../shape';
import { Orientation } from '../../options';
import { DEFAULT_STYLE } from '../diagram-style';
import { SettingsProvider, useSettings } from 'hooks';

const wrapper = ({ children }: PropsWithChildren) =>
  createElement(SettingsProvider, null, children);

const renderShape = () =>
  renderHook(() => ({ shape: useShape(), settings: useSettings() }), { wrapper });

const { padding, fretWidth, fretInterval, dotIn, dotOut, stringInterval, stringWidth } =
  DEFAULT_STYLE;

describe('useShape', () => {
  describe('vertical orientation (default)', () => {
    test('x follows string position regardless of left-handedness', () => {
      const { result } = renderShape();
      expect(result.current.settings.orientation).toBe(Orientation.VERTICAL);

      const expected = padding + 2 * stringInterval + stringWidth / 2;
      expect(result.current.shape.x(padding, 2, 5, 0)).toBe(expected);
    });

    test('y follows fret position for an open string (fret 0)', () => {
      const { result } = renderShape();

      const expected = padding - dotOut + fretWidth / 2;
      expect(result.current.shape.y(padding, 2, 0, 0)).toBe(expected);
    });

    test('y follows fret position for a fretted note', () => {
      const { result } = renderShape();

      const expected = padding + (5 - 1) * fretInterval + fretInterval - dotIn + fretWidth / 2;
      expect(result.current.shape.y(padding, 2, 5, 0)).toBe(expected);
    });
  });

  describe('horizontal orientation', () => {
    test('right-handed: x follows fret position, y follows string position', async () => {
      const { result } = renderShape();
      act(() => result.current.settings.toggleOrientation());
      expect(result.current.settings.orientation).toBe(Orientation.HORIZONTAL);

      const expectedX = padding + (5 - 1) * fretInterval + fretInterval - dotIn + fretWidth / 2;
      expect(result.current.shape.x(padding, 2, 5, 0)).toBe(expectedX);

      const expectedY = padding + 2 * stringInterval + stringWidth / 2;
      expect(result.current.shape.y(padding, 2, 5, 0)).toBe(expectedY);
    });

    test('left-handed: x mirrors the fret position', () => {
      const { result } = renderShape();
      act(() => result.current.settings.toggleOrientation());
      act(() => result.current.settings.setLeftHanded(true));

      const expectedX = padding - (5 - 1) * fretInterval - fretInterval + dotIn - fretWidth / 2;
      expect(result.current.shape.x(padding, 2, 5, 0)).toBe(expectedX);
    });

    test('left-handed open string (fret 0) mirrors the fret position', () => {
      const { result } = renderShape();
      act(() => result.current.settings.toggleOrientation());
      act(() => result.current.settings.setLeftHanded(true));

      const expectedX = padding + dotOut - fretWidth / 2;
      expect(result.current.shape.x(padding, 2, 0, 0)).toBe(expectedX);
    });
  });

  test('applies the offset argument on top of the base position', () => {
    const { result } = renderShape();

    const withoutOffset = result.current.shape.x(padding, 2, 5, 0);
    const withOffset = result.current.shape.x(padding, 2, 5, 40);

    expect(withOffset).toBe(withoutOffset + 40);
  });
});
