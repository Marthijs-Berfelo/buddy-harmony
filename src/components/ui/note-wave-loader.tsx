import type { JSX } from 'react';
import './note-wave-loader.css';

const GLYPHS = ['♪', '♫', '♪'];
const DELAY_STEP_S = 0.15;

const NoteWaveLoader = (): JSX.Element => {
  return (
    <span className="inline-flex items-center gap-1" role="status" aria-label="loading">
      {GLYPHS.map((glyph, index) => (
        <span
          key={`note-${index}`}
          data-testid="note-wave-glyph"
          className="animate-note-wave inline-block"
          style={{ animationDelay: `${index * DELAY_STEP_S}s` }}
        >
          {glyph}
        </span>
      ))}
    </span>
  );
};

export default NoteWaveLoader;
