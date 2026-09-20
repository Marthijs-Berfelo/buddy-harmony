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
    test('renders one dot per fretted note across all shapes', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape, aShape],
      });

      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(9);
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
      expect(circles).toHaveLength(3);
      expect(circles.every((circle) => circle.classList.contains('stroke-blue-700'))).toBe(true);
      expect(circles.some((circle) => circle.classList.contains('stroke-red-700'))).toBe(false);
    });

    test('renders the actual note text for each fretted position, in dedupe order', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape, aShape],
      });

      const texts = Array.from(container.querySelectorAll('text')).map((el) => el.textContent);
      // cShape contributes its 3 fretted strings first (string 1 fret 3, string 2 fret
      // 2, string 4 fret 1), then aShape's 6 fretted strings, in fret-array order.
      expect(texts).toEqual(['C3', 'E3', 'C4', 'A2', 'E3', 'A3', 'Db4', 'E4', 'A4']);
    });

    test('skips muted and open strings entirely', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
      });

      // cShape mutes string 0 and leaves strings 3 and 5 open, so only the 3 fretted
      // strings (1, 2, 4) should produce a dot — not 6.
      const circles = container.querySelectorAll('circle');
      expect(circles).toHaveLength(3);

      const texts = Array.from(container.querySelectorAll('text')).map((el) => el.textContent);
      expect(texts).toEqual(['C3', 'E3', 'C4']);
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
      // Default (right-handed): C3 (string 1), E3 (string 2), C4 (string 4) — dedupe
      // order — with cx driven by string index and cy driven by fret (vertical axis).
      expect(dotsOf(defaultContainer)).toEqual([
        { note: 'C3', cx: '212', cy: '404' },
        { note: 'E3', cx: '272', cy: '304' },
        { note: 'C4', cx: '392', cy: '204' },
      ]);

      const { container: leftHandedContainer } = renderLeftHandedScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
      });
      // Under leftHanded, onStrings/onStringNotes reverse the 6-string array, so each
      // dot's cx moves to its mirrored string index while cy (fret-driven) stays tied
      // to the correct note — asserting both catches a reverted `onStrings(...)` call
      // (which would corrupt cy and misclassify the open string as fretted) as well as
      // a hypothetical x/y swap.
      expect(dotsOf(leftHandedContainer)).toEqual([
        { note: 'C4', cx: '212', cy: '204' },
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

      // `useDirectional.onStrings` reverses on `orientation === HORIZONTAL || leftHanded`
      // (directional.ts:19), so horizontal-without-left-handed hits the same string
      // reversal as the left-handed case above (note order C4/E3/C3, not C3/E3/C4) —
      // but the swapped x/y axis formulas for HORIZONTAL orientation still produce
      // distinct cx/cy values from the left-handed-but-vertical case.
      expect(dotsOf(horizontalContainer)).toEqual([
        { note: 'C4', cx: '204', cy: '212' },
        { note: 'E3', cx: '304', cy: '332' },
        { note: 'C3', cx: '404', cy: '392' },
      ]);
    });
  });
});
