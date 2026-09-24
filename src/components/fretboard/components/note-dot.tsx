import type { JSX } from 'react';
import { Fragment } from 'react';

export interface NoteDotProps {
  cx: number;
  cy: number;
  radius: number;
  strokeWidth: number;
  className: string;
  strokeClassName: string;
  fillClassName: string;
  emphasisStrokeClassName?: string;
  emphasisFillClassName?: string;
  isRoot?: boolean;
  isTriad?: boolean;
  glowFilterId?: string;
}

const EMPHASIS_RADIUS_FACTOR = 1.05;
const HALO_RADIUS_FACTOR = 1.35;
const EMPHASIS_STROKE_WIDTH_FACTOR = 2;

export const NoteDot = ({
  cx,
  cy,
  radius,
  strokeWidth,
  className,
  strokeClassName,
  fillClassName,
  emphasisStrokeClassName,
  emphasisFillClassName,
  isRoot,
  isTriad,
  glowFilterId,
}: NoteDotProps): JSX.Element => {
  const hasEmphasisColors = !!emphasisStrokeClassName && !!emphasisFillClassName;
  const showHalo = !!isTriad && hasEmphasisColors;
  const showEnlarged = !!isRoot && hasEmphasisColors;
  const useEmphasisColors = showHalo || showEnlarged;

  const dotRadius = showEnlarged ? radius * EMPHASIS_RADIUS_FACTOR : radius;
  const dotStrokeWidth = useEmphasisColors ? strokeWidth * EMPHASIS_STROKE_WIDTH_FACTOR : strokeWidth;
  const dotStrokeClassName = useEmphasisColors ? (emphasisStrokeClassName as string) : strokeClassName;
  const dotFillClassName = useEmphasisColors ? (emphasisFillClassName as string) : fillClassName;

  return (
    <g filter={showHalo && glowFilterId ? `url(#${glowFilterId})` : undefined}>
      {showHalo && (
        <Fragment>
          <circle
            cx={cx}
            cy={cy}
            r={radius * HALO_RADIUS_FACTOR}
            strokeWidth={strokeWidth * EMPHASIS_STROKE_WIDTH_FACTOR}
            className={`${className} fill-none ${emphasisStrokeClassName}`}
          />
        </Fragment>
      )}
      <circle
        cx={cx}
        cy={cy}
        r={dotRadius}
        strokeWidth={dotStrokeWidth}
        className={`${className} ${dotFillClassName} ${dotStrokeClassName}`}
      />
    </g>
  );
};
