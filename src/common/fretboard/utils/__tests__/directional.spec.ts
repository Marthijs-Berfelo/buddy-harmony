import { renderHook } from '@testing-library/react';
import { useDirectional } from '../directional';
import { Orientation } from '../../options';

describe('useDirectional', () => {
  describe('onStrings', () => {
    test('reverses positions for horizontal orientation', () => {
      const { result } = renderHook(() =>
        useDirectional<number, number>({ orientation: Orientation.HORIZONTAL, leftHanded: false })
      );

      expect(result.current.onStrings([1, 2, 3])).toEqual([3, 2, 1]);
    });

    test('reverses positions for left-handed vertical orientation', () => {
      const { result } = renderHook(() =>
        useDirectional<number, number>({ orientation: Orientation.VERTICAL, leftHanded: true })
      );

      expect(result.current.onStrings([1, 2, 3])).toEqual([3, 2, 1]);
    });

    test('keeps original order for right-handed vertical orientation', () => {
      const { result } = renderHook(() =>
        useDirectional<number, number>({ orientation: Orientation.VERTICAL, leftHanded: false })
      );

      expect(result.current.onStrings([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('does not mutate the input array', () => {
      const { result } = renderHook(() =>
        useDirectional<number, number>({ orientation: Orientation.HORIZONTAL, leftHanded: false })
      );
      const input = [1, 2, 3];

      result.current.onStrings(input);

      expect(input).toEqual([1, 2, 3]);
    });
  });

  describe('onFrets', () => {
    test('reverses positions only for left-handed horizontal orientation', () => {
      const { result } = renderHook(() =>
        useDirectional<number, number>({ orientation: Orientation.HORIZONTAL, leftHanded: true })
      );

      expect(result.current.onFrets([1, 2, 3])).toEqual([3, 2, 1]);
    });

    test('keeps original order for right-handed horizontal orientation', () => {
      const { result } = renderHook(() =>
        useDirectional<number, number>({ orientation: Orientation.HORIZONTAL, leftHanded: false })
      );

      expect(result.current.onFrets([1, 2, 3])).toEqual([1, 2, 3]);
    });

    test('keeps original order for left-handed vertical orientation', () => {
      const { result } = renderHook(() =>
        useDirectional<number, number>({ orientation: Orientation.VERTICAL, leftHanded: true })
      );

      expect(result.current.onFrets([1, 2, 3])).toEqual([1, 2, 3]);
    });
  });
});
