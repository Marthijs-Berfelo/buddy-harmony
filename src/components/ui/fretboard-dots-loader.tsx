import type { JSX } from 'react';
import { cn } from '@/lib/utils';
import './fretboard-dots-loader.css';

const DOT_POSITIONS = [
  { left: '5%', top: '5%', delay: 0 },
  { left: '55%', top: '30%', delay: 0.4 },
  { left: '30%', top: '55%', delay: 0.8 },
  { left: '75%', top: '75%', delay: 1.2 },
];

export const FretboardDotsLoader = (): JSX.Element => {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="status"
      aria-label="loading"
    >
      <div className="relative aspect-4/3 w-56 sm:w-72 md:w-80">
        <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={`cell-${index}`}
              className={cn(
                index % 4 !== 3 && 'border-r-2 border-gray-300',
                index < 12 && 'border-b-2 border-gray-300'
              )}
            />
          ))}
        </div>
        {DOT_POSITIONS.map((dot, index) => (
          <span
            key={`dot-${index}`}
            data-testid="fret-dot"
            className="animate-fretpulse absolute aspect-square w-[11%] rounded-full bg-blue-500"
            style={{ left: dot.left, top: dot.top, animationDelay: `${dot.delay}s` }}
          />
        ))}
      </div>
    </div>
  );
};
