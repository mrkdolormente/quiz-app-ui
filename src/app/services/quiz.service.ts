import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Question, QuizResult } from '../models/quiz.model';
import { QUESTIONS } from '../constants/questions';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor() {}

  getQuestions(): Observable<Question[]> {
    return of(QUESTIONS);
  }

  submitQuizAnwers(answer: { [key: number]: number }): Observable<QuizResult> {
    const correctAnswers = QUESTIONS.filter(
      (question) => question.answerKey === answer[question.key]
    );

    const totalItems = QUESTIONS.length;
    const correctCount = correctAnswers.length;
    const wrongCount = totalItems - correctCount;
    const average = (correctCount / totalItems) * 100;

    return of({
      correctAnswers: correctCount,
      wrongAnswers: wrongCount,
      average,
      totalItems,
      recommendation: [],
    });
  }
}
