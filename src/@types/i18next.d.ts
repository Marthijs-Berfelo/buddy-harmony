import common from '../../public/locales/nl/common.json';
import chord from '../../public/locales/nl/chord.json';
import scale from '../../public/locales/nl/scale.json';
import settings from '../../public/locales/nl/settings.json';
import caged from '../../public/locales/nl/caged.json';

const resources = {
  common,
  chord,
  scale,
  settings,
  caged,
} as const;

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: typeof resources;
    returnNull: false;
    nsSeparator: ':';
  }
}
