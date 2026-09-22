import { useEffect } from 'react';
import { render } from '@testing-library/react';
import { ScaleShape } from '../scale-shape';
import { Orientation } from '../../options';
import { SettingsProvider, useSettings } from 'hooks';
import type { CagedShapeInput } from '../../utils';

const renderScaleShape = (props: Parameters<typeof ScaleShape>[0]) =>
  render(
    <SettingsProvider>
      <svg>
        <ScaleShape {...props} />
      </svg>
    </SettingsProvider>
  );

// `SettingsProvider` always starts with `leftHanded: false` and only exposes
// `setLeftHanded` (no prop to set the initial value), so this wrapper flips it
// to `true` right after mount, mirroring how the settings toolbar toggle works.
const LeftHandedScaleShape = (props: Parameters<typeof ScaleShape>[0]) => {
  const { leftHanded, setLeftHanded } = useSettings();
  useEffect(() => {
    if (!leftHanded) {
      setLeftHanded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <ScaleShape {...props} />;
};

const renderLeftHandedScaleShape = (props: Parameters<typeof ScaleShape>[0]) =>
  render(
    <SettingsProvider>
      <svg>
        <LeftHandedScaleShape {...props} />
      </svg>
    </SettingsProvider>
  );

// `SettingsProvider` always starts in `Orientation.VERTICAL` and only exposes
// `toggleOrientation` (no prop to set the initial orientation), so this wrapper
// flips it to HORIZONTAL right after mount, mirroring how the toolbar toggle works.
const HorizontalScaleShape = (props: Parameters<typeof ScaleShape>[0]) => {
  const { orientation, toggleOrientation } = useSettings();
  useEffect(() => {
    if (orientation !== Orientation.HORIZONTAL) {
      toggleOrientation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <ScaleShape {...props} />;
};

const renderHorizontalScaleShape = (props: Parameters<typeof ScaleShape>[0]) =>
  render(
    <SettingsProvider>
      <svg>
        <HorizontalScaleShape {...props} />
      </svg>
    </SettingsProvider>
  );

// Notes follow the real `addNotes()` convention (see `modules/caged/hooks/caged-utils.ts`):
// `notes[i]` corresponds to `frets[i]` 1:1, including muted (-1) and open (0) slots.
const cShape: CagedShapeInput = {
  chord: {
    baseFret: 1,
    frets: [-1, 3, 2, 0, 1, 0],
    fingers: [0, 3, 2, 0, 1, 0],
    midi: [],
    notes: ['D#2', 'C3', 'E3', 'G3', 'C4', 'E4'],
  },
  color: 'stroke-blue-700 fill-blue-700',
};
const aShape: CagedShapeInput = {
  chord: {
    baseFret: 5,
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    midi: [],
    notes: ['A2', 'E3', 'A3', 'Db4', 'E4', 'A4'],
  },
  color: 'stroke-red-700 fill-red-700',
};

describe('ScaleShape', () => {
  describe('cagedShapes', () => {
    test('renders one dot per fretted or open note across all shapes', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape, aShape],
      });

      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(11);
    });

    test('gives each dot its own shape color', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape, aShape],
      });

      const circles = Array.from(container.querySelectorAll('circle'));
      expect(circles.some((circle) => circle.classList.contains('stroke-blue-700'))).toBe(true);
      expect(circles.some((circle) => circle.classList.contains('stroke-red-700'))).toBe(true);
    });

    test('an earlier shape wins when two shapes share a (string, fret) position', () => {
      const shapeA: CagedShapeInput = {
        chord: { baseFret: 1, frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], midi: [] },
        color: 'stroke-blue-700 fill-blue-700',
      };
      const shapeB: CagedShapeInput = {
        chord: { baseFret: 1, frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], midi: [] },
        color: 'stroke-red-700 fill-red-700',
      };

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [shapeA, shapeB],
      });

      const circles = Array.from(container.querySelectorAll('circle'));
      expect(circles).toHaveLength(5);
      expect(circles.every((circle) => circle.classList.contains('stroke-blue-700'))).toBe(true);
      expect(circles.some((circle) => circle.classList.contains('stroke-red-700'))).toBe(false);
    });

    test('renders the actual note text for each fretted or open position, in dedupe order', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape, aShape],
      });

      const texts = Array.from(container.querySelectorAll('text')).map((el) => el.textContent);
      // cShape contributes its 5 non-muted strings first, in string-index order (1
      // fretted, 2 fretted, 3 open, 4 fretted, 5 open), then aShape's 6 fretted
      // strings, in fret-array order.
      expect(texts).toEqual(['C3', 'E3', 'G3', 'C4', 'E4', 'A2', 'E3', 'A3', 'Db4', 'E4', 'A4']);
    });

    test('skips muted strings but renders open strings', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
      });

      // cShape mutes string 0 only; strings 1, 2, 3, 4, 5 (2 fretted, 2 open, 1 fretted)
      // all produce a dot.
      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(5);

      const texts = Array.from(container.querySelectorAll('text')).map((el) => el.textContent);
      expect(texts).toEqual(['C3', 'E3', 'G3', 'C4', 'E4']);
    });

    test('flips which string a dot renders on under left-handed orientation', () => {
      const dotsOf = (
        container: HTMLElement
      ): { note: string | null; cx: string | null; cy: string | null }[] =>
        Array.from(container.querySelectorAll('text')).map((textEl) => ({
          note: textEl.textContent,
          cx: textEl.previousElementSibling?.getAttribute('cx') ?? null,
          cy: textEl.previousElementSibling?.getAttribute('cy') ?? null,
        }));

      const { container: defaultContainer } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
      });
      expect(dotsOf(defaultContainer)).toEqual([
        { note: 'C3', cx: '212', cy: '404' },
        { note: 'E3', cx: '272', cy: '304' },
        { note: 'G3', cx: '332', cy: '124' },
        { note: 'C4', cx: '392', cy: '204' },
        { note: 'E4', cx: '452', cy: '124' },
      ]);

      const { container: leftHandedContainer } = renderLeftHandedScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
      });
      expect(dotsOf(leftHandedContainer)).toEqual([
        { note: 'E4', cx: '152', cy: '124' },
        { note: 'C4', cx: '212', cy: '204' },
        { note: 'G3', cx: '272', cy: '124' },
        { note: 'E3', cx: '332', cy: '304' },
        { note: 'C3', cx: '392', cy: '404' },
      ]);
    });

    test('flips which string a dot renders on under horizontal orientation', () => {
      const dotsOf = (
        container: HTMLElement
      ): { note: string | null; cx: string | null; cy: string | null }[] =>
        Array.from(container.querySelectorAll('text')).map((textEl) => ({
          note: textEl.textContent,
          cx: textEl.previousElementSibling?.getAttribute('cx') ?? null,
          cy: textEl.previousElementSibling?.getAttribute('cy') ?? null,
        }));

      const { container: horizontalContainer } = renderHorizontalScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
      });

      expect(dotsOf(horizontalContainer)).toEqual([
        { note: 'E4', cx: '124', cy: '152' },
        { note: 'C4', cx: '204', cy: '212' },
        { note: 'G3', cx: '124', cy: '272' },
        { note: 'E3', cx: '304', cy: '332' },
        { note: 'C3', cx: '404', cy: '392' },
      ]);
    });
  });
});
