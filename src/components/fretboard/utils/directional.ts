import { Orientation } from '../options';

interface DirectionalHook<STRING, FRET> {
  onStrings: (positions: STRING[]) => STRING[];
  onFrets: (positions: FRET[]) => FRET[];
}

interface DirectionalProps {
  leftHanded: boolean;
  orientation: Orientation;
}

export function useDirectional<STRING, FRET>({
  orientation,
  leftHanded,
}: DirectionalProps): DirectionalHook<STRING, FRET> {
  function onStrings(positions: STRING[]): STRING[] {
    const original = [...positions];
    if (orientation === Orientation.HORIZONTAL || leftHanded) {
      return [...original.reverse()];
    }
    return original;
  }

  function onFrets(positions: FRET[]): FRET[] {
    const original = [...positions];
    if (orientation === Orientation.HORIZONTAL && leftHanded) {
      return [...original.reverse()];
    }
    return original;
  }

  return { onStrings, onFrets };
}
