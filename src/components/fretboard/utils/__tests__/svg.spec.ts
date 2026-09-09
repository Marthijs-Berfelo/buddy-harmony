import { horizontalLine, verticalLine } from '../svg';

describe('svg', () => {
  test('horizontalLine draws from the vertical center of the stroke width', () => {
    expect(horizontalLine(10, 20, 100, 4)).toBe('M 10,22 h 100');
  });

  test('verticalLine draws from the horizontal center of the stroke width', () => {
    expect(verticalLine(10, 20, 100, 4)).toBe('M 12,20 v 100');
  });
});
