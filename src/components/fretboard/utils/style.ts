import assert from 'assert-ts';
import { DiagramStyle } from './diagram-style';

export const COLORS_DEFAULT = {
  fretColor: '',
  fretOpacity: '',
};

export const STYLES: { [key: string]: DiagramStyle } = {
  // @ts-ignore
  def: {
    padding: 40,
    stringInterval: 60,
    stringWidth: 4,
    fretInterval: 100,
    fretWidth: 4,
    dotIn: 50,
    dotOut: 30,
    dotRadius: 20,
    dotStroke: 2,
    fontSize: 17,
  },
  // @ts-ignore
  test1: {
    padding: 2,
    stringInterval: 2,
    stringWidth: 1,
    fretInterval: 2,
    fretWidth: 1,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
  // @ts-ignore
  test2: {
    padding: 4,
    stringInterval: 4,
    stringWidth: 1,
    fretInterval: 4,
    fretWidth: 1,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
  // @ts-ignore
  test3: {
    padding: 4,
    stringInterval: 4,
    stringWidth: 3,
    fretInterval: 4,
    fretWidth: 3,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
  // @ts-ignore
  test4: {
    padding: 4,
    stringInterval: 6,
    stringWidth: 3,
    fretInterval: 6,
    fretWidth: 3,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
  // @ts-ignore
  test5: {
    padding: 4,
    stringInterval: 6,
    stringWidth: 2,
    fretInterval: 6,
    fretWidth: 2,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
  // @ts-ignore
  test6: {
    padding: 4,
    stringInterval: 6,
    stringWidth: 2,
    fretInterval: 6,
    fretWidth: 4,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
  // @ts-ignore
  test7: {
    padding: 4,
    stringInterval: 6,
    stringWidth: 4,
    fretInterval: 6,
    fretWidth: 2,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
  // @ts-ignore
  test8: {
    padding: 10,
    stringInterval: 7,
    stringWidth: 2,
    fretInterval: 7,
    fretWidth: 2,
    dotIn: 5,
    dotOut: 5,
    dotRadius: 5,
    fontSize: 1,
  },
};

export const getStyle = (layout: string): DiagramStyle => {
  assert(STYLES.hasOwnProperty(layout));
  return STYLES[layout];
};
