import { Question, QuizResult } from '../../models/quiz.model';

export type ActionStatusState = 'initial' | 'pending' | 'done' | 'failed';

export interface QuizState {
  activeQuestionIndex: number;
  status: ActionStatusState;
  questions: Question[];
  error: string | null;
  result: QuizResult | null;
}
