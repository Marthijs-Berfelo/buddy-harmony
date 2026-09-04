import type { JSX } from 'react';

const DOT_POSITIONS = [
  { left: '5%', top: '5%', delay: 0 },
  { left: '55%', top: '30%', delay: 0.4 },
  { left: '30%', top: '55%', delay: 0.8 },
  { left: '75%', top: '75%', delay: 1.2 },
];

const FretboardDotsLoader = (): JSX.Element => {
  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-label="loading"
      style={{ height: '160px' }}
    >
      <div style={{ position: 'relative', width: '130px', height: '90px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
          }}
        >
          {Array.from({ length: 16 }, (_, index) => (
            <div
              key={`cell-${index}`}
              style={{
                borderRight: index % 4 !== 3 ? '2px solid #d1d5db' : undefined,
                borderBottom: index < 12 ? '2px solid #d1d5db' : undefined,
              }}
            />
          ))}
        </div>
        {DOT_POSITIONS.map((dot, index) => (
          <span
            key={`dot-${index}`}
            data-testid="fret-dot"
            style={{
              position: 'absolute',
              width: '14px',
              height: '14px',
              background: '#3b82f6',
              borderRadius: '50%',
              left: dot.left,
              top: dot.top,
              animation: 'fretpulse 1.6s ease-in-out infinite',
              animationDelay: `${dot.delay}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes fretpulse {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default FretboardDotsLoader;
