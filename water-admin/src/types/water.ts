export interface WaterItem {
  value: number;
  level: string;
  score: number;
}

export interface WaterScore {
  score: number;
  level: string;
  abnormal: boolean;

  ph: WaterItem;
  tds: WaterItem;
  turbidity: WaterItem;
}

export interface WaterData {

  code: number;

  time: string;

  score: WaterScore;

  data: Array<{
    time: string;
    ph: number;
    tds: number;
    turbidity: number;
  }>;
}