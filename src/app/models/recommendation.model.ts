import { ScoreCategory } from './score.model';

export interface Recommendation {
  key: string;
  category: ScoreCategory;
  text: string;
}
