export interface ScaleModel {
  fretzNumber: number;
  info: Map<number, Map<number, ScaleFret>>;
  tuning: string[];
}

export interface ScaleFret {
  note: string;
  noteEnharmonic: string;
  freet: number;
  isPartOfScale: boolean;
  scalePosition: number;
}
