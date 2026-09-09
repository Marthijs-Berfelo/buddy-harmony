export const withMinDelay = <T>(promise: Promise<T>, delayMs: number): Promise<T> =>
  Promise.all([promise, new Promise((resolve) => setTimeout(resolve, delayMs))]).then(
    ([result]) => result
  );
