import { createAction, props, union } from '@ngrx/store';
import { Question, QuizResult } from 'src/app/models/quiz.model';

export const clearQuizData = createAction('[Quiz] Clear Quiz Data');

export const fetchQuestionList = createAction('[Quiz] Fetch Question List');
export const fetchQuestionListSuccess = createAction(
  '[Quiz] Fetch Question List Success',
  props<{ questions: Question[] }>()
);
export const fetchQuestionListFailed = createAction(
  '[Quiz] Fetch Question List Failed',
  props<{ error: string }>()
);

export const incrementQuestionIndex = createAction(
  '[Quiz] Increment Quiestion Index'
);

export const setActiveQuestionIndex = createAction(
  '[Quiz] Set Active Question Index',
  props<{ index: number }>()
);

export const submitQuizAnswers = createAction(
  '[Quiz] Submit Quiz Answer',
  props<{ answers: { [key: number]: number } }>()
);

export const submitQuizAnswersSuccess = createAction(
  '[Quiz] Submit Quiz Answer Success',
  props<{ result: QuizResult }>()
);

export const submitQuizAnswersFailed = createAction(
  '[Quiz] Submit Quiz Answer Failed',
  props<{ error: string }>()
);

const quizActions = union({
  clearQuizData,
  incrementQuestionIndex,
  setActiveQuestionIndex,
  submitQuizAnswers,
});

export type QuizActions = typeof quizActions;
