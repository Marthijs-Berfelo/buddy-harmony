import { CAGED_SCALE_SHORTLIST } from '../caged-constants';
import * as gs from 'guitar-scales';

describe('CAGED_SCALE_SHORTLIST', () => {
  test('has exactly the three chord-suffix keys used by CAGED chords', () => {
    expect(Object.keys(CAGED_SCALE_SHORTLIST).sort()).toEqual(['7', 'major', 'minor']);
  });

  test('every listed scale name is a real guitar-scales name', () => {
    const names = gs.GuitarScale.getNames();
    Object.values(CAGED_SCALE_SHORTLIST)
      .flat()
      .forEach((scaleName) => {
        expect(names).toContain(scaleName);
      });
  });

  test('major suffix defaults to the major scale', () => {
    expect(CAGED_SCALE_SHORTLIST.major[0]).toBe('major');
  });

  test('minor suffix defaults to aeolian', () => {
    expect(CAGED_SCALE_SHORTLIST.minor[0]).toBe('aeolian');
  });

  test('7 suffix defaults to mixolydian', () => {
    expect(CAGED_SCALE_SHORTLIST['7'][0]).toBe('mixolydian');
  });
});
