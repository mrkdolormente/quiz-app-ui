import { createReducer, on } from '@ngrx/store';
import { QuizState } from './quiz.state';
import * as QuizActions from './quiz.actions';

export const initialQuizConfiguration: QuizState = {
  activeQuestionIndex: 0,
  status: 'initial',
  questions: [],
  error: null,
  result: null,
};

export const quizReducer = createReducer<QuizState>(
  initialQuizConfiguration,
  on(QuizActions.clearQuizData, (): QuizState => initialQuizConfiguration),
  on(
    QuizActions.fetchQuestionList,
    (state): QuizState => ({
      ...state,
      status: 'pending',
    })
  ),
  on(
    QuizActions.fetchQuestionListSuccess,
    (state, { questions }): QuizState => ({
      ...state,
      status: 'done',
      questions,
    })
  ),
  on(
    QuizActions.fetchQuestionListFailed,
    (state, { error }): QuizState => ({
      ...state,
      status: 'failed',
      error,
    })
  ),
  on(
    QuizActions.setActiveQuestionIndex,
    (state, { index }): QuizState => ({
      ...state,
      activeQuestionIndex: index,
    })
  ),
  on(QuizActions.incrementQuestionIndex, (state): QuizState => {
    return {
      ...state,
      activeQuestionIndex: state.activeQuestionIndex + 1,
    };
  }),
  on(
    QuizActions.submitQuizAnswers,
    (state): QuizState => ({
      ...state,
      status: 'pending',
    })
  ),
  on(
    QuizActions.submitQuizAnswersSuccess,
    (state, { result }): QuizState => ({
      ...state,
      status: 'done',
      result,
    })
  ),
  on(
    QuizActions.submitQuizAnswersFailed,
    (state, { error }): QuizState => ({
      ...state,
      status: 'failed',
      error,
    })
  )
);
