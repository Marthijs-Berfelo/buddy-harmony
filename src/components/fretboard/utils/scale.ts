export interface ScaleModel {
  fretzNumber: number;
  info: ScaleFret[][];
  tuning: string[];
}

export interface ScaleFret {
  note: string;
  noteEnharmonic: string;
  freet: number;
  isPartOfScale: boolean;
  scalePosition: number;
}
