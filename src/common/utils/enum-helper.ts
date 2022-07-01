// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const enumKeyByValue = (enumObject: any, value: number | string): string => {
  const keys = Object.keys(enumObject).filter((key) => enumObject[key] === value);
  return keys.length > 0 ? keys[0] : '';
};
