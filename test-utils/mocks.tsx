import React, { PropsWithChildren } from 'react';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';

interface MockLibraries {
  gsMock: typeof jest;
  fretboardApi: typeof jest;
}

export function mockLibraries(): MockLibraries {
  const gsMock = jest.doMock('guitar-scales');
  const fretboardApi = jest.doMock('fretboard-api');
  return {
    gsMock,
    fretboardApi,
  };
}

export function mockI18Next() {
  jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate hook can use it without a warning being shown
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    useTranslation: (ns?: string | string[]) => {
      return {
        t: (str: string) => str,
        i18n: {
          // eslint-disable-next-line @typescript-eslint/no-empty-function
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
