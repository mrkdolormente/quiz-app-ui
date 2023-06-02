import { Recommendation } from './recommendation.model';
import { ScoreCategory } from './score.model';

export interface QuizResult {
  correctAnswers: number;
  wrongAnswers: number;
  percentage: number;
  recommendations: Recommendation[];
  totalItems: number;
  category: ScoreCategory;
}

export interface Question {
  key: number;
  text: string;
  options: QuestionOption[];
  answerKey: number;
}

export interface QuestionOption {
  key: number;
  text: string;
}

export interface Answer {
  key: number;
  questionKey: number;
}
