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
  emphasized?: boolean;
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
  emphasized,
  glowFilterId,
}: NoteDotProps): JSX.Element => {
  const isEmphasized = !!emphasized && !!emphasisStrokeClassName && !!emphasisFillClassName;
  const dotRadius = isEmphasized ? radius * EMPHASIS_RADIUS_FACTOR : radius;
  const dotStrokeWidth = isEmphasized ? strokeWidth * EMPHASIS_STROKE_WIDTH_FACTOR : strokeWidth;
  const dotStrokeClassName = isEmphasized ? (emphasisStrokeClassName as string) : strokeClassName;
  const dotFillClassName = isEmphasized ? (emphasisFillClassName as string) : fillClassName;

  return (
    <g filter={isEmphasized && glowFilterId ? `url(#${glowFilterId})` : undefined}>
      {isEmphasized && (
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
