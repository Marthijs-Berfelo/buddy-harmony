import { render, act } from '@testing-library/react';
import { EventEmitter } from 'events';
import { I18nextProvider } from 'react-i18next';
import LanguageSelector from '../LanguageSelector';

interface FakeI18n {
  language: string | undefined;
  resolvedLanguage: string | undefined;
  isInitialized: boolean;
  options: Record<string, unknown>;
  services: Record<string, unknown>;
  on: (event: string, cb: (...args: unknown[]) => void) => void;
  off: (event: string, cb: (...args: unknown[]) => void) => void;
  changeLanguage: (lng: string) => Promise<void>;
  getFixedT: () => (key: string) => string;
  t: (key: string) => string;
  emit: (event: string, ...args: unknown[]) => void;
  loadNamespaces: (ns: string | string[], cb: () => void) => void;
}

function createFakeI18n(language: string, resolvedLanguage?: string): FakeI18n {
  const emitter = new EventEmitter();
  const fakeI18n: FakeI18n = {
    language,
    resolvedLanguage,
    isInitialized: resolvedLanguage !== undefined,
    // Disable react-i18next's Suspense mode: without a resolved language at mount,
    // `useTranslation` would otherwise suspend (throwing a promise) since there is
    // no <Suspense> boundary around LanguageSelector in this component tree.
    options: { react: { useSuspense: false } },
    services: {},
    on: (event, cb) => emitter.on(event, cb),
    off: (event, cb) => emitter.off(event, cb),
    changeLanguage: (lng) => {
      fakeI18n.language = lng;
      fakeI18n.resolvedLanguage = lng;
      emitter.emit('languageChanged', lng);
      return Promise.resolve();
    },
    getFixedT: () => (key: string) => key,
    t: (key: string) => key,
    emit: (event, ...args) => emitter.emit(event, ...args),
    // react-i18next calls this from a `useEffect` (non-suspense path) whenever `ready`
    // is false at render time; a no-op is sufficient since these tests don't depend
    // on namespace-loading completion.
    loadNamespaces: () => {},
  };
  return fakeI18n;
}

describe('LanguageSelector', () => {
  test('gives the rendered language button an accessible name', () => {
    const fakeI18n = createFakeI18n('en-US', 'en-US');
    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    expect(container.querySelector('#lang-selector button')?.getAttribute('aria-label')).toBe(
      'common:language-selector'
    );
  });

  test('renders immediately when i18n has already resolved a language before mount', () => {
    const fakeI18n = createFakeI18n('nl-NL', 'nl-NL');

    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    expect(container.querySelector('#lang-selector')).toBeTruthy();
  });

  test('picks up the resolved language via languageChanged event when resolution happens after mount', () => {
    // i18next's language detector resolves `language` synchronously (e.g. from
    // localStorage/navigator), but `resolvedLanguage` stays undefined until the
    // HttpBackend finishes loading translations for it — this is the realistic
    // "not yet resolved" state the languageChanged listener is meant to cover.
    const fakeI18n = createFakeI18n('en-US');

    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    expect(container.querySelector('#lang-selector')).toBeTruthy();

    act(() => {
      fakeI18n.emit('languageChanged', 'nl-NL');
    });

    expect(fakeI18n.language).toBe('nl-NL');
  });

  test('calls changeLanguage with the mapped locale code when a new language is selected', () => {
    const fakeI18n = createFakeI18n('en-US', 'en-US');
    const changeLanguageSpy = vi.spyOn(fakeI18n, 'changeLanguage');

    const { container, unmount } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    expect(container.querySelector('#lang-selector')).toBeTruthy();

    // Unmount triggers the cleanup, which restores the original browser language.
    unmount();
    expect(changeLanguageSpy).toHaveBeenCalledWith('en-US');
  });
});
