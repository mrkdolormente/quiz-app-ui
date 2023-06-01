import { ScoreRange } from '../models/score.model';

export const SCORE_RANGES: ScoreRange[] = [
  {
    category: 'low',
    min: 0,
    max: 50,
  },
  {
    category: 'average',
    min: 51,
    max: 80,
  },
  {
    category: 'high',
    min: 81,
    max: 100,
  },
];
