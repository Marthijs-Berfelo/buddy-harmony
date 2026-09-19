import { useEffect } from 'react';
import { render } from '@testing-library/react';
import { Diagram } from '../diagram';
import { DotText, FretNumberPosition, Orientation } from '../../options';
import { SettingsProvider, useSettings } from 'hooks';
import * as gs from 'guitar-scales';
import type { ScaleModel } from '../../options';

const renderDiagram = (props: Parameters<typeof Diagram>[0]) =>
  render(
    <SettingsProvider>
      <Diagram {...props} />
    </SettingsProvider>
  );

// `SettingsProvider` always starts in `Orientation.VERTICAL` and only exposes
// `toggleOrientation` (no prop to set the initial orientation), so this wrapper
// flips it to HORIZONTAL right after mount, mirroring how the toolbar toggle works.
const HorizontalDiagram = (props: Parameters<typeof Diagram>[0]) => {
  const { orientation, toggleOrientation } = useSettings();
  useEffect(() => {
    if (orientation !== Orientation.HORIZONTAL) {
      toggleOrientation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Diagram {...props} />;
};

const renderHorizontalDiagram = (props: Parameters<typeof Diagram>[0]) =>
  render(
    <SettingsProvider>
      <HorizontalDiagram {...props} />
    </SettingsProvider>
  );

describe('Diagram', () => {
  test('renders a chord diagram', () => {
    const { container } = renderDiagram({
      className: 'flex',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      chord: {
        frets: [-1, 3, 2, 0, 1, 0],
        fingers: [0, 3, 2, 0, 1, 0],
        baseFret: 1,
        midi: [],
      },
    });

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toMatchSnapshot();
  });

  test('renders a scale diagram', () => {
    const scaleModel = gs.GuitarScale.get('C', 'major') as ScaleModel;
    const { container } = renderDiagram({
      className: 'flex',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      scale: scaleModel,
    });

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toMatchSnapshot();
  });

  test('renders a chord diagram without a nut (barre chord)', () => {
    const { container } = renderDiagram({
      className: 'flex',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      chord: {
        frets: [1, 3, 3, 3, 1, 1],
        fingers: [1, 3, 4, 4, 1, 1],
        baseFret: 3,
        midi: [],
      },
    });

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toMatchSnapshot();
  });

  test('renders a chord diagram without a nut (barre chord) in horizontal orientation', () => {
    const { container } = renderHorizontalDiagram({
      className: 'flex',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      chord: {
        frets: [1, 3, 3, 3, 1, 1],
        fingers: [1, 3, 4, 4, 1, 1],
        baseFret: 3,
        midi: [],
      },
    });

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toMatchSnapshot();
  });
});
