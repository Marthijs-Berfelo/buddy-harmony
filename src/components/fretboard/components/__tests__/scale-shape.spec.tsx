import { useEffect } from 'react';
import { render } from '@testing-library/react';
import { ScaleShape } from '../scale-shape';
import { DotText, Orientation, ScaleFret } from '../../options';
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
  color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
};
const aShape: CagedShapeInput = {
  chord: {
    baseFret: 5,
    frets: [1, 3, 3, 2, 1, 1],
    fingers: [1, 3, 4, 2, 1, 1],
    midi: [],
    notes: ['A2', 'E3', 'A3', 'Db4', 'E4', 'A4'],
  },
  color: { strokeClassName: 'stroke-red-700', fillClassName: 'fill-red-700' },
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
        color: { strokeClassName: 'stroke-blue-700', fillClassName: 'fill-blue-700' },
      };
      const shapeB: CagedShapeInput = {
        chord: { baseFret: 1, frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], midi: [] },
        color: { strokeClassName: 'stroke-red-700', fillClassName: 'fill-red-700' },
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

    test('emphasizes root/3rd/5th dots with a halo when a rootNote and showTriads are given, with no scale selected', () => {
      // cShape's notes (C3, E3, G3, C4, E4) are all root/3rd/5th of root C, so every dot
      // renders via the emphasized (NoteDot halo) path — 2 circles per dot instead of 1.
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        rootNote: 'C',
        showTriads: true,
      });

      expect(container.querySelectorAll('circle')).toHaveLength(10);
    });

    test('does not emphasize dots when showTriads is false, even with a rootNote', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        rootNote: 'C',
        showTriads: false,
      });

      expect(container.querySelectorAll('circle')).toHaveLength(5);
    });

    test('does not emphasize dots when rootNote is omitted, even with showTriads true', () => {
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        showTriads: true,
      });

      expect(container.querySelectorAll('circle')).toHaveLength(5);
    });

    test('enlarges root dots even when showTriads is false, with no scale selected', () => {
      // cShape's C3/C4 notes share chroma with root C — both must render via NoteDot's
      // enlarged (isRoot) path even though showTriads is false, giving 2 root dots at
      // r=23 among the 5 total circles (no halo circles, since isTriad never fires here).
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        rootNote: 'C',
        showTriads: false,
      });

      const circles = Array.from(container.querySelectorAll('circle'));
      expect(circles).toHaveLength(5);
      const enlargedCircles = circles.filter((circle) => circle.getAttribute('r') === '23');
      expect(enlargedCircles).toHaveLength(2);
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

  describe('merged cagedShapes + scale', () => {
    const scaleFret = (overrides: Partial<ScaleFret>): ScaleFret => ({
      note: 'C',
      noteEnharmonic: 'C',
      freet: 0,
      isPartOfScale: true,
      scalePosition: 1,
      ...overrides,
    });

    test('renders both CAGED chord-tone dots and merged scale-only dots', () => {
      // cShape (frets [-1, 3, 2, 0, 1, 0], baseFret 1) produces 5 CAGED dots
      // (strings 1-5; its own isolated fret range spans 0-3). A scale-only
      // triad tone at array index 5 (visual string 0, fret 3) is not covered
      // by cShape and falls inside its [0, 3] range, so it merges in as an
      // emphasized dot owned by cShape's color.
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 5, note: 'G' })],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      // 5 CAGED dots (cShape's fretted/open strings, 1 circle each) + the
      // merged emphasized dot's 2 circles (halo + fill via NoteDot).
      expect(container.querySelectorAll('circle')).toHaveLength(5 + 2);
      expect(container.querySelector('text')?.textContent).toBeDefined();
    });

    test('gives an emphasized merged dot the owning shape color and a halo', () => {
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 5, note: 'G' })],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      const emphasizedCircles = Array.from(container.querySelectorAll('circle')).filter((circle) =>
        circle.classList.contains('stroke-blue-700')
      );
      // The emphasized dot renders 2 circles (halo + fill) via NoteDot, both carrying the
      // shape color (cShape's own plain CAGED dots also happen to share this color class,
      // so this is a lower bound rather than an exact count).
      expect(emphasizedCircles.length).toBeGreaterThanOrEqual(2);
    });

    test('gives a neutral merged dot the shared neutral color and no halo', () => {
      // scalePosition 2 is not a triad tone, so it falls back to the neutral color
      // regardless of whether it lies inside a CAGED shape's range.
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 2, scalePosition: 2, note: 'D' })],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      const neutralCircles = Array.from(container.querySelectorAll('circle')).filter((circle) =>
        circle.classList.contains('stroke-black')
      );
      expect(neutralCircles).toHaveLength(1);
    });

    test('renders a covered chord-tone dot at a triad position with the glow filter / halo present', () => {
      // cShape frets its (internal) string 1 at absolute fret 3 (note 'C3', a root/triad
      // tone). A scale-only entry at array index 4 maps to that same visual string/fret
      // and marks it scalePosition 1 (root) — the already-covered dot must gain emphasis
      // rather than a second dot being added.
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 1, note: 'C' })],
        [],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      // Still 5 CAGED dots total (no dot added for the covered position), but the emphasized
      // one now renders via NoteDot's halo + fill (2 circles) instead of a single plain circle.
      expect(container.querySelectorAll('circle')).toHaveLength(5 + 1);
    });

    test('enlarges a covered root chord-tone dot even when showTriads is false', () => {
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 1, note: 'C' })],
        [],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: false,
      });

      // Still 5 CAGED dots total, no halo (showTriads false), but the root dot is enlarged.
      expect(container.querySelectorAll('circle')).toHaveLength(5);
      const enlargedCircles = Array.from(container.querySelectorAll('circle')).filter(
        (circle) => circle.getAttribute('r') === '23'
      );
      expect(enlargedCircles).toHaveLength(1);
    });

    test('does not duplicate a dot already covered by a CAGED shape', () => {
      // cShape frets its (internal) string 1 at absolute fret 3. A scale-only entry
      // at array index 4 maps to that same visual string/fret via the
      // stringCount-1-index transform mergeCagedAndScaleDots uses, so it must be
      // skipped as already covered. scalePosition 2 (not a triad tone) keeps this test
      // focused on deduplication rather than the now-covered-triad-tone emphasis path
      // (see the dedicated `caged-dots.spec.ts` cases for that behavior).
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 2, note: 'E' })],
        [],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      // Only the 5 original CAGED dots — no extra dot added for the covered position.
      expect(container.querySelectorAll('circle')).toHaveLength(5);
    });

    test('renders a neutral scale-only dot as outline (fill-white + gray stroke), not solid gray fill', () => {
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 2, scalePosition: 2, note: 'D' })],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      const scaleOnlyCircle = Array.from(container.querySelectorAll('circle')).find((circle) =>
        circle.classList.contains('stroke-black')
      );
      expect(scaleOnlyCircle).toBeDefined();
      expect(scaleOnlyCircle?.classList.contains('fill-white')).toBe(true);
      expect(scaleOnlyCircle?.classList.contains('fill-black')).toBe(false);
    });

    test('renders an emphasized scale-only triad dot as outline (fill-white + owning stroke) with the glow halo, not a solid fill', () => {
      // string 0 fret 3 (scalePosition 5, a triad tone) is not fretted by cShape and falls
      // inside its own [0, 3] range, so it merges in as an emphasized scale-only dot owned
      // by cShape's blue color.
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 5, note: 'G' })],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      // The scale-only emphasized dot renders via NoteDot's halo branch: a halo circle
      // (fill-none) plus a fill circle — both stroked blue (cShape's owning color), neither
      // ever carrying the shape's solid fill-blue-700.
      const blueStrokedCircles = Array.from(container.querySelectorAll('circle')).filter(
        (circle) => circle.classList.contains('stroke-blue-700')
      );
      const scaleOnlyCircles = blueStrokedCircles.filter(
        (circle) => !circle.classList.contains('fill-blue-700')
      );
      expect(scaleOnlyCircles).toHaveLength(2);
      const haloCircle = scaleOnlyCircles.find((circle) => circle.classList.contains('fill-none'));
      const fillCircle = scaleOnlyCircles.find((circle) => circle.classList.contains('fill-white'));
      expect(haloCircle).toBeDefined();
      expect(fillCircle).toBeDefined();

      // The glow filter is still applied (halo/emphasis signature preserved).
      const glowGroup = container.querySelector('g[filter]');
      expect(glowGroup).not.toBeNull();
    });

    test('keeps a plain (non-triad) real CAGED chord-tone dot solid, unaffected by the scale-only outline change', () => {
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 2, note: 'E' })],
        [],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      const realDot = Array.from(container.querySelectorAll('circle')).find((circle) =>
        circle.classList.contains('stroke-blue-700')
      );
      expect(realDot).toBeDefined();
      expect(realDot?.classList.contains('fill-blue-700')).toBe(true);
      expect(realDot?.classList.contains('fill-white')).toBe(false);
    });

    test('keeps a covered+emphasized real CAGED chord-tone dot solid (fill+stroke), unaffected by the scale-only outline change', () => {
      // cShape frets its (internal) string 1 at absolute fret 3 — a real chord-tone dot. A
      // scale-only entry at array index 4 maps to that same visual string/fret and marks it
      // scalePosition 1 (root), so the already-covered dot gains emphasis but must keep its
      // solid fill+stroke since it's a real chord tone, not a scale-only overlay dot.
      const scale: ScaleFret[][] = [
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 3, scalePosition: 1, note: 'C' })],
        [],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        scale,
        text: DotText.NOTE,
        showTriads: true,
      });

      const strokedCircles = Array.from(container.querySelectorAll('circle')).filter((circle) =>
        circle.classList.contains('stroke-blue-700')
      );
      // NoteDot's emphasized branch renders 2 circles (halo + fill) for this covered dot.
      expect(strokedCircles.length).toBeGreaterThanOrEqual(1);
      const fillCircle = strokedCircles.find((circle) => circle.classList.contains('fill-blue-700'));
      expect(fillCircle).toBeDefined();
      expect(fillCircle?.classList.contains('fill-white')).toBe(false);
    });
  });

  describe('no-scale cagedDots() path is unaffected by the scale-only outline change', () => {
    test('renders every dot solid (fill+stroke), even when a rootNote/showTriads emphasizes some of them', () => {
      // Every note in cShape is a root/3rd/5th of root C, so all 5 dots render via the
      // emphasized (NoteDot halo) path — but since none of them are fromScale, they must
      // all keep their solid shape-color fill, never fill-white.
      const { container } = renderScaleShape({
        className: 'some-class',
        cagedShapes: [cShape],
        rootNote: 'C',
        showTriads: true,
      });

      const strokedCircles = Array.from(container.querySelectorAll('circle')).filter((circle) =>
        circle.classList.contains('stroke-blue-700')
      );
      expect(strokedCircles.length).toBeGreaterThan(0);
      strokedCircles.forEach((circle) => {
        expect(circle.classList.contains('fill-white')).toBe(false);
      });
      const solidFillCircles = strokedCircles.filter((circle) =>
        circle.classList.contains('fill-blue-700')
      );
      expect(solidFillCircles.length).toBeGreaterThan(0);
    });
  });

  describe('standalone scale rendering (no cagedShapes)', () => {
    const scaleFret = (overrides: Partial<ScaleFret>): ScaleFret => ({
      note: 'C',
      noteEnharmonic: 'C',
      freet: 0,
      isPartOfScale: true,
      scalePosition: 1,
      ...overrides,
    });

    test('enlarges the root dot without a halo, and haloes non-root triad dots without enlarging them', () => {
      const scale: ScaleFret[][] = [
        [scaleFret({ freet: 5, scalePosition: 5, note: 'G' })],
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 0, scalePosition: 1, note: 'C' })],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        scale,
        text: DotText.NOTE,
      });

      const circles = Array.from(container.querySelectorAll('circle'));
      // Root dot (scalePosition 1): enlarged (r=23), no halo circle for it.
      const rootCircle = circles.find((circle) => circle.getAttribute('r') === '23');
      expect(rootCircle).toBeDefined();
      // Non-root triad dot (scalePosition 5): halo (r=24) + normal-size fill (r=20).
      const haloCircle = circles.find((circle) => circle.getAttribute('r') === '24');
      expect(haloCircle).toBeDefined();
      const normalSizedTriadFill = circles.filter((circle) => circle.getAttribute('r') === '20');
      expect(normalSizedTriadFill).toHaveLength(1);
    });

    test('suppresses the triad halo when showTriads is false, while still enlarging the root dot', () => {
      const scale: ScaleFret[][] = [
        [scaleFret({ freet: 5, scalePosition: 5, note: 'G' })],
        [],
        [],
        [],
        [],
        [scaleFret({ freet: 0, scalePosition: 1, note: 'C' })],
      ];

      const { container } = renderScaleShape({
        className: 'some-class',
        scale,
        text: DotText.NOTE,
        showTriads: false,
      });

      const circles = Array.from(container.querySelectorAll('circle'));
      // Root dot (scalePosition 1) is still enlarged regardless of showTriads.
      const rootCircle = circles.find((circle) => circle.getAttribute('r') === '23');
      expect(rootCircle).toBeDefined();
      // Non-root triad dot (scalePosition 5) no longer haloes.
      const haloCircle = circles.find((circle) => circle.getAttribute('r') === '24');
      expect(haloCircle).toBeUndefined();
      expect(circles).toHaveLength(2);
    });
  });
});
