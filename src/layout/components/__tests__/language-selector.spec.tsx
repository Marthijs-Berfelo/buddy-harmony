import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventEmitter } from 'events';
import { I18nextProvider } from 'react-i18next';
import { LanguageSelector } from '../language-selector';

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

function createFakeI18n(
  language: string,
  resolvedLanguage?: string,
  // Keyed by language so `t` can reflect a language switch without a real
  // translation backend; only used by tests that need per-language strings.
  translationsByLanguage?: Record<string, Record<string, string>>
): FakeI18n {
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
    t: (key: string) => translationsByLanguage?.[fakeI18n.language ?? '']?.[key] ?? key,
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

  test('renders when the resolved language is not yet available at mount', () => {
    const fakeI18n = createFakeI18n('en-US');

    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    expect(container.querySelector('#lang-selector')).toBeTruthy();
  });

  test('gives each dropdown option an accessible name when opened', async () => {
    const fakeI18n = createFakeI18n('en-US', 'en-US');
    const user = userEvent.setup();

    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    const button = container.querySelector('#lang-selector button');
    expect(button).toBeTruthy();
    await user.click(button as HTMLButtonElement);

    const options = container.querySelectorAll('#lang-selector li[role="option"]');
    expect(options.length).toBe(3);
    options.forEach((option) => {
      const countryCode = option.id.split('-').pop();
      expect(option.getAttribute('aria-label')).toBe(`common:language-option.${countryCode}`);
    });
  });

  test('labels options that appear after the dropdown reopens', async () => {
    // The <li role="option"> elements only exist in the DOM while the dropdown
    // is open. Opening, closing, and reopening exercises the MutationObserver
    // path (rather than only the initial-mount labeling pass) since the nodes
    // are removed and recreated on each open.
    const fakeI18n = createFakeI18n('en-US', 'en-US');
    const user = userEvent.setup();

    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    const button = container.querySelector('#lang-selector button') as HTMLButtonElement;
    await user.click(button); // open
    await user.click(button); // close
    await user.click(button); // reopen

    const options = container.querySelectorAll('#lang-selector li[role="option"]');
    expect(options.length).toBe(3);
    options.forEach((option) => {
      const countryCode = option.id.split('-').pop();
      expect(option.getAttribute('aria-label')).toBe(`common:language-option.${countryCode}`);
    });
  });

  test('re-labels the button and open options when the active language changes', async () => {
    // Regression test for a real bug: the labeling effect used to read translations
    // via the `t` from `useTranslation`, a snapshot that only updates once
    // `useTranslation`'s own internal listener has processed `languageChanged` — but
    // that listener firing doesn't guarantee this effect reruns, since the resulting
    // `setSelectedLanguage` call was often a no-op (state unchanged) that React skips
    // re-rendering for. Labels would then stay stuck on the language active at the
    // last dropdown open. The fix reads via `i18n.t` directly and listens to
    // `languageChanged` itself, so relabeling no longer depends on a React re-render.
    const fakeI18n = createFakeI18n('en-US', 'en-US', {
      'en-US': {
        'common:language-selector': 'Select language',
        'common:language-option.US': 'English (US)',
      },
      'nl-NL': {
        'common:language-selector': 'Taal selecteren',
        'common:language-option.US': 'Engels (VS)',
      },
    });
    const user = userEvent.setup();

    const { container } = render(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <I18nextProvider i18n={fakeI18n as any}>
        <LanguageSelector />
      </I18nextProvider>
    );

    const button = container.querySelector('#lang-selector button') as HTMLButtonElement;
    await user.click(button); // open, so the US option is present to re-label

    expect(button.getAttribute('aria-label')).toBe('Select language');

    await act(async () => {
      await fakeI18n.changeLanguage('nl-NL');
    });

    expect(button.getAttribute('aria-label')).toBe('Taal selecteren');
    const usOption = container.querySelector('#lang-selector li[id$="US"]');
    expect(usOption?.getAttribute('aria-label')).toBe('Engels (VS)');
  });
});
