import { createSelector } from '@ngrx/store';
import { quizFeature } from './quiz.feature';

export const { selectQuestions, selectActiveQuestionIndex, selectResult } =
  quizFeature;

export const selectActiveQuestion = createSelector(
  selectActiveQuestionIndex,
  selectQuestions,
  (index, questions) => questions[index] ?? null
);

export const selectQuestionsCount = createSelector(
  selectQuestions,
  (questions) => questions.length
);
