import i18n from 'i18next';
import '../translations';

describe('translations i18next backend config', () => {
  const backendOptions = () =>
    (i18n.options.backend ?? {}) as {
      loadPath: (lngs: string[], namespaces: string[]) => string;
      parse: (
        data: string,
        languages?: string | string[],
        namespaces?: string | string[]
      ) => unknown;
    };

  test('resolves a help-* namespace to a .md path', () => {
    const { loadPath } = backendOptions();

    expect(loadPath(['en'], ['help-scale'])).toBe(
      `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.md`
    );
  });

  test('resolves a non-help namespace to a .json path, unaffected by the help change', () => {
    const { loadPath } = backendOptions();

    expect(loadPath(['en'], ['common'])).toBe(
      `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`
    );
  });

  test('parses help-* namespace payloads into a { content } object', () => {
    const { parse } = backendOptions();

    expect(parse('# Some heading\n\nBody text', 'en', ['help-general'])).toEqual({
      content: '# Some heading\n\nBody text',
    });
  });

  test('parses non-help namespace payloads as JSON, unaffected by the help change', () => {
    const { parse } = backendOptions();

    expect(parse('{"greeting":"hi"}', 'en', ['common'])).toEqual({ greeting: 'hi' });
  });
});
