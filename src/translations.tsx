import React, { PropsWithChildren } from 'react';
import i18n, { TFunction } from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';

i18n
  .use(I18NextHttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

function TranslationsProvider({ children }: PropsWithChildren): JSX.Element {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { TranslationsProvider, type TFunction, useTranslation };
