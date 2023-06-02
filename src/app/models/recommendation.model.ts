import { ScoreCategory } from './score.model';

export interface Recommendation {
  key: string;
  category: ScoreCategory;
  text: string;
  content: {
    course: Array<string>;
    exam: Array<string>;
  };
}
