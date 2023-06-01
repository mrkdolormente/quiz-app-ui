import { createFeature } from '@ngrx/store';
import { quizReducer } from './quiz.reducers';

export const quizFeature = createFeature({
  name: 'quiz',
  reducer: quizReducer,
});
