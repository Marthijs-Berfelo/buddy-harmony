import { act, renderHook } from '@testing-library/react';
import { EventEmitter } from 'events';
import { I18nextProvider } from 'react-i18next';
import { useLanguage } from '../use-language';

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
    loadNamespaces: () => {},
  };
  return fakeI18n;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const withI18n = (fakeI18n: FakeI18n) => (children: React.ReactNode) => (
  <I18nextProvider i18n={fakeI18n as any}>{children}</I18nextProvider>
);

describe('useLanguage', () => {
  test('derives the selected language from an already-resolved i18n language', () => {
    const fakeI18n = createFakeI18n('nl-NL', 'nl-NL');

    const { result } = renderHook(() => useLanguage(), {
      wrapper: ({ children }) => withI18n(fakeI18n)(children),
    });

    expect(result.current.selectedLanguage).toBe('NL');
    expect(result.current.countries).toEqual(['US', 'GB', 'NL']);
  });

  test('picks up the resolved language via languageChanged event when resolution happens after mount', () => {
    // i18next's language detector resolves `language` synchronously (e.g. from
    // localStorage/navigator), but `resolvedLanguage` stays undefined until the
    // HttpBackend finishes loading translations for it — this is the realistic
    // "not yet resolved" state the languageChanged listener is meant to cover.
    const fakeI18n = createFakeI18n('en-US');

    const { result } = renderHook(() => useLanguage(), {
      wrapper: ({ children }) => withI18n(fakeI18n)(children),
    });

    act(() => {
      fakeI18n.emit('languageChanged', 'nl-NL');
    });

    expect(result.current.selectedLanguage).toBe('NL');
    expect(fakeI18n.language).toBe('nl-NL');
  });

  test('calls changeLanguage with the mapped locale code when a new language is selected', () => {
    const fakeI18n = createFakeI18n('en-US', 'en-US');
    const changeLanguageSpy = vi.spyOn(fakeI18n, 'changeLanguage');

    const { result } = renderHook(() => useLanguage(), {
      wrapper: ({ children }) => withI18n(fakeI18n)(children),
    });

    act(() => {
      result.current.onSelectLanguage('NL');
    });

    expect(changeLanguageSpy).toHaveBeenCalledWith('nl-NL');
  });

  test('restores the original browser language on unmount', () => {
    const fakeI18n = createFakeI18n('en-US', 'en-US');
    const changeLanguageSpy = vi.spyOn(fakeI18n, 'changeLanguage');

    const { unmount } = renderHook(() => useLanguage(), {
      wrapper: ({ children }) => withI18n(fakeI18n)(children),
    });

    // Unmount triggers the cleanup, which restores the original browser language.
    unmount();
    expect(changeLanguageSpy).toHaveBeenCalledWith('en-US');
  });
});