import { QuizService } from './quiz.service';
import { of } from 'rxjs';
import { QUESTIONS } from '../constants/questions';
import { RECOMMENDATIONS } from '../constants/recommendations';
import { SCORE_RANGES } from '../constants/score';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    service = new QuizService();
  });

  it('should get questions', () => {
    spyOn(Math, 'random').and.returnValue(0.5);

    service.getQuestions().subscribe((questions) => {
      expect(questions).toEqual(QUESTIONS);
    });
  });

  it('should get quiz result', () => {
    const recommendations = service.getRecommendations('low');

    service.submitQuizAnwers({ 1: 2 }).subscribe((questions) => {
      expect(questions).toEqual({
        correctAnswers: 0,
        wrongAnswers: 0,
        percentage: 0,
        totalItems: 10,
        category: 'low',
        recommendations: recommendations,
      });
    });
  });
});
