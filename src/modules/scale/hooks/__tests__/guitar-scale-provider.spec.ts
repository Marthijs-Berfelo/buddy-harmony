import { act, renderHook } from '@testing-library/react';
import { createElement, PropsWithChildren } from 'react';
import { GuitarScaleProvider, useGuitarScale } from '../guitar-scale-provider';
import { Orientation } from 'components/fretboard/options';

const wrapper = ({ children }: PropsWithChildren) =>
  createElement(GuitarScaleProvider, null, children);

const renderGuitarScale = () => renderHook(() => useGuitarScale(), { wrapper });

describe('useGuitarScale', () => {
  test('exposes the full list of scale names with no key or scale selected initially', () => {
    const { result } = renderGuitarScale();

    expect(result.current.scales.length).toBeGreaterThan(0);
    expect(result.current.selectedKey).toBeUndefined();
    expect(result.current.scale).toBeUndefined();
    expect(result.current.scaleModel).toBeUndefined();
  });

  test('leaves scaleModel undefined when only a key is selected', () => {
    const { result } = renderGuitarScale();

    act(() => result.current.setSelectedKey('C'));

    expect(result.current.scaleModel).toBeUndefined();
  });

  test('leaves scaleModel undefined when only a scale is selected', () => {
    const { result } = renderGuitarScale();

    act(() => result.current.setScale(result.current.scales[0]));

    expect(result.current.scaleModel).toBeUndefined();
  });

  test('computes scaleModel once both a key and a scale are selected', () => {
    const { result } = renderGuitarScale();

    act(() => result.current.setSelectedKey('C'));
    act(() => result.current.setScale('major'));

    expect(result.current.scaleModel).toBeDefined();
  });

  test('returns a print style string for the given orientation', () => {
    const { result } = renderGuitarScale();

    expect(result.current.printStyle(Orientation.VERTICAL)).toContain('@page');
  });
});
