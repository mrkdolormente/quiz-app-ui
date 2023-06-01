import { Store } from '@ngrx/store';
import { QuizActions } from './quiz.actions';
import {
  selectActiveQuestion,
  selectActiveQuestionIndex,
  selectQuestions,
  selectQuestionsCount,
  selectResult,
} from './quiz.selectors';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizFacade {
  readonly activeQuestion = this._store.select(selectActiveQuestion);
  readonly activeQuestionIndex$ = this._store.select(selectActiveQuestionIndex);
  readonly questions$ = this._store.select(selectQuestions);
  readonly questionsCount$ = this._store.select(selectQuestionsCount);
  readonly quizResult$ = this._store.select(selectResult);

  constructor(private readonly _store: Store) {}

  dispatch(action: QuizActions) {
    this._store.dispatch(action);
  }
}
