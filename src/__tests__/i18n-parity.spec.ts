import commonEn from '../../public/locales/en/common.json';
import commonNl from '../../public/locales/nl/common.json';
import chordEn from '../../public/locales/en/chord.json';
import chordNl from '../../public/locales/nl/chord.json';
import scaleEn from '../../public/locales/en/scale.json';
import scaleNl from '../../public/locales/nl/scale.json';
import settingsEn from '../../public/locales/en/settings.json';
import settingsNl from '../../public/locales/nl/settings.json';

type JsonRecord = { [key: string]: string | JsonRecord };

const flattenKeys = (value: JsonRecord, prefix = ''): string[] =>
  Object.entries(value).flatMap(([key, nested]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof nested === 'string' ? [path] : flattenKeys(nested, path);
  });

const namespaces: [string, JsonRecord, JsonRecord][] = [
  ['common', commonEn, commonNl],
  ['chord', chordEn, chordNl],
  ['scale', scaleEn, scaleNl],
  ['settings', settingsEn, settingsNl],
];

describe('translation key parity', () => {
  test.each(namespaces)('en and nl expose the same keys for %s', (_ns, en, nl) => {
    expect(flattenKeys(nl).sort()).toEqual(flattenKeys(en).sort());
  });
});
