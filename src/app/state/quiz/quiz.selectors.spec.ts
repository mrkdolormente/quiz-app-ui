import { QUESTIONS } from '../../constants/questions';
import { QuizState } from './quiz.state';
import { selectActiveQuestion, selectQuestionsCount } from './quiz.selectors';

describe('Quiz Selectors', () => {
  const mockState: QuizState = {
    questions: QUESTIONS,
    activeQuestionIndex: 1,
    status: 'initial',
    error: null,
    result: null,
  };

  describe('selectActiveQuestion', () => {
    it('should return the active question', () => {
      const result = selectActiveQuestion.projector(
        mockState.activeQuestionIndex,
        mockState.questions
      );
      expect(result).toEqual(
        mockState.questions[mockState.activeQuestionIndex]
      );
    });

    it('should return null if no active question found', () => {
      const result = selectActiveQuestion.projector(-1, mockState.questions);

      expect(result).toBeNull();
    });
  });

  describe('selectQuestionsCount', () => {
    it('should return the total count of questions', () => {
      const result = selectQuestionsCount.projector(mockState.questions);

      expect(result).toBe(mockState.questions.length);
    });
  });
});
