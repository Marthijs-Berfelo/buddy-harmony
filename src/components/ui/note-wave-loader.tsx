import type { JSX } from 'react';

const GLYPHS = ['♪', '♫', '♪'];
const DELAY_STEP_S = 0.15;

const NoteWaveLoader = (): JSX.Element => {
  return (
    <span className="inline-flex items-center gap-1" role="status" aria-label="loading">
      {GLYPHS.map((glyph, index) => (
        <span
          key={`note-${index}`}
          data-testid="note-wave-glyph"
          style={{
            display: 'inline-block',
            animation: 'note-wave 1s ease-in-out infinite',
            animationDelay: `${index * DELAY_STEP_S}s`,
          }}
        >
          {glyph}
        </span>
      ))}
      <style>{`
        @keyframes note-wave {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </span>
  );
};

export default NoteWaveLoader;
