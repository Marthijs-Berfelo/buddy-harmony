import { withMinDelay } from '../delay';

describe('withMinDelay', () => {
  test('resolves with the original value', async () => {
    const result = await withMinDelay(Promise.resolve('value'), 0);
    expect(result).toBe('value');
  });

  test('waits for the minimum delay even when the promise resolves immediately', async () => {
    const start = Date.now();
    await withMinDelay(Promise.resolve('value'), 50);
    expect(Date.now() - start).toBeGreaterThanOrEqual(45);
  });

  test('does not wait longer than the promise when it resolves after the minimum delay', async () => {
    const slowPromise = new Promise<string>((resolve) => setTimeout(() => resolve('slow'), 30));
    const result = await withMinDelay(slowPromise, 0);
    expect(result).toBe('slow');
  });
});
