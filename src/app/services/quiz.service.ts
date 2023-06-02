import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, QuizResult } from '../models/quiz.model';
import { QUESTIONS } from '../constants/questions';
import { Recommendation } from '../models/recommendation.model';
import { SCORE_RANGES } from '../constants/score';
import { RECOMMENDATIONS } from '../constants/recommendations';

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

    return of({
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      percentage,
      totalItems,
      recommendations: this.getRecommendations(percentage),
    });
  }

  getRecommendations(average: number): Recommendation[] {
    const range = SCORE_RANGES.find(
      (range) => range.min <= average && range.max >= average
    );

    return RECOMMENDATIONS.filter(
      (recommendation) => recommendation.category === range?.category
    );
  }
}
