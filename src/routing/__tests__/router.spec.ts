import { router } from '../router';
import { Pages } from '../pages';

describe('router', () => {
  test('registers a route for scale, chord, and caged pages plus a catch-all redirect', () => {
    const [root] = router.routes;
    const paths = root.children?.map((route) => route.path);

    expect(paths).toEqual(expect.arrayContaining([Pages.SCALE, Pages.CHORD, Pages.CAGED, '*']));
  });
});
