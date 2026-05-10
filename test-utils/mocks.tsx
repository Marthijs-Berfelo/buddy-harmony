import type { JSX } from 'react';
import { PropsWithChildren } from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { vi } from 'vitest';

interface MockLibraries {
  gsMock: ReturnType<typeof vi.fn>;
  fretboardApi: ReturnType<typeof vi.fn>;
}

export function mockLibraries(): MockLibraries {
  return {
    gsMock: vi.fn(),
    fretboardApi: vi.fn(),
  };
}

export function mockI18Next() {
  vi.mock('react-i18next', () => ({
    useTranslation: (ns?: string | string[]) => {
      void ns;
      return {
        t: (str: string) => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
  }));
}

export function TranslationsProviderProviderMock({ children }: PropsWithChildren): JSX.Element {
  i18n.init();
  i18n.languages = ['nl'];
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
