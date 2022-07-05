import { test_export } from '../caged-utils';
const { keyRoot } = test_export

describe('Caged Utils', () => {
  const keyRootCases = [
    ['C', 0, 'C3'],
    ['C#', 0, 'C#3'],
    ['D', 0, 'D3'],
    ['Eb', 0, 'Eb3'],
    ['E', 0, 'E2'],
    ['F', 0, 'F2'],
    ['F#', 0, 'F#2'],
    ['G', 0, 'G2'],
    ['Ab', 0, 'Ab2'],
    ['A', 0, 'A2'],
    ['Bb', 0, 'Bb2'],
    ['B', 0, 'B2'],
    ['C', 1, 'C3'],
    ['C#', 1, 'C#3'],
    ['D', 1, 'D3'],
    ['Eb', 1, 'Eb3'],
    ['E', 1, 'E3'],
    ['F', 1, 'F3'],
    ['F#', 1, 'F#3'],
    ['G', 1, 'G3'],
    ['Ab', 1, 'Ab3'],
    ['A', 1, 'A2'],
    ['Bb', 1, 'Bb2'],
    ['B', 1, 'B2'],
    ['C', 2, 'C4'],
    ['C#', 2, 'C#4'],
    ['D', 2, 'D4'],
    ['Eb', 2, 'Eb3'],
    ['E', 2, 'E3'],
    ['F', 2, 'F3'],
    ['F#', 2, 'F#3'],
    ['G', 2, 'G3'],
    ['Ab', 2, 'Ab3'],
    ['A', 2, 'A3'],
    ['Bb', 2, 'Bb3'],
    ['B', 2, 'B3'],
  ];

  test.each(keyRootCases)('should root key %s on string %i as %s', (key, string, expected) => {
    expect(keyRoot(key.toString(), string as number)).toEqual(expected);
  });
});

