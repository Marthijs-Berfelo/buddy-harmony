import { act, renderHook } from '@testing-library/react';
import { useKeys } from '../use-keys';
import { keys } from '../constants';

describe('useKeys', () => {
  test('exposes the full list of keys with no key selected initially', () => {
    const { result } = renderHook(() => useKeys());

    expect(result.current.keys).toBe(keys);
    expect(result.current.selectedKey).toBeUndefined();
  });

  test('updates the selected key', () => {
    const { result } = renderHook(() => useKeys());

    act(() => {
      result.current.setSelectedKey('D');
    });

    expect(result.current.selectedKey).toBe('D');
  });
});
