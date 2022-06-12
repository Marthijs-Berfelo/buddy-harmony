import assert from 'assert-ts';
import { DiagramStyle } from './diagram-style';

export const COLORS_DEFAULT = {
  fretColor: '',
  fretOpacity: '',
};

export const STYLES: { [key: string]: DiagramStyle } = {
  // @ts-ignore
  def: {
    paddingTop: 40,
    paddingRight: 15,
    paddingBottom: 30,
    paddingLeft: 70,
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
    paddingLeft: 2,
    paddingRight: 1,
    paddingTop: 2,
    paddingBottom: 1,
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
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 3,
    paddingBottom: 2,
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
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 3,
    paddingBottom: 2,
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
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 3,
    paddingBottom: 2,
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
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 3,
    paddingBottom: 2,
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
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 3,
    paddingBottom: 2,
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
    paddingLeft: 4,
    paddingRight: 2,
    paddingTop: 3,
    paddingBottom: 2,
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
    paddingLeft: 10,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
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
