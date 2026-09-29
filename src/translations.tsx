import type { JSX } from 'react';
import { PropsWithChildren } from 'react';
import i18n, { TFunction } from 'i18next';
import HttpBackend from 'i18next-http-backend';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { I18nextProvider, initReactI18next, useTranslation } from 'react-i18next';

const HELP_NAMESPACE_PREFIX = 'help-';

function isHelpNamespaceRequest(namespaces: string[]): boolean {
  return namespaces.every((ns) => ns.startsWith(HELP_NAMESPACE_PREFIX));
}

i18n
  .use(HttpBackend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: (_languages: string[], namespaces: string[]) => {
        const extension = isHelpNamespaceRequest(namespaces) ? 'md' : 'json';
        return `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.${extension}`;
      },
      parse: (data: string, _languages?: string | string[], namespaces?: string | string[]) => {
        const nsList = Array.isArray(namespaces) ? namespaces : [namespaces ?? ''];
        if (isHelpNamespaceRequest(nsList)) {
          return { content: data };
        }
        return JSON.parse(data);
      },
    },
    fallbackLng: ['nl', 'en'],
    lng: 'nl',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err) => console.error('i18next init failed:', err));

function TranslationsProvider({ children }: PropsWithChildren): JSX.Element {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { TranslationsProvider, type TFunction, useTranslation };
