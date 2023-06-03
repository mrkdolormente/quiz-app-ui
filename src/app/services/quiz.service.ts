import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, QuizResult } from '../models/quiz.model';
import { QUESTIONS } from '../constants/questions';
import { Recommendation } from '../models/recommendation.model';
import { SCORE_RANGES } from '../constants/score';
import { RECOMMENDATIONS } from '../constants/recommendations';
import { ScoreCategory, ScoreRange } from '../models/score.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  /**
   * @returns randomize questions list
   */
  getQuestions(): Observable<Question[]> {
    const questionList = [...QUESTIONS];

    questionList.sort(() => Math.random() - 0.5);

    return of(questionList);
  }

  /**
   * @description compute user submitted answers
   * @param answer user answer properties
   * @returns computed result of the quiz
   */
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

    const result = {
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      percentage,
      totalItems,
      category: scoreCategory,
      recommendations: this.getRecommendations(scoreCategory),
    };

    localStorage.setItem(
      environment.quizResultStorageKey,
      JSON.stringify(result)
    );

    return of(result);
  }

  /**
   * @description get all the recommended courses based on score category
   * @param category - score category ex. low
   * @returns array of recommended
   */
  getRecommendations(category: ScoreCategory): Recommendation[] {
    return RECOMMENDATIONS.filter(
      (recommendation) => recommendation.category === category
    );
  }

  /**
   * @descrption get the applicable score range based on the percentage
   * @param percentage user average score
   * @returns score range
   */
  getScoreRange(percentage: number): ScoreRange | undefined {
    return SCORE_RANGES.find(
      (range) => range.min <= percentage && range.max >= percentage
    );
  }
}
