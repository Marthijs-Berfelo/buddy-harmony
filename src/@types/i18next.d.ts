import common from '../../public/locales/nl/common.json';
import chord from '../../public/locales/nl/chord.json';
import scale from '../../public/locales/nl/scale.json';
import settings from '../../public/locales/nl/settings.json';

const resources = {
  common,
  chord,
  scale,
  settings,
} as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources;
    returnNull: false;
    nsSeparator: ':';
  }
}
