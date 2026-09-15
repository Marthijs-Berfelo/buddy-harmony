import { reportWebVitals } from '../report-web-vitals';

vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
  onINP: vi.fn(),
}));

describe('reportWebVitals', () => {
  test('registers the handler with every web-vitals metric when given a function', async () => {
    const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals');
    const handler = vi.fn();

    reportWebVitals(handler);

    expect(onCLS).toHaveBeenCalledWith(handler);
    expect(onFCP).toHaveBeenCalledWith(handler);
    expect(onLCP).toHaveBeenCalledWith(handler);
    expect(onTTFB).toHaveBeenCalledWith(handler);
    expect(onINP).toHaveBeenCalledWith(handler);
  });

  test('does nothing when no handler is given', async () => {
    const { onCLS } = await import('web-vitals');
    vi.mocked(onCLS).mockClear();

    reportWebVitals();

    expect(onCLS).not.toHaveBeenCalled();
  });
});
