export type ScoreCategory = 'low' | 'average' | 'high';

export interface ScoreRange {
  category: ScoreCategory;
  min: number;
  max: number;
}
