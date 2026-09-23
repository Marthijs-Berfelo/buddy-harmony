import { useEffect } from 'react';
import { render } from '@testing-library/react';
import { Diagram } from '../diagram';
import { DotText, FretNumberPosition, Orientation } from '../../options';
import { ChordPosition, SettingsProvider, useSettings } from 'hooks';
import * as gs from 'guitar-scales';
import type { ScaleModel } from '../../options';
import type { CagedShapeInput } from '../../utils';

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

  test('renders a multi-shape CAGED overlay spanning fret 0 to the last shape max fret', () => {
    const cShapeOverlay: CagedShapeInput = {
      chord: { baseFret: 1, frets: [-1, 3, 2, 0, 1, 0] } as ChordPosition,
      color: 'stroke-blue-700 fill-blue-700',
    };
    const aShapeOverlay: CagedShapeInput = {
      chord: { baseFret: 5, frets: [1, 3, 3, 2, 1, 1] } as ChordPosition,
      color: 'stroke-red-700 fill-red-700',
    };
    const { container } = renderDiagram({
      className: 'some-class',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      cagedShapes: [cShapeOverlay, aShapeOverlay],
    });

    expect(container.querySelectorAll('circle')).toHaveLength(11);
    expect(container).toMatchSnapshot();
  });

  test('renders open-string dots and falls back to a single fret when a shape has no fretted note', () => {
    const mutedShapeOverlay: CagedShapeInput = {
      chord: { baseFret: 1, frets: [-1, 0, 0, 0, -1, 0] } as ChordPosition,
      color: 'stroke-blue-700 fill-blue-700',
    };
    const { container } = renderDiagram({
      className: 'some-class',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      cagedShapes: [mutedShapeOverlay],
    });

    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelectorAll('circle')).toHaveLength(4);
  });

  test('renders merged CAGED+scale dots when both cagedShapes and scaleModel are provided', () => {
    const cShapeOverlay: CagedShapeInput = {
      chord: { baseFret: 1, frets: [-1, 3, 2, 0, 1, 0] } as ChordPosition,
      color: 'stroke-blue-700 fill-blue-700',
    };
    const scaleModel = gs.GuitarScale.get('C', 'major') as ScaleModel;

    const { container } = renderDiagram({
      className: 'some-class',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      cagedShapes: [cShapeOverlay],
      scaleModel,
      showTriads: true,
    });

    // The CAGED chord-tone dots from cShapeOverlay, plus at least one merged scale-only dot.
    expect(container.querySelectorAll('circle').length).toBeGreaterThan(5);
  });

  test('renders CAGED-only overlay unchanged when scaleModel is omitted', () => {
    const cShapeOverlay: CagedShapeInput = {
      chord: { baseFret: 1, frets: [-1, 3, 2, 0, 1, 0] } as ChordPosition,
      color: 'stroke-blue-700 fill-blue-700',
    };

    const { container } = renderDiagram({
      className: 'some-class',
      text: DotText.NOTE,
      fretNumbersPosition: FretNumberPosition.LEFT,
      cagedShapes: [cShapeOverlay],
    });

    expect(container.querySelectorAll('circle')).toHaveLength(5);
  });
});
