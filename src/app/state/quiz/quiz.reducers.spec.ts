import { quizReducer, initialQuizConfiguration } from './quiz.reducers';
import * as QuizActions from './quiz.actions';
import { QUESTIONS } from 'src/app/constants/questions';
import { QuizResult } from 'src/app/models/quiz.model';

describe('Quiz Reducer', () => {
  it('should return the initial state', () => {
    const action = {} as any;
    const state = quizReducer(undefined, action);

    expect(state).toBe(initialQuizConfiguration);
  });

  it('should clear quiz data', () => {
    const action = QuizActions.clearQuizData();
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state).toBe(initialQuizConfiguration);
  });

  it('should set status to "pending" when fetching question list', () => {
    const action = QuizActions.fetchQuestionList();
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state.status).toBe('pending');
  });

  it('should set status to "done" when fetching question list success', () => {
    const mockQuestions = QUESTIONS;

    const action = QuizActions.fetchQuestionListSuccess({
      questions: mockQuestions,
    });
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state.status).toBe('done');
  });

  it('should set status to "error" when fetching question list failed', () => {
    const action = QuizActions.fetchQuestionListFailed({
      error: 'mockError',
    });
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state.status).toBe('failed');
  });

  it('should set active question index', () => {
    const action = QuizActions.setActiveQuestionIndex({
      index: 1,
    });
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state.activeQuestionIndex).toBe(1);
  });

  it('should increment question index', () => {
    const currentState = {
      ...initialQuizConfiguration,
      activeQuestionIndex: 0,
    };

    const action = QuizActions.incrementQuestionIndex();
    const state = quizReducer(currentState, action);

    expect(state.activeQuestionIndex).toBe(1);
  });

  it('should set status to "pending" when submitting quiz answers', () => {
    const mockQuizAnswer = {
      1: 2,
      2: 4,
    };
    const action = QuizActions.submitQuizAnswers({ answers: mockQuizAnswer });
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state.status).toBe('pending');
  });

  it('should set status to "done" when submitting quiz answers success', () => {
    const mockResult: QuizResult = {
      correctAnswers: 0,
      wrongAnswers: 0,
      percentage: 0,
      recommendations: [],
      totalItems: 10,
      category: 'low',
    };

    const action = QuizActions.submitQuizAnswersSuccess({
      result: mockResult,
    });
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state.status).toBe('done');
  });

  it('should set status to "error" when submitting quiz answers success', () => {
    const action = QuizActions.submitQuizAnswersFailed({
      error: 'mockError',
    });
    const state = quizReducer(initialQuizConfiguration, action);

    expect(state.status).toBe('failed');
  });
});
