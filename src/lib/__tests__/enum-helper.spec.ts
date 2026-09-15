import { enumKeyByValue } from '../enum-helper';

enum Fixture {
  FOO = 'foo',
  BAR = 'bar',
}

enum NumericFixture {
  ONE = 1,
  TWO = 2,
}

describe('enumKeyByValue', () => {
  test('returns the key matching a string enum value', () => {
    expect(enumKeyByValue(Fixture, 'bar')).toBe('BAR');
  });

  test('returns the key matching a numeric enum value', () => {
    expect(enumKeyByValue(NumericFixture, 2)).toBe('TWO');
  });

  test('returns an empty string when no key matches the value', () => {
    expect(enumKeyByValue(Fixture, 'missing')).toBe('');
  });
});
