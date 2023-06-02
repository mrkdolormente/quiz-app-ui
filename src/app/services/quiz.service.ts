import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, QuizResult } from '../models/quiz.model';
import { QUESTIONS } from '../constants/questions';
import { Recommendation } from '../models/recommendation.model';
import { SCORE_RANGES } from '../constants/score';
import { RECOMMENDATIONS } from '../constants/recommendations';
import { ScoreCategory, ScoreRange } from '../models/score.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  getQuestions(): Observable<Question[]> {
    const questionList = [...QUESTIONS];

    questionList.sort(() => Math.random() - 0.5);

    return of(questionList);
  }

  submitQuizAnwers(answer: { [key: number]: number }): Observable<QuizResult> {
    const correctAnswers = QUESTIONS.filter(
      (question) => question.answerKey === answer[question.key]
    );

    const totalItems = QUESTIONS.length;
    const correctCount = correctAnswers.length;
    const wrongCount = totalItems - correctCount;
    const percentage = (correctCount / totalItems) * 100;

    const scoreRange = this.getScoreRange(percentage);
    const scoreCategory = scoreRange?.category || 'low';

    return of({
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      percentage,
      totalItems,
      category: scoreCategory,
      recommendations: this.getRecommendations(scoreCategory),
    });
  }

  getRecommendations(category: ScoreCategory): Recommendation[] {
    return RECOMMENDATIONS.filter(
      (recommendation) => recommendation.category === category
    );
  }

  getScoreRange(percentage: number): ScoreRange | undefined {
    return SCORE_RANGES.find(
      (range) => range.min <= percentage && range.max >= percentage
    );
  }
}
